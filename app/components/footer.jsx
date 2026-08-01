'use client';

const LOGO_URL =
  'https://github.com/hanynan8/forImages/blob/main/ChatGPT%20Image%20Jul%2017%2C%202026%2C%2005_35_09%20AM.png?raw=true';

export default function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: '#ff4c0d',
        fontFamily: "'Cairo', 'Amiri', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Amiri:wght@400;700&display=swap');

        .f-root { padding: 56px 40px 0; max-width: 1100px; margin: 0 auto; }

        .f-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
        }

        .f-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .f-brand-name {
          font-family: 'Amiri', serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          margin: 0 0 14px;
        }

        .f-brand-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          line-height: 1.75;
          margin: 0 0 28px;
          max-width: 220px;
        }

        .f-social { display: flex; gap: 12px; }
        .f-social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: none;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          color: #ff4c0d;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .f-social-btn:hover { background: rgba(255,255,255,0.85); transform: scale(1.08); }
        .f-social-btn svg { width: 17px; height: 17px; }

        .f-info-row { display: flex; flex-direction: column; gap: 12px; }
        .f-info-item { display: flex; align-items: flex-start; gap: 11px; }
        .f-info-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .f-info-icon svg { width: 15px; height: 15px; color: rgba(255,255,255,0.9); }
        .f-info-text { font-size: 13.5px; color: rgba(255,255,255,0.9); line-height: 1.6; padding-top: 6px; }
        .f-info-link { color: rgba(255,255,255,0.9); text-decoration: none; }
        .f-info-link:hover { color: #fff; }

        .f-hours-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .f-hours-row:last-child { border-bottom: none; }
        .f-hours-day { font-size: 13px; color: rgba(255,255,255,0.9); }
        .f-hours-time { font-size: 13px; font-weight: 600; color: #ffffff; }

        .f-rating {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 5px 14px;
          margin-top: 18px;
        }
        .f-rating-stars { display: flex; gap: 2px; }
        .f-rating-star { width: 12px; height: 12px; }
        .f-rating-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); }

        .f-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 18px 40px;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .f-copy { font-size: 12px; color: rgba(255,255,255,0.35); }

        @media (max-width: 860px) {
          .f-root { padding: 40px 24px 0; }
          .f-grid { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
          .f-bottom { padding: 16px 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="f-root">
        <div className="f-grid">

          {/* ── Brand ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img src={LOGO_URL} alt="Gedo Abdo" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <p className="f-brand-name" style={{ margin: 0, fontSize: 26, letterSpacing: '0.02em', fontFamily: "'Cairo', sans-serif" }}>Gedo Abdo</p>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>Aswan · Egypt</span>
              </div>
            </div>
            <p className="f-brand-sub">فطاير وبيتزا وأكلات بجودة عالية — من أسوان، لكل محبين الأكل الطيب.</p>
            <div className="f-social">
              <a href="https://www.facebook.com/GedoAbdoEG" target="_blank" rel="noopener noreferrer" className="f-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/gedoabdoeg/" target="_blank" rel="noopener noreferrer" className="f-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <p className="f-label">تواصل معانا</p>
            <div className="f-info-row">
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span className="f-info-text">Atlas, Railway Street<br/>Aswan, Egypt</span>
              </div>
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.38 2 2 0 0 1 3.96 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <a href="tel:+201022801419" className="f-info-text f-info-link">+20 102 280 1419</a>
              </div>
            </div>
            <div className="f-rating">
              <div className="f-rating-stars">
                {[1,2,3,4].map(i => (
                  <svg key={i} className="f-rating-star" viewBox="0 0 24 24" fill="#ffd84d"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
                <svg className="f-rating-star" viewBox="0 0 24 24" fill="none" stroke="#ffd84d" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <span className="f-rating-text">4.2 على Google</span>
            </div>
          </div>

          {/* ── Hours ── */}
          <div>
            <p className="f-label">أوقات العمل</p>
            {[
              { day: 'الاثنين',           time: '٢٤ ساعة' },
              { day: 'الثلاثاء – السبت',  time: '١٢ ظهرًا – ٤ فجرًا' },
              { day: 'الأحد',             time: '١٢ ظهرًا – ١٢ منتصف الليل' },
            ].map(h => (
              <div key={h.day} className="f-hours-row">
                <span className="f-hours-day">{h.day}</span>
                <span className="f-hours-time">{h.time}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="f-bottom">
        <p className="f-copy">© {new Date().getFullYear()} جدو عبدو — جميع الحقوق محفوظة</p>
        <p className="f-copy">Aswan, Egypt</p>
      </div>
    </footer>
  );
}