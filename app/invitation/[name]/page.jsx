"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

const themes = {
  green: {
    envBgFrom:        "#d8e8c0",
    envBgTo:          "#b8cc90",
    envSideColor:     "#a8bc80",
    envBottomColor:   "#b8cc90",
    envFlapColor:     "#c8d8a0",
    sealBgFrom:       "#4a7a30",
    sealBgTo:         "#2d5018",
    sealText:         "#e8f0d0",
    guestNameColor:   "#2d4820",
    guestLabelColor:  "#4a6830",
    coupleNamesColor: "rgb(64 124 16)",
    dividerColor:     "rgb(64,124,16)",
    countdownBg:      "#99AD7A",
    countdownCardBg:  "#DCCCAC",
    venueBg:          "#dde8c0",
    venueTitleColor:  "#2a4515",
    venueNameColor:   "#3a5820",
    venueAddrColor:   "#4a6828",
    invitationBg:     "#c8b890",
    invTitleColor:    "#2a3510",
    invBodyColor:     "#fff6e0",
    invCoupleColor:   "#2a3510",
    invAmpColor:      "#1a2e0a",
    invFooterColor:   "#fff6e0",
  },
  rose: {
    envBgFrom:        "#f4c0d1",
    envBgTo:          "#e890a8",
    envSideColor:     "#d87090",
    envBottomColor:   "#e890a8",
    envFlapColor:     "#f0a8be",
    sealBgFrom:       "#993556",
    sealBgTo:         "#72243e",
    sealText:         "#fbeaf0",
    guestNameColor:   "#5a1830",
    guestLabelColor:  "#993556",
    coupleNamesColor: "rgb(180 60 100)",
    dividerColor:     "rgb(180,60,100)",
    countdownBg:      "#d4537e",
    countdownCardBg:  "#f4c0d1",
    venueBg:          "#fbeaf0",
    venueTitleColor:  "#4b1528",
    venueNameColor:   "#993556",
    venueAddrColor:   "#72243e",
    invitationBg:     "#ed93b1",
    invTitleColor:    "#4b1528",
    invBodyColor:     "#fff0f5",
    invCoupleColor:   "#4b1528",
    invAmpColor:      "#72243e",
    invFooterColor:   "#fff0f5",
  },
sand: {
  envBgFrom:        "#e8d5a8",
  envBgTo:          "#c8a870",
  envSideColor:     "#b89060",
  envBottomColor:   "#c8a870",
  envFlapColor:     "#d8bc88",
  sealBgFrom:       "#8a6030",
  sealBgTo:         "#5a3a18",
  sealText:         "#f5ecd5",
  guestNameColor:   "#4a2e10",
  guestLabelColor:  "#7a5030",
  coupleNamesColor: "rgb(138 96 48)",
  dividerColor:     "rgb(138,96,48)",
  countdownBg:      "#c8a870",
  countdownCardBg:  "#e8d5a8",
  venueBg:          "#f5ecd5",
  venueTitleColor:  "#3a2510",
  venueNameColor:   "#7a5030",
  venueAddrColor:   "#8a6040",
  invitationBg:     "#d8bc88",
  invTitleColor:    "#3a2510",
  invBodyColor:     "#fff8ee",
  invCoupleColor:   "#3a2510",
  invAmpColor:      "#5a3a18",
  invFooterColor:   "#fff8ee",
},
  navy: {
    envBgFrom:        "#b5d4f4",
    envBgTo:          "#6090d0",
    envSideColor:     "#4070b8",
    envBottomColor:   "#6090d0",
    envFlapColor:     "#88b0e0",
    sealBgFrom:       "#185fa5",
    sealBgTo:         "#0c447c",
    sealText:         "#e6f1fb",
    guestNameColor:   "#042c53",
    guestLabelColor:  "#185fa5",
    coupleNamesColor: "rgb(24 95 165)",
    dividerColor:     "rgb(24,95,165)",
    countdownBg:      "#378add",
    countdownCardBg:  "#b5d4f4",
    venueBg:          "#e6f1fb",
    venueTitleColor:  "#042c53",
    venueNameColor:   "#185fa5",
    venueAddrColor:   "#0c447c",
    invitationBg:     "#85b7eb",
    invTitleColor:    "#042c53",
    invBodyColor:     "#f0f8ff",
    invCoupleColor:   "#042c53",
    invAmpColor:      "#0c447c",
    invFooterColor:   "#f0f8ff",
  },
mocha: {
  envBgFrom:        "#e8cfa8",
  envBgTo:          "#c8a07a",
  envSideColor:     "#a87850",
  envBottomColor:   "#c8a07a",
  envFlapColor:     "#d8b890",
  sealBgFrom:       "#7a5030",
  sealBgTo:         "#4a2e10",
  sealText:         "#f5e8d5",
  guestNameColor:   "#3a2010",
  guestLabelColor:  "#7a5030",
  coupleNamesColor: "rgb(64 124 16)",
  dividerColor:     "rgb(64,124,16)",
  countdownBg:      "#99AD7A",
  countdownCardBg:  "#DCCCAC",
  venueBg:          "#dde8c0",
  venueTitleColor:  "#2a4515",
  venueNameColor:   "#3a5820",
  venueAddrColor:   "#4a6828",
  invitationBg:     "#c8b890",
  invTitleColor:    "#2a3510",
  invBodyColor:     "#fff6e0",
  invCoupleColor:   "#2a3510",
  invAmpColor:      "#1a2e0a",
  invFooterColor:   "#fff6e0",
},
  white: {
    envBgFrom:        "#f0f0f0",
    envBgTo:          "#d8d8d8",
    envSideColor:     "#c0c0c0",
    envBottomColor:   "#d0d0d0",
    envFlapColor:     "#e0e0e0",
    sealBgFrom:       "#666666",
    sealBgTo:         "#444444",
    sealText:         "#f8f8f8",
    guestNameColor:   "#1a1a1a",
    guestLabelColor:  "#555555",
    coupleNamesColor: "rgb(60 60 60)",
    dividerColor:     "rgb(60,60,60)",
    countdownBg:      "#888888",
    countdownCardBg:  "#e0e0e0",
    venueBg:          "#f8f8f8",
    venueTitleColor:  "#111111",
    venueNameColor:   "#444444",
    venueAddrColor:   "#555555",
    invitationBg:     "#cccccc",
    invTitleColor:    "#111111",
    invBodyColor:     "#ffffff",
    invCoupleColor:   "#111111",
    invAmpColor:      "#444444",
    invFooterColor:   "#ffffff",
  },
};

