'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'الرئيسية',    href: '#home'    },
  { label: 'المنيو',      href: '#menu'    },
  { label: 'قصتنا',      href: '#story'   },
  { label: 'تواصل معانا', href: '#footer' },
];

const GEDO_AVATAR_URL =
  'https://github.com/hanynan8/forImages/blob/main/ChatGPT%20Image%20Jul%2017%2C%202026%2C%2005_35_09%20AM.png?raw=true';

/* ─── Hamburger Icon ─────────────────────────────────────────────────────────── */
function HamburgerIcon({ open }) {
  return (
    <div className="flex flex-col justify-center gap-[6px] w-7 h-7">
      <span className={`block h-[2px] bg-[#201710] rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
      <span className={`block h-[2px] bg-[#201710] rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
      <span className={`block h-[2px] bg-[#201710] rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
    </div>
  );
}

/* ─── Logo ───────────────────────────────────────────────────────────────────── */
function GedoLogo() {
  return (
    <div className="flex items-center">
      <img
        src={GEDO_AVATAR_URL}
        alt="جدو عبدو"
        className="h-[88px] w-auto object-contain drop-shadow-md"
      />
      <svg
        viewBox="-10 0 80 95"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[88px] w-auto -ml-3 relative z-50"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <text x="50" y="40" textAnchor="middle" fill="#ff4c0d" fontSize="36" fontFamily="'Amiri', serif" fontWeight="700">جدو</text>
        <line x1="39" y1="45" x2="62" y2="45" stroke="#ff4c0d" strokeWidth="2.5" />
        <text x="33" y="84" textAnchor="middle" fill="#ff4c0d" fontSize="28" fontWeight="700" fontFamily="'Amiri', serif">ُ</text>
        <text x="50" y="70" textAnchor="middle" fill="#ff4c0d" fontSize="36" fontFamily="'Amiri', serif" fontWeight="700">عبدو</text>
        <line x1="39" y1="75" x2="53.5" y2="75" stroke="#ff4c0d" strokeWidth="2.5" />
        <text x="35" y="54" textAnchor="middle" fill="#ff4c0d" fontSize="28" fontWeight="700" fontFamily="'Amiri', serif">ُ</text>
      </svg>
    </div>
  );
}

/* ─── Tagline ─────────────────────────────────────────────────────────────────── */
function Tagline() {
  return (
    <div
      className="hidden md:flex flex-col items-center select-none leading-tight"
      style={{
        fontFamily: "'Amiri', serif",
        fontStyle: 'normal',
        transform: 'skewX(15deg)',
        fontWeight: '700',
        color: '#ff4c0d',
        opacity: 0.9,
      }}
    >
      <span style={{ fontSize: '20px' }}>إيه أصل</span>
      <span style={{ fontSize: '26px' }}>الحكاية؟</span>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-white ${scrolled ? 'shadow-md shadow-black/10' : ''}`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-[90px] items-center justify-between">

          {/* ── اللوجو ── */}
          <Link href="#home" className="shrink-0 flex items-center">
            <GedoLogo />
          </Link>

          {/* ── لينكات الشاشات الكبيرة (في النص) ── */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                dir="rtl"
                className="text-[16px] text-[#201710]/80 transition-colors duration-200 hover:text-[#DE4711]"
                style={{ fontFamily: 'var(--font-arabic, "Cairo", system-ui, sans-serif)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── الجملة في أقصى الشمال ── */}
          <div className="hidden md:flex items-center absolute left-5 sm:left-8">
            <Tagline />
          </div>

          {/* ── زرار الـ hamburger (موبايل فقط) ── */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'قفل القائمة' : 'فتح القائمة'}
            aria-expanded={isOpen}
            className="md:hidden p-2 -mr-2 transition-opacity duration-200 hover:opacity-60"
          >
            <HamburgerIcon open={isOpen} />
          </button>

        </div>
      </nav>

      {/* ── القائمة المنسدلة (موبايل فقط) ── */}
      <div className={`md:hidden overflow-hidden bg-white transition-all duration-300 ${isOpen ? 'max-h-96 border-t border-[#201710]/10' : 'max-h-0'}`}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              dir="rtl"
              className="border-b border-[#201710]/10 py-3 text-[18px] text-[#201710]/80 last:border-0 transition-colors duration-200 hover:text-[#DE4711]"
              style={{ fontFamily: 'var(--font-arabic, "Cairo", system-ui, sans-serif)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}