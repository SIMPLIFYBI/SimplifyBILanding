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
    () => [
      "sites",
      "maintenance",
      "production",
      "safety",
      "finance",
      "people",
    ],
    [],
  );

  return (
    <section className="sb-heroSection sb-heroV2 relative">
      <div className="sb-noise" aria-hidden />
      <div className="sb-grid" aria-hidden />
      <div className="sb-blob sb-blob-a" aria-hidden />
      <div className="sb-blob sb-blob-b" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pt-10">
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

            <div className="sb-heroCtas">
              <a
                href="https://consulting.simplifybi.com"
                target="_blank"
                rel="noreferrer"
                className="sb-btn sb-btnPrimary"
              >
                Explore Consulting
              </a>
              <a
                href="https://core-farm.vercel.app/user"
                target="_blank"
                rel="noreferrer"
                className="sb-btn sb-btnGhost"
              >
                Open CoreFarm
              </a>
              <a
                href="https://www.simplifybi.com/contact-3"
                target="_blank"
                rel="noreferrer"
                className="sb-btn sb-btnGhost"
              >
                Book a discovery call
              </a>
            </div>

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