// ─── اختار الثيم هنا ───────────────────────────────
const T = themes.mocha;
// const T = themes.rose;
// const T = themes.sand;
// const T = themes.navy;
// const T = themes.mocha;
// const T = themes.white;

// ─── رابط الموسيقى ───────────────────────────────
const MUSIC_URL = "https://raw.githubusercontent.com/hanynan8/e-commerce/refs/heads/main/YTg82XUQ4eE.mp3";

/* ─── Animations ─── */
const getCriticalStyles = () => `
@keyframes floatUp {
  0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
  12%  { opacity: 0.55; }
  50%  { transform: translateY(-180px) rotate(180deg); opacity: 0.45; }
  88%  { opacity: 0.25; }
  100% { transform: translateY(-380px) rotate(var(--rot)); opacity: 0; }
}
@keyframes blink {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}
@keyframes envVanish {
  to { transform: translateY(-50px) scale(0.88); opacity: 0; }
}
@keyframes cdPulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.06); }
}
  
.fp {
  position: absolute; bottom: 5%;
  animation: floatUp ease-in-out infinite;
  pointer-events: none; user-select: none;
  z-index: 0;  /* ← كان 3، خليه 0 */
  opacity: 0; line-height: 1;
}

.env-side-l {
  position: absolute; bottom: 0; left: 0; width: 0; height: 0;
  border-bottom: calc(min(252px, (100vw - 48px) * 0.663) * 0.5) solid ${T.envSideColor};
  border-right: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
}
.env-side-r {
  position: absolute; bottom: 0; right: 0; width: 0; height: 0;
  border-bottom: calc(min(252px, (100vw - 48px) * 0.663) * 0.5) solid ${T.envSideColor};
  border-left: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
}
.env-bottom::before {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 0; height: 0;
  border-left: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
  border-right: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
  border-bottom: calc(min(252px, (100vw - 48px) * 0.663) * 0.555) solid ${T.envBottomColor};
}
.env-flap {
  position: absolute; top: 0; left: 0; width: 0; height: 0;
  border-left: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
  border-right: calc(min(380px, 100vw - 48px) * 0.5) solid transparent;
  border-top: calc(min(252px, (100vw - 48px) * 0.663) * 0.547) solid ${T.envFlapColor};
  transform-origin: top center;
  transition: transform 0.8s cubic-bezier(0.3,0,0.2,1);
  z-index: 5;
}
.env-wrap.open .env-flap { transform: rotateX(180deg); }
.env-wrap.open .envelope { animation: envVanish 0.85s cubic-bezier(0.4,0,1,1) forwards; }
.inv-ornament-line {
  width: 80px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(80,60,20,0.4));
}
.inv-ornament-line.rev {
  background: linear-gradient(90deg, rgba(80,60,20,0.4), transparent);
}
.cd-number { animation: cdPulse 2s ease-in-out infinite; }
.reveal {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 4s cubic-bezier(0.22,1,0.36,1);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: .1s; }
.reveal-delay-2 { transition-delay: .2s; }
.reveal-delay-3 { transition-delay: .3s; }
.reveal-delay-4 { transition-delay: .4s; }
@media (max-width: 480px) {
  .env-side-l {
    border-bottom-width: calc((100vw - 48px) * 0.33);
    border-right-width: calc((100vw - 48px) * 0.5);
  }
  .env-side-r {
    border-bottom-width: calc((100vw - 48px) * 0.33);
    border-left-width: calc((100vw - 48px) * 0.5);
  }
  .env-bottom::before {
    border-left-width: calc((100vw - 48px) * 0.5);
    border-right-width: calc((100vw - 48px) * 0.5);
    border-bottom-width: calc((100vw - 48px) * 0.37);
  }
  .env-bottom { height: calc((100vw - 48px) * 0.37) !important; }
}
`;

