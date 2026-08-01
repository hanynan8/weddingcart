'use client';

import { useState, useEffect, useMemo } from 'react';

// ─── غيّر ده لرقم واتساب المطعم (بالكود الدولي، من غير + أو أصفار زيادة) ──────
const WHATSAPP_NUMBER = '201000000000';

// ─── صور افتراضية لكل قسم ────────────────────────────────────────────────────
const CATEGORY_IMAGES = {
  pizza:      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=700&fit=crop&crop=center',
  tasa:       'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=700&fit=crop&crop=center',
  pasta:      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=700&fit=crop&crop=center',
  calzone:    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=700&fit=crop&crop=center',
  pie_savory: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=700&fit=crop&crop=center',
  pie_sweet:  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=700&fit=crop&crop=center',
  roll:       'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&h=700&fit=crop&crop=center',
  drinks:     'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&h=700&fit=crop&crop=center',
  add:        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=700&fit=crop&crop=center',
};

const SIZE_LABELS = { S: 'صغير', M: 'وسط', L: 'كبير' };
const SIZE_ORDER = ['S', 'M', 'L'];

// صورة احتياطية تظهر تلقائيًا لو الرابط الأصلي فشل (403/404/حظر شبكة...)
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#f0ebe6"/><text x="50%" y="50%" font-family="sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="#c9b8a8">🍕</text></svg>`
  );

function handleImgError(e) {
  if (e.target.src !== PLACEHOLDER_IMG) e.target.src = PLACEHOLDER_IMG;
}

// ─── وصف مختصر لكل قسم بالعربي ──────────────────────────────────────────────
function descriptionFor(catKey) {
  const descriptions = {
    pizza:      'عجينة طازجة وجبنة موتزاريلا مع صوص البيت',
    tasa:       'تقدم ساخنة في طاسة كلاسيكية',
    pasta:      'باستا مطبوخة بعناية مع صوص البيت',
    calzone:    'معجنات محشوة ومخبوزة على أصول',
    pie_savory: 'فطير إسكندراني مقرمش بحشوة مالحة',
    pie_sweet:  'فطير إسكندراني مقرمش بحشوة حلوة',
    roll:       'صاروخ محشي ومحمر على الوجه',
    drinks:     'مشروبات باردة ومنعشة',
    add:        'إضافة على طلبك',
  };
  return descriptions[catKey] || 'من مطبخنا بأيدي أمينة';
}

// ─── استخراج الفئات من بيانات الـ API ────────────────────────────────────────
function parseCategories(menuData) {
  if (!menuData) return [];
  const menu =
    menuData && typeof menuData === 'object' && menuData.menu && !Array.isArray(menuData.menu)
      ? menuData.menu
      : menuData;

  return Object.entries(menu)
    .filter(([, cat]) => cat?.items?.length)
    .map(([key, cat]) => ({
      key,
      label_ar: cat.label_ar,
      label_en: (cat.label_en || key).toUpperCase(),
      img: CATEGORY_IMAGES[key] || CATEGORY_IMAGES.pizza,
      items: cat.items,
    }));
}

// ─── أحجام/أسعار المنتج ──────────────────────────────────────────────────────
function getVariants(item) {
  if (item.price != null) {
    return [{ key: 'default', label: null, price: item.price }];
  }
  const variants = SIZE_ORDER
    .filter((k) => item[k] != null)
    .map((k) => ({ key: k, label: SIZE_LABELS[k], price: item[k] }));
  return variants.length ? variants : [{ key: 'default', label: null, price: null }];
}

function startingPrice(item) {
  const prices = getVariants(item).map((v) => v.price).filter((p) => p != null);
  return prices.length ? Math.min(...prices) : null;
}

function itemUID(catKey, item) {
  return `${catKey}::${item.name_en || item.name_ar}`;
}

