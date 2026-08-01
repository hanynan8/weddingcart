'use client';

import { useEffect, useRef } from 'react';

const storySlides = [
  {
    id: 0,
    label: 'قصتنا',
    text: 'منذ افتتاح جدو عبدو في أسوان، كان هدفنا تقديم فطاير وبيتزا وأكلات بجودة عالية وطعم أصيل يخلي كل زيارة تجربة مميزة. ومع مرور السنين وثقة عملائنا، أصبح جدو عبدو واحدًا من الأسماء المعروفة في أسوان، محافظين على نفس الجودة والمذاق الذي بدأنا به من أول يوم.',
    img: 'https://github.com/hanynan8/forImages/blob/main/490791809_122107969310831792_1645359563520428497_n.jpg?raw=true',
  },
  {
    id: 1,
    label: 'وعدنا',
    text: 'كل فطيرة بتتحضر بمكونات طازة يوميًا، من غير اختصارات ولا حاجة مجمدة. الجودة عندنا مش شعار بنكتبه... دي عادة بنكررها كل يوم.',
    img: 'https://github.com/hanynan8/forImages/blob/main/711349299_122180173136831792_7907486395612506322_n%20(1).jpg?raw=true',
  },
  {
    id: 2,
    label: 'فريقنا',
    text: 'ورا كل فطيرة إيد شاطرة وقلب حابب شغله. فريقنا مكوّن من ناس بتحب الأكل زيك بالظبط، وشغالين علشان يوصلولك تجربة تستاهل.',
    img: 'https://github.com/hanynan8/forImages/blob/main/ChatGPT%20Image%20Jul%2018,%202026,%2001_24_53%20AM.png?raw=true',
  },
];

const LOGO_URL =
  'https://github.com/hanynan8/forImages/blob/main/ChatGPT%20Image%20Jul%2017%2C%202026%2C%2005_35_09%20AM.png?raw=true';

const LERP_FACTOR = 0.12;
const END_BUFFER_VH = 40;
const NAV_H = 84;

export default function StorySection() {
  const wrapperRef = useRef(null);
  const stripRef = useRef(null);
  const logoWrapRef = useRef(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef(null);

  const total = storySlides.length;

  useEffect(() => {
    const el = logoWrapRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }, []);

  useEffect(() => {
    let rafScheduled = false;
    const computeProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledIntoWrapper = -rect.top;
      const slidesScrollableRange = ((total * 55 - 100) / 100) * vh;
      const p = Math.min(Math.max(scrolledIntoWrapper / slidesScrollableRange, 0), 1);
      targetProgress.current = p;
    };
    const handleScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => { rafScheduled = false; computeProgress(); });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    computeProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [total]);

  useEffect(() => {
    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) < 0.0001) {
        currentProgress.current = targetProgress.current;
      } else {
        currentProgress.current += diff * LERP_FACTOR;
      }
      const p = currentProgress.current;
      const stripOffset = p * (total - 1) * (100 / total);
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${stripOffset}%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current !== null) cancelAnimationFrame(rafId.current); };
  }, [total]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: `${total * 55 + END_BUFFER_VH}vh` }}>
      <section
        dir="rtl"
        className="story-root"
        style={{ height: `calc(100vh - ${NAV_H}px)`, position: 'sticky', top: `${NAV_H}px` }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');

          .story-root { background: #ff4c0d; overflow: hidden; width: 100%; }
          .story-strip {
            display: flex; flex-direction: row;
            width: ${total * 100}%; height: 100%;
            will-change: transform; transform: translateX(0%);
            backface-visibility: hidden;
          }
          .story-slide {
            flex: 0 0 ${100 / total}%; width: ${100 / total}%; height: 100%;
            display: flex; align-items: center; justify-content: center;
          }
          .story-text {
            flex: 0 0 auto; width: 42%; min-width: 300px;
            padding: 0 48px; display: flex; flex-direction: column;
            align-items: center; text-align: center;
          }
          .story-logo { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: -30px; margin-bottom: 22px; }
          .story-logo-icon { width: 150px; height: 150px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
          .story-logo-icon img { width: 100%; height: 100%; object-fit: contain; }
          .story-title { font-family: 'Amiri', serif; font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 700; color: #ffffff; margin-bottom: 16px; line-height: 1.1; }
          .story-desc { font-family: 'Cairo', sans-serif; font-size: 17px; line-height: 1.9; color: rgba(255,255,255,0.75); max-width: 420px; margin: 0 auto; }
          .story-img-wrap { flex: 1; height: 100%; display: flex; align-items: center; justify-content: flex-end; align-self: stretch; padding: 28px 0 28px 64px; }
          .story-img-frame { position: relative; width: 100%; height: 100%; max-height: 640px; }
          .story-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; box-shadow: 0 24px 60px rgba(0,0,0,0.35); display: block; }

          @media (max-width: 768px) {
            .story-slide { flex-direction: column; padding: 32px 0 0; align-items: center; }
            .story-text { width: 100%; padding: 0 24px; }
            .story-logo { margin-bottom: 16px; }
            .story-logo-icon { width: 100px; height: 100px; }
            .story-desc { max-width: 320px; font-size: 15px; }
            .story-img-wrap { width: 100%; height: 42vh; flex: none; padding: 0 20px; justify-content: center; }
            .story-img-frame { max-height: 320px; }
          }
        `}</style>

        <div ref={stripRef} className="story-strip">
          {storySlides.map((slide, idx) => (
            <div key={slide.id} className="story-slide">
              <div className="story-text">
                <div ref={idx === 0 ? logoWrapRef : null} className="story-logo">
                  <span className="story-logo-icon">
                    <img src={LOGO_URL} alt="جدو" />
                  </span>
                </div>
                <h3 className="story-title">{slide.label}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-12 h-[1px] bg-white/90" />
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                    <path d="M12 2 21 19a10 10 0 0 1-18 0L12 2z" />
                    <path d="M4.6 15.5c1.6.8 3.2 1.2 5 1.5" fill="none" stroke="#ff4c0d" strokeWidth="1.1" strokeLinecap="round" />
                    <circle cx="12" cy="9" r="1" fill="#ff4c0d" />
                    <circle cx="9" cy="13" r="1" fill="#ff4c0d" />
                    <circle cx="14.5" cy="13.5" r="1" fill="#ff4c0d" />
                  </svg>
                  <span className="block w-12 h-[1px] bg-white/90" />
                </div>
                <p className="story-desc">{slide.text}</p>
              </div>
              <div className="story-img-wrap">
                <div className="story-img-frame">
                  <img src={slide.img} alt={slide.label} className="story-img" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}