/* ─── Particles ─── */
const particles = [
  { symbol: "❤", left: "15%", size: "1.8rem", dur: "8s",  delay: "0s",  rotate: "360deg",  color: "rgba(220,50,50,1)" },
  { symbol: "❤", left: "50%", size: "1.85rem",dur: "9s",  delay: "4s",  rotate: "300deg",  color: "rgba(200,40,40,1)" },
  { symbol: "❤", left: "80%", size: "2rem",   dur: "12s", delay: "8s",  rotate: "270deg",  color: "rgba(230,60,60,1)" },
  { symbol: "❤", left: "33%", size: "1.6rem", dur: "10s", delay: "2s",  rotate: "320deg",  color: "rgba(210,45,45,1)" },
  { symbol: "❤", left: "65%", size: "1.75rem",dur: "11s", delay: "6s",  rotate: "280deg",  color: "rgba(225,55,55,1)" },
  { symbol: "✿", left: "25%", size: "1.3rem", dur: "8s",  delay: "2s",  rotate: "-270deg" },
  { symbol: "✿", left: "55%", size: "1.9rem", dur: "9s",  delay: "6s",  rotate: "-360deg" },
  { symbol: "✿", left: "85%", size: "2.3rem", dur: "10s", delay: "1s",  rotate: "-300deg" },
];