// ─── رسالة الواتساب ──────────────────────────────────────────────────────────
function buildWhatsAppMessage(cart, total) {
  const lines = cart.map(
    (c) => `• ${c.name_ar}${c.variantLabel ? ` (${c.variantLabel})` : ''} × ${c.qty} — ${c.price * c.qty} ج.م`
  );
  return encodeURIComponent(
    ['أهلاً 👋، عايز أطلب:', '', ...lines, '', `الإجمالي: ${total} ج.م`].join('\n')
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Skeletons
// ═══════════════════════════════════════════════════════════════════════════
function SkeletonCategoryGrid() {
  return (
    <div className="cat-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="cat-card sk-shine" style={{ backgroundImage: 'none' }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// كارت المنتج (صفحة التفاصيل)
// ═══════════════════════════════════════════════════════════════════════════
function ProductCard({ item, catKey, selectedVariant, onSelectVariant, onAdd, justAdded }) {
  const variants = useMemo(() => getVariants(item), [item]);
  const hasVariants = variants.length > 1;
  const activeVariant =
    variants.find((v) => v.key === selectedVariant) || variants[0];
  const from = startingPrice(item);

  return (
    <div className="product-card">
      <div className="product-card-img-wrap">
        <img
          src={CATEGORY_IMAGES[catKey] || CATEGORY_IMAGES.pizza}
          alt={item.name_ar}
          className="product-card-img"
          onError={handleImgError}
        />
      </div>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className="product-card-price">
            {from != null ? (hasVariants ? `يبدأ من ${from} ج.م` : `${from} ج.م`) : '—'}
          </span>
          <span className="product-card-name">{item.name_ar}</span>
        </div>
        <p className="product-card-desc">{descriptionFor(catKey)}</p>

        {hasVariants && (
          <div className="size-row">
            {variants.map((v) => (
              <button
                key={v.key}
                className={`size-chip${activeVariant.key === v.key ? ' active' : ''}`}
                onClick={() => onSelectVariant(v.key)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <button
          className={`add-btn${justAdded ? ' added' : ''}`}
          onClick={() => onAdd(activeVariant)}
        >
          {justAdded ? 'اتضاف ✓' : '+ أضف للسلة'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// الكومبوننت الرئيسي
// ═══════════════════════════════════════════════════════════════════════════
export default function MenuSection() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const [view, setView]               = useState('categories'); // 'categories' | 'detail'
  const [activeCategoryKey, setActiveCategoryKey] = useState(null);
  const [selectedVariants, setSelectedVariants]   = useState({}); // uid -> variantKey
  const [justAddedUid, setJustAddedUid]           = useState(null);

  const [cart, setCart]         = useState([]); // [{ uid, catKey, name_ar, variantKey, variantLabel, price, qty }]
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('/api/data')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        let rawMenu = null;
        if (data?.menu && Array.isArray(data.menu)) {
          rawMenu = data.menu[0]?.menu ?? data.menu[0] ?? null;
        } else if (Array.isArray(data)) {
          rawMenu = data[0]?.menu ?? data[0] ?? null;
        } else if (data?.menu && !Array.isArray(data.menu)) {
          rawMenu = data.menu;
        } else {
          rawMenu = data;
        }
        setMenuData(rawMenu);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => parseCategories(menuData), [menuData]);
  const activeCategory = categories.find((c) => c.key === activeCategoryKey) || null;

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  function openCategory(key) {
    setActiveCategoryKey(key);
    setView('detail');
    window.scrollTo({ top: document.getElementById('menu')?.offsetTop ?? 0, behavior: 'smooth' });
  }

  function addToCart(catKey, item, variant) {
    const uid = itemUID(catKey, item);
    const cartId = `${uid}::${variant.key}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.cartId === cartId);
      if (existing) {
        return prev.map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + 1 } : c));
      }
      return [
        ...prev,
        {
          cartId,
          catKey,
          name_ar: item.name_ar,
          img: CATEGORY_IMAGES[catKey] || CATEGORY_IMAGES.pizza,
          variantKey: variant.key,
          variantLabel: variant.label,
          price: variant.price,
          qty: 1,
        },
      ];
    });
    setJustAddedUid(cartId);
    setTimeout(() => setJustAddedUid(null), 1100);
  }

  function changeQty(cartId, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function checkoutOnWhatsApp() {
    if (!cart.length) return;
    const msg = buildWhatsAppMessage(cart, cartTotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  return (
    <section className="ms-root" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');

        .ms-root {
          position: relative;
          background: #fafaf8;
          padding: 72px 0 120px;
          font-family: 'Cairo', sans-serif;
          min-height: 100vh;
        }

        .ms-eyebrow { text-align: center; margin-bottom: 40px; padding: 0 24px; }
        .ms-eyebrow-rule { display: flex; align-items: center; gap: 20px; max-width: 480px; margin: 0 auto; }
        .ms-eyebrow-rule-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, #c8a882, transparent); display: block; }
        .ms-eyebrow-tag { font-size: 1rem; font-weight: 700; letter-spacing: 0.22em; color: #ff4c0d; text-transform: uppercase; flex-shrink: 0; }

        .ms-grid-wrapper { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

        /* ── سلة عائمة أعلى الصفحة ── */
        .cart-fab {
          position: fixed; top: 100px; left: 20px; z-index: 40;
          width: 52px; height: 52px; border-radius: 50%;
          background: #1a0a00; color: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
          transition: transform 0.2s;
        }
        .cart-fab:hover { transform: scale(1.06); }
        .cart-fab-badge {
          position: absolute; top: -4px; right: -4px;
          background: #ff4c0d; color: #fff; font-size: 11px; font-weight: 800;
          min-width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px; border: 2px solid #fafaf8;
        }

        /* ── شبكة الفئات ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (min-width: 900px) { .cat-grid { grid-template-columns: repeat(3, 1fr); } }

        .cat-card {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          border: none;
          cursor: pointer;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
          padding: 22px 16px;
          transition: transform 0.25s ease;
        }
        .cat-card:hover { transform: translateY(-4px); }
        .cat-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          background: #f0ebe6;
        }
        .cat-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,5,0,0.78) 0%, rgba(10,5,0,0.15) 55%, rgba(10,5,0,0.05) 100%);
        }
        .cat-card-name {
          position: relative; z-index: 1;
          font-family: 'Amiri', serif;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          margin-bottom: 12px;
          text-align: center;
        }
        .cat-card-btn {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.5);
          color: #fff;
          font-size: 12px; font-weight: 700;
          padding: 8px 20px;
          border-radius: 100px;
        }

        /* ── صفحة التفاصيل ── */
        .pills-row {
          display: flex; gap: 10px; overflow-x: auto;
          padding: 4px 2px 16px;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .pills-row::-webkit-scrollbar { display: none; }
        .pill {
          flex-shrink: 0;
          background: #fff;
          border: 1px solid #eadfd2;
          color: #7a6a5a;
          font-size: 13px; font-weight: 700;
          padding: 10px 20px;
          border-radius: 100px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .pill.active { background: #ff4c0d; border-color: #ff4c0d; color: #fff; }

        .detail-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px;
        }
        .detail-title {
          font-family: 'Amiri', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #ff4c0d;
        }
        .back-link {
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 700; color: #9a8b7a;
          display: flex; align-items: center; gap: 4px;
        }
        .back-link:hover { color: #ff4c0d; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (min-width: 900px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .product-grid { grid-template-columns: 1fr; } }

        .product-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #f2ece3;
          display: flex; flex-direction: column;
        }
        .product-card-img-wrap { aspect-ratio: 4/3; overflow: hidden; }
        .product-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .product-card-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .product-card-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
        .product-card-price { font-size: 12px; font-weight: 800; color: #ff4c0d; white-space: nowrap; }
        .product-card-name { font-size: 14px; font-weight: 700; color: #1a0a00; text-align: left; }
        .product-card-desc { font-size: 11.5px; color: #a89a8c; line-height: 1.5; min-height: 32px; }

        .size-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .size-chip {
          font-size: 11px; font-weight: 700;
          border: 1px solid #eadfd2; background: #fff; color: #7a6a5a;
          padding: 5px 12px; border-radius: 100px; cursor: pointer;
          transition: all 0.15s;
        }
        .size-chip.active { background: #1a0a00; border-color: #1a0a00; color: #fff; }

        .add-btn {
          margin-top: auto;
          background: #1a0a00; color: #fff; border: none;
          font-size: 13px; font-weight: 700;
          padding: 11px; border-radius: 10px; cursor: pointer;
          transition: background 0.2s;
        }
        .add-btn:hover { background: #ff4c0d; }
        .add-btn.added { background: #2f9e44; }

        /* ── شريط السلة العائم أسفل الصفحة ── */
        .checkout-bar-wrap {
          position: fixed; bottom: 20px; left: 0; right: 0;
          display: flex; justify-content: center; z-index: 45;
          padding: 0 16px;
          pointer-events: none;
        }
        .checkout-bar {
          pointer-events: auto;
          background: #1a0a00;
          color: #fff;
          border-radius: 100px;
          display: flex; align-items: center; gap: 14px;
          padding: 8px 8px 8px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          max-width: 460px; width: 100%;
        }
        .checkout-bar-count {
          font-size: 12px; font-weight: 700; color: #d8c9b8; white-space: nowrap;
        }
        .checkout-bar-total {
          font-size: 14px; font-weight: 800; margin-inline-start: auto; white-space: nowrap;
        }
        .checkout-bar-btn {
          background: #ff4c0d; color: #fff; border: none;
          font-size: 13px; font-weight: 700;
          padding: 11px 18px; border-radius: 100px; cursor: pointer;
          display: flex; align-items: center; gap: 8px; white-space: nowrap;
        }

        /* ── لوحة السلة ── */
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(10,5,0,0.5); z-index: 60;
          display: flex; justify-content: flex-end;
        }
        .cart-panel {
          background: #fff; width: 100%; max-width: 400px; height: 100%;
          padding: 22px; overflow-y: auto;
          display: flex; flex-direction: column;
          animation: cart-slide-in 0.25s ease;
        }
        @keyframes cart-slide-in { from { transform: translateX(-24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .cart-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .cart-panel-title { font-family: 'Amiri', serif; font-size: 1.6rem; font-weight: 700; color: #1a0a00; }
        .cart-close { background: #f5efe8; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 15px; color: #7a6a5a; }
        .cart-empty { text-align: center; color: #a89a8c; padding: 60px 0; font-size: 13px; }

        .cart-line { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3eeea; }
        .cart-line-img { width: 52px; height: 52px; border-radius: 12px; object-fit: cover; flex-shrink: 0; background: #f5efe8; }
        .cart-line-body { flex: 1; min-width: 0; }
        .cart-line-name { font-size: 13px; font-weight: 700; color: #1a0a00; }
        .cart-line-variant { font-size: 11px; color: #a89a8c; }
        .cart-line-price { font-size: 12px; font-weight: 700; color: #ff4c0d; margin-top: 2px; }
        .qty-stepper { display: flex; align-items: center; gap: 8px; }
        .qty-btn {
          width: 26px; height: 26px; border-radius: 50%; border: 1px solid #eadfd2;
          background: #fff; cursor: pointer; font-size: 14px; color: #1a0a00;
          display: flex; align-items: center; justify-content: center;
        }
        .qty-val { font-size: 13px; font-weight: 700; min-width: 16px; text-align: center; }

        .cart-panel-footer { margin-top: auto; padding-top: 16px; }
        .cart-panel-total { display: flex; justify-content: space-between; font-weight: 800; font-size: 15px; color: #1a0a00; margin-bottom: 14px; }
        .cart-panel-checkout {
          width: 100%; background: #25D366; color: #fff; border: none;
          font-size: 14px; font-weight: 700; padding: 14px; border-radius: 12px; cursor: pointer;
        }

        /* ── Skeleton ── */
        @keyframes sk-shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
        .sk-shine {
          background: linear-gradient(90deg, #f0ede8 25%, #ffe5da 50%, #f0ede8 75%);
          background-size: 600px 100%;
          animation: sk-shimmer 1.6s ease-in-out infinite;
        }

        .ms-error { text-align: center; color: #ff4c0d; padding: 60px 24px; font-size: 14px; }
      `}</style>

      {/* زرار السلة العائم */}
      {cartCount > 0 && (
        <button className="cart-fab" onClick={() => setCartOpen(true)} aria-label="السلة">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.7L21 8H6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="21" r="1.4" fill="white" />
            <circle cx="18" cy="21" r="1.4" fill="white" />
          </svg>
          <span className="cart-fab-badge">{cartCount}</span>
        </button>
      )}

      {/* Eyebrow */}
      <div className="ms-eyebrow">
        <div className="ms-eyebrow-rule">
          <span className="ms-eyebrow-rule-line" />
          <span className="ms-eyebrow-tag">Our Menu</span>
          <span className="ms-eyebrow-rule-line" />
        </div>
      </div>

      <div className="ms-grid-wrapper">
        {loading ? (
          <SkeletonCategoryGrid />
        ) : error ? (
          <p className="ms-error">حدث خطأ في تحميل المينيو</p>
        ) : view === 'categories' ? (
          <div className="cat-grid">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className="cat-card"
                onClick={() => openCategory(cat.key)}
              >
                <img
                  src={cat.img}
                  alt={cat.label_ar}
                  className="cat-card-bg"
                  onError={handleImgError}
                />
                <span className="cat-card-overlay" />
                <span className="cat-card-name">{cat.label_en}</span>
                <span className="cat-card-btn">عرض المنيو</span>
              </button>
            ))}
          </div>
        ) : (
          activeCategory && (
            <div className="detail-view">
              <div className="pills-row">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    className={`pill${cat.key === activeCategoryKey ? ' active' : ''}`}
                    onClick={() => setActiveCategoryKey(cat.key)}
                  >
                    {cat.label_en}
                  </button>
                ))}
              </div>

              <div className="detail-header">
                <span className="detail-title">{activeCategory.label_en}</span>
                <button className="back-link" onClick={() => setView('categories')}>
                  القائمة الرئيسية ←
                </button>
              </div>

              <div className="product-grid">
                {activeCategory.items.map((item, i) => {
                  const uid = itemUID(activeCategory.key, item);
                  const variants = getVariants(item);
                  const selected = selectedVariants[uid] || variants[0].key;
                  return (
                    <ProductCard
                      key={`${uid}-${i}`}
                      item={item}
                      catKey={activeCategory.key}
                      selectedVariant={selected}
                      onSelectVariant={(vKey) =>
                        setSelectedVariants((prev) => ({ ...prev, [uid]: vKey }))
                      }
                      onAdd={(variant) => addToCart(activeCategory.key, item, variant)}
                      justAdded={justAddedUid === `${uid}::${selected}`}
                    />
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>

      {/* شريط الطلب عبر واتساب */}
      {cartCount > 0 && !cartOpen && (
        <div className="checkout-bar-wrap">
          <div className="checkout-bar">
            <span className="checkout-bar-count">{cartCount} عنصر</span>
            <span className="checkout-bar-total">{cartTotal} ج.م</span>
            <button className="checkout-bar-btn" onClick={checkoutOnWhatsApp}>
              إتمام الطلب عبر واتساب ←
            </button>
          </div>
        </div>
      )}

      {/* لوحة السلة */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="cart-panel-head">
              <span className="cart-panel-title">سلتك</span>
              <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="cart-empty">السلة فاضية</p>
            ) : (
              <>
                {cart.map((c) => (
                  <div key={c.cartId} className="cart-line">
                    <img src={c.img} alt={c.name_ar} className="cart-line-img" onError={handleImgError} />
                    <div className="cart-line-body">
                      <div className="cart-line-name">{c.name_ar}</div>
                      {c.variantLabel && <div className="cart-line-variant">{c.variantLabel}</div>}
                      <div className="cart-line-price">{c.price * c.qty} ج.م</div>
                    </div>
                    <div className="qty-stepper">
                      <button className="qty-btn" onClick={() => changeQty(c.cartId, -1)}>−</button>
                      <span className="qty-val">{c.qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(c.cartId, 1)}>+</button>
                    </div>
                  </div>
                ))}

                <div className="cart-panel-footer">
                  <div className="cart-panel-total">
                    <span>الإجمالي</span>
                    <span>{cartTotal} ج.م</span>
                  </div>
                  <button className="cart-panel-checkout" onClick={checkoutOnWhatsApp}>
                    إتمام الطلب عبر واتساب
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}