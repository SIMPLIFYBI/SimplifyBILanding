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

          <a
            href="https://www.simplifybi.com/contact-3"
            target="_blank"
            rel="noreferrer"
            className="sb-btn sb-btnSmall sb-btnPrimary"
          >
            Book a Discovery Call
          </a>
        </div>
      </header>

      <main className="sb-main">
        <ConnectedHero />
      </main>
    </div>
  );
}
