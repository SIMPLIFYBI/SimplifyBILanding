"use client";

import Image from "next/image";
import { ConnectedHero } from "./ConnectedHero";

export function Landing() {
  return (
    <div className="sb-page sb-pageFixed">
      <header className="sb-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="sb-brand" aria-label="SimplifyBI">
            <Image
              src="/SimplifyBI.png"
              alt="SimplifyBI"
              width={220}
              height={80}
              priority
              className="sb-brandLogo"
            />
          </a>

          <div className="hidden items-center gap-2 sm:flex" aria-label="Primary navigation">
            <a
              href="https://consulting.simplifybi.com"
              target="_blank"
              rel="noreferrer"
              className="sb-navPill"
            >
              Consulting
            </a>
            <a
              href="https://core-farm.vercel.app/user"
              target="_blank"
              rel="noreferrer"
              className="sb-navPill"
            >
              CoreFarm
            </a>
          </div>

          <a
            href="https://www.simplifybi.com/contact-3"
            target="_blank"
            rel="noreferrer"
            className="sb-btn sb-btnSmall sb-btnPrimary"
          >
            Book a call
          </a>
        </div>
      </header>

      <main className="sb-main">
        <ConnectedHero />
      </main>
    </div>
  );
}