function FloatingParticles({ heartsOnly = false }) {
  const hearts = particles.filter((p) => p.symbol === "❤");
  const flowers = particles.filter((p) => p.symbol === "✿");

  const filtered = heartsOnly
    ? hearts
    : [...hearts.slice(0, 3), ...flowers];  // ← أول 3 قلوب + كل الوردات

  return (
    <>
      {filtered.map((p, i) => (
        <span
          key={i}
          className="fp"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.dur,
            animationDelay: p.delay,
            "--rot": p.rotate,
            color: heartsOnly ? p.color : "rgba(255,255,255,0.9)",
          }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}
/* ─── Countdown hook ─── */
function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [time, setTime] = useState(() => calc());
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

/* ─── Reveal hook ─── */
function useReveal(dep) {
  useEffect(() => {
    if (!dep) return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.50, rootMargin: "0px 0px -100px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/* ─── Parallax hook ─── */
function useParallax() {
  useEffect(() => {
    const sections = document.querySelectorAll(".parallax-bg");
    const onScroll = () => {
      sections.forEach((bg) => {
        const rect = bg.parentElement.getBoundingClientRect();
        bg.style.transform = `translateY(${rect.top * 0.4}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─── Music hook ─── */
function useMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.1;
    audioRef.current = audio;

    // محاولة تشغيل تلقائي فوري (بيشتغل في بعض المتصفحات)
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // لو فشلت، اشتغل على أول تفاعل من اليوزر
        const start = () => {
          audio.play()
            .then(() => setPlaying(true))
            .catch(() => {});
          ["click", "touchstart", "keydown"].forEach(ev =>
            document.removeEventListener(ev, start)
          );
        };
        ["click", "touchstart", "keydown"].forEach(ev =>
          document.addEventListener(ev, start, { once: true })
        );
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return { playing, toggle };
}
const BG_URL =
  "https://raw.githubusercontent.com/hanynan8/e-commerce/refs/heads/main/lucid-origin_a_surreal_and_vibrant_cinematic_photo_of_A_dreamy_Victorian-era_watercolor_illus-0%20(3).jpg";

/* ═══════════════════════════════════════════════════════════════════ */
export default function WeddingInvitation() {
  const params    = useParams();
  const routeName = params?.name ?? "";

  const [data,         setData]         = useState(null);
  const [guest,        setGuest]        = useState(null);
  const [notFound,     setNotFound]     = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showCard,     setShowCard]     = useState(false);
  const { playing, toggle } = useMusic();

  useReveal(showCard);
  useParallax();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Great+Vibes&family=Cinzel:wght@400;500;600&family=Cinzel+Decorative:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((res) => {
        const doc = Array.isArray(res.home) ? res.home[0] : res;
        if (!doc) { setNotFound(true); return; }
        setData(doc);
        const found = doc.guests.find(
          (g) => g.firstName.toLowerCase() === routeName.toLowerCase()
        );
        if (found) setGuest(found);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [routeName]);

  const handleEnvelopeClick = () => {
    if (envelopeOpen) return;
    setEnvelopeOpen(true);
    setTimeout(() => setShowCard(true), 950);
  };

  const countdown = useCountdown(data?.wedding?.date ?? "2027-08-15T19:00:00");

  if (notFound)
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#f5f0e8] text-2xl tracking-widest"
        style={{ fontFamily: "'Cinzel', Georgia, serif", color: T.venueTitleColor }}
      >
        Invitation not found.
      </div>
    );

  if (!data || !guest)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <span
          className="text-sm tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Cinzel', sans-serif", color: T.venueTitleColor }}
        >
          Loading
        </span>
      </div>
    );

  const { wedding } = data;
  const weddingDate = new Date(wedding.date);
  const formattedTime = weddingDate.toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  return (
    <>
      <style>{getCriticalStyles()}</style>

      {/* ══════ زرار الموسيقى ══════ */}
      <button
        onClick={toggle}
        title={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        style={{
          position:            "fixed",
          top:                 "16px",
          right:               "16px",
          zIndex:              9999,
          width:               "44px",
          height:              "44px",
          borderRadius:        "50%",
          border:              "1.5px solid rgba(255,255,255,0.55)",
          background:          "rgba(0,0,0,0.38)",
          backdropFilter:      "blur(10px)",
          WebkitBackdropFilter:"blur(10px)",
          cursor:              "pointer",
          display:             "flex",
          alignItems:          "center",
          justifyContent:      "center",
          fontSize:            "1.2rem",
          color:               "#fff",
          boxShadow:           "0 2px 16px rgba(0,0,0,0.25)",
          transition:          "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.38)")}
      >
        {playing ? "⏸" : "▶"}
      </button>

      {/* ══════ ENVELOPE ══════ */}
      {!showCard && (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f0e8]">
          <div
            className="parallax-bg absolute inset-[-20%] bg-cover bg-center"
            style={{
              backgroundImage: `url('${BG_URL}')`,
              filter: "sepia(0.1) brightness(0.72) saturate(0.85)",
            }}
          />
          <FloatingParticles heartsOnly />
          <div
            className={`env-wrap relative z-10 flex flex-col items-center gap-8 ${envelopeOpen ? "open" : ""}`}
            style={{ width: "100%", padding: "0 24px" }}
          >
            {!envelopeOpen && (
              <span
                className="text-white uppercase text-center"
                style={{
                  fontFamily:  "'Cinzel', serif",
                  fontSize:    "clamp(1.3rem, 4vw, 2rem)",
                  animation:   "blink 2.4s ease-in-out infinite",
                  letterSpacing: "0.2em",
                  whiteSpace:  "nowrap",
                }}
              >
                open your invitation
              </span>
            )}
            <div
              className="envelope relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
              onClick={handleEnvelopeClick}
              style={{
                width:  "min(380px, calc(100vw - 48px))",
                height: "min(252px, calc((100vw - 48px) * 0.663))",
                filter: "drop-shadow(0 32px 56px rgba(0,0,0,0.35))",
              }}
            >
              <div
                className="absolute inset-0 rounded-sm border border-[rgba(100,130,60,0.3)]"
                style={{ background: `linear-gradient(150deg, ${T.envBgFrom} 0%, ${T.envBgFrom} 55%, ${T.envBgTo} 100%)` }}
              />
              <div className="env-side-l" />
              <div className="env-side-r" />
              <div className="env-bottom absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 140 }} />
              <div className="env-flap" />
              <div
                className="absolute z-10 rounded-full flex items-center justify-center border border-[rgba(150,200,80,0.3)]"
                style={{
                  top: "44%", left: "50%", transform: "translate(-50%,-50%)",
                  width:      "clamp(36px, 13vw, 52px)",
                  height:     "clamp(36px, 13vw, 52px)",
                  background: `radial-gradient(circle at 38% 32%, ${T.sealBgFrom}, ${T.sealBgTo})`,
                  boxShadow:  "0 6px 20px rgba(0,0,0,0.3),inset 0 1px 3px rgba(200,230,150,0.3)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize:   "clamp(1rem, 5vw, 1.6rem)",
                  color:      T.sealText,
                }}
              >
                Y
              </div>
              <div className="absolute bottom-[5%] left-0 right-0 text-center z-[8]">
                <span
                  className="block mb-1 uppercase"
                  style={{
                    fontFamily:    "'Cinzel', serif",
                    fontSize:      "clamp(0.8rem, 2vw, 0.95rem)",
                    letterSpacing: "0.45em",
                    color:         T.guestLabelColor,
                  }}
                >
                  For
                </span>
                <span
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize:   "clamp(1.8rem, 6vw, 1.9rem)",
                    color:      T.guestNameColor,
                    textShadow: "0 2px 12px rgba(80,120,40,0.2)",
                    lineHeight: 1.2,
                  }}
                >
                  {guest.fullName}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════ CARD ══════ */}
      <div
        className={`transition-all duration-700 ease-out ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        style={{ display: showCard ? "block" : "none" }}
      >
        {/* SECTION 1: HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20 text-center">
          <div
            className="parallax-bg absolute inset-[-20%] bg-cover bg-top"
            style={{ backgroundImage: `url('${BG_URL}')`, filter: "brightness(0.9) saturate(1)" }}
          />
          <div
            className="relative z-[2] rounded-sm border border-white/35 flex flex-col items-center mx-auto w-full max-w-[680px] gap-4 px-6 py-9 sm:w-[90%] sm:gap-5 sm:px-24 sm:py-[72px]"
            style={{
              background:          "rgba(255,255,255,0.18)",
              backdropFilter:      "blur(8px)",
              WebkitBackdropFilter:"blur(8px)",
            }}
          >
            <p
              className="reveal text-white font-medium text-center"
              style={{
                fontFamily:    "'Cinzel', serif",
                fontSize:      "clamp(0.82rem, 1.2vw, 0.75rem)",
                letterSpacing: "clamp(0.22em, 1vw, 0.35em)",
                textTransform: "uppercase",
              }}
            >
              We joyfully invite you to celebrate
            </p>
            <div className="reveal reveal-delay-1 flex flex-col items-center">
              <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(2.8rem, 7vw, 5.2rem)", color:T.coupleNamesColor, lineHeight:1.1, textShadow:"0 2px 12px rgba(255,255,255,0.4)" }}>
                {wedding.groomName}
              </span>
              <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(1.4rem, 3vw, 2.2rem)", color:T.coupleNamesColor, letterSpacing:"0.15em" }}>
                &amp;
              </span>
              <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(2.8rem, 7vw, 5.2rem)", color:T.coupleNamesColor, lineHeight:1.1, textShadow:"0 2px 12px rgba(255,255,255,0.4)" }}>
                {wedding.brideName}
              </span>
            </div>
            <div className="reveal reveal-delay-2 flex items-center gap-4 w-full justify-center">
              <div className="flex-1 max-w-[80px] h-px" style={{ background: T.dividerColor }} />
              <span style={{ color: T.dividerColor }} className="text-xs">◆</span>
              <div className="flex-1 max-w-[80px] h-px" style={{ background: T.dividerColor }} />
            </div>
            <p
              className="reveal reveal-delay-2 text-white font-medium text-center"
              style={{
                fontFamily:    "'Cinzel', serif",
                fontSize:      "clamp(0.82rem, 1.2vw, 0.7rem)",
                letterSpacing: "clamp(0.22em, 1vw, 0.35em)",
                textTransform: "uppercase",
              }}
            >
              Together with their families
            </p>
            <div className="reveal reveal-delay-3 flex items-center gap-4 w-full justify-center">
              <div className="flex-1 max-w-[80px] h-px" style={{ background: T.dividerColor }} />
              <span style={{ color: T.dividerColor }} className="text-xs">◆</span>
              <div className="flex-1 max-w-[80px] h-px" style={{ background: T.dividerColor }} />
            </div>
            <div className="reveal reveal-delay-3 flex flex-col items-center gap-1">
              <div
                className="text-white font-medium flex flex-row flex-wrap items-center justify-center gap-1"
                style={{ fontFamily:"'Cinzel', serif", fontSize:"clamp(0.95rem, 1.8vw, 1rem)", letterSpacing:"0.08em", textTransform:"uppercase" }}
              >
                <span>{weddingDate.toLocaleDateString("en-GB", { weekday: "long" })}</span>
                <span>•</span>
                <span>{weddingDate.toLocaleDateString("en-GB", { month:"long", day:"numeric", year:"numeric" })}</span>
              </div>
              <div
                className="text-white font-medium"
                style={{ fontFamily:"'Cinzel', serif", fontSize:"clamp(0.95rem, 1.8vw, 1rem)", letterSpacing:"clamp(0.28em, 1vw, 0.35em)" }}
              >
                {formattedTime}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COUNTDOWN */}
        <section  className="py-14 sm:py-24 px-6 text-center relative overflow-hidden"
  style={{ background: T.countdownBg, isolation: "isolate" }}>
          <FloatingParticles />
          <h2
            className="reveal text-white mb-10 sm:mb-[60px] font-normal"
            style={{ fontFamily:"'Cinzel Decorative','Cinzel',serif", fontSize:"clamp(2.1rem,4vw,3rem)", letterSpacing:"0.06em", textShadow:"0 2px 20px rgba(0,0,0,0.2)", width:"100%" }}
          >
            Countdown To Our Forever
          </h2>
          <div className="reveal reveal-delay-1 grid grid-cols-2 gap-5 max-w-[360px] mx-auto sm:grid-cols-4 sm:max-w-[640px] sm:gap-7 relative">
            {[
              { val: countdown.days,    label: "Days"    },
              { val: countdown.hours,   label: "Hours"   },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="aspect-square rounded-[20px] sm:rounded-[18px] flex flex-col items-center justify-center gap-2"
                style={{ background: T.countdownCardBg, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                <span className="cd-number font-light text-white leading-none text-[11vw] sm:text-[clamp(2.8rem,5vw,4.5rem)]">
                  {String(val).padStart(2, "0")}
                </span>
                <span className="uppercase text-[3.5vw] sm:text-[clamp(0.55rem,1vw,0.75rem)]" style={{ fontFamily:"'Cinzel',serif", letterSpacing:"0.3em", color:T.venueTitleColor }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: VENUE */}
        <section className="py-24 px-6 text-center" style={{ background: T.venueBg }}>
          <h2
            className="reveal font-normal mb-8"
            style={{ fontFamily:"'Cinzel Decorative','Cinzel',serif", fontSize:"clamp(2.1rem,4.5vw,3rem)", letterSpacing:"0.06em", color:T.venueTitleColor }}
          >
            Wedding Venue
          </h2>
          <p
            className="reveal reveal-delay-1 font-light italic mb-2 mx-auto"
            style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.4rem,3.8vw,2.5rem)", letterSpacing:"0.03em", color:T.venueNameColor }}
          >
            {wedding.venue.name}
          </p>
          <p
            className="reveal reveal-delay-2 uppercase max-w-[480px] mx-auto mb-[52px] leading-[1.85]"
            style={{ fontFamily:"'Cinzel',serif", fontSize:"1rem", letterSpacing:"0.15em", color:T.venueAddrColor }}
          >
            {wedding.venue.address}
          </p>
          <div
            className="reveal reveal-delay-3 w-full max-w-[900px] mx-auto rounded-[18px] overflow-hidden border-[3px] border-white/60"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
          >
            <iframe
              title="Venue Map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${wedding.venue.lat},${wedding.venue.lng}&z=15&output=embed`}
              className="w-full h-[320px] border-none block"
            />
          </div>
        </section>

        {/* SECTION 4: INVITATION */}
        <section className="py-[72px] sm:py-28 sm:pb-24 px-5 sm:px-6 text-center relative overflow-hidden"
  style={{ background: T.invitationBg, isolation: "isolate" }}>
          <FloatingParticles />
          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-5xl pointer-events-none select-none text-[rgba(80,60,20,0.08)] hidden sm:block">✿</span>
          <span className="absolute right-10 top-[55%] -translate-y-1/2 text-4xl pointer-events-none select-none text-[rgba(80,60,20,0.06)] hidden sm:block">✿</span>
          <h2
            className="reveal font-normal mb-8 sm:mb-[52px] relative"
            style={{ fontFamily:"'Cinzel Decorative','Cinzel',serif", fontSize:"clamp(2rem,4.5vw,3rem)", letterSpacing:"0.08em", color:T.invTitleColor }}
          >
            Invitation
          </h2>
          <p
            className="reveal reveal-delay-1 max-w-[700px] mx-auto mb-10 sm:mb-12 relative"
            style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(1rem,2vw,1.1rem)", lineHeight:"clamp(3.4,3.8vw,2.8)", letterSpacing:"clamp(0.12em,1vw,0.18em)", textTransform:"uppercase", fontWeight:400, whiteSpace:"pre-line", color:T.invBodyColor }}
          >
            {wedding.invitationText}
          </p>
          <div className="reveal reveal-delay-2 flex items-center gap-5 justify-center mb-10 sm:mb-12">
            <div className="inv-ornament-line" />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", color:"rgba(80,60,20,0.5)" }} className="text-base tracking-[0.2em]">◆</span>
            <div className="inv-ornament-line rev" />
          </div>
          <div className="reveal reveal-delay-3 leading-[1.3] flex flex-col items-center text-center gap-1">
            <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(2rem,6vw,3.6rem)", color:T.invCoupleColor }}>
              {wedding.groomFullName}
            </span>
            <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(1.4rem,3vw,2.2rem)", color:T.invAmpColor, letterSpacing:"0.15em", lineHeight:1 }}>
              &amp;
            </span>
            <span style={{ fontFamily:"'Great Vibes', cursive", fontSize:"clamp(2rem,6vw,3.6rem)", color:T.invCoupleColor }}>
              {wedding.brideFullName}
            </span>
          </div>
          <p
            className="reveal reveal-delay-4 mt-10 sm:mt-12"
            style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(0.7rem,1vw,1rem)", letterSpacing:"clamp(0.5em,1vw,1.2em)", textTransform:"uppercase", color:T.invFooterColor }}
          >
            with love
          </p>
        </section>
      </div>
    </>
  );
}