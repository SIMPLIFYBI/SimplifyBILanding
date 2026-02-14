"use client";

import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return reduced;
}

function RotatingWords(props: { words: string[]; intervalMs?: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const intervalMs = props.intervalMs ?? 2200;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % props.words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, props.words.length, reducedMotion]);

  return (
    <span className="sb-rotator" aria-label={props.words.join(", ")}>
      <span key={index} className="sb-rotatorWord sb-rotatorWordAnim">
        {props.words[index]}
      </span>
    </span>
  );
}

export function ConnectedHero() {
  const words = useMemo(
    () => ["maintenance", "production", "safety", "finance", "people"],
    [],
  );

  return (
    <section className="sb-heroSection sb-heroV2 relative">
      <div className="sb-noise" aria-hidden />
      <div className="sb-grid" aria-hidden />
      <div className="sb-blob sb-blob-a" aria-hidden />
      <div className="sb-blob sb-blob-b" aria-hidden />
      <div className="sb-dashboardBg" aria-hidden>
        <svg
          className="sb-dashboardSvg"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="sbDashNeon" x1="160" y1="120" x2="1040" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgba(46, 168, 255, 0.86)" />
              <stop offset="0.55" stopColor="rgba(139, 92, 246, 0.84)" />
              <stop offset="1" stopColor="rgba(24, 209, 143, 0.82)" />
            </linearGradient>
            <linearGradient id="sbDashNeonAlt" x1="240" y1="260" x2="980" y2="560" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgba(139, 92, 246, 0.72)" />
              <stop offset="1" stopColor="rgba(46, 168, 255, 0.64)" />
            </linearGradient>
          </defs>

          <path
            d="M170 372 C230 352 250 334 312 330 S410 360 454 346 S520 300 580 312 S674 414 736 416 S860 338 920 342 S1010 330 1062 300"
            className="sb-dashLine sb-dashAnimLine"
          />
          <circle cx="860" cy="338" r="7" className="sb-dashPulse" />
          <circle cx="860" cy="338" r="16" className="sb-dashPulseRing" />
        </svg>
      </div>

      <div className="sb-heroContent relative mx-auto flex max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pt-10">
        <div className="sb-heroLayout">
          <div className="sb-heroCopy">
            <h1 className="sb-heroH1">
              <span className="sb-heroH1Stack">
                <span className="sb-heroH1Row">Connect mining with technology</span>
                <span className="sb-heroH1Row">
                  <span className="sb-heroAcross">- across</span>
                  <span className="sb-heroRot">
                    <RotatingWords words={words} />
                    <span aria-hidden>.</span>
                  </span>
                </span>
              </span>
            </h1>
            <p className="sb-heroLead">
              SimplifyBI is the navigation hub for modern mining operations: consulting today, CoreFarm now, and more apps soon.
            </p>

            <div className="sb-routeGrid" aria-label="Choose where to go">
              <a
                href="https://consulting.simplifybi.com"
                target="_blank"
                rel="noreferrer"
                className="sb-routeCard"
              >
                <div className="sb-routeHead">
                  <span className="sb-pill">Consulting</span>
                  <span className="sb-routeArrow" aria-hidden>
                    →
                  </span>
                </div>
                <div className="sb-routeTitle">Operational analytics, delivered fast</div>
                <div className="sb-routeBody">Power BI & Power Platform - Solutions for smarted Business </div>
              </a>

              <a
                href="https://core-farm.vercel.app/user"
                target="_blank"
                rel="noreferrer"
                className="sb-routeCard sb-routeCardAlt"
              >
                <div className="sb-routeHead">
                  <span className="sb-pill sb-pillAlt">CoreFarm</span>
                  <span className="sb-routeArrow" aria-hidden>
                    →
                  </span>
                </div>
                <div className="sb-routeTitle">Productized workflows for clarity</div>
                <div className="sb-routeBody">Turn scattered inputs into dependable action.</div>
              </a>

              <div className="sb-routeCard sb-routeCardMuted" aria-label="More apps coming soon">
                <div className="sb-routeHead">
                  <span className="sb-pill sb-pillMuted">More apps</span>
                </div>
                <div className="sb-routeTitle">Coming soon</div>
                <div className="sb-routeBody">This hub is where new mining-focused tools will launch.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectedHero;
