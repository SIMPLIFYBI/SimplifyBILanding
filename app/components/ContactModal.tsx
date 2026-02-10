"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
};

export default function ContactModal({ open, onClose, title = "Book a discovery call" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && email.trim().length >= 5 && message.trim().length >= 10;
  }, [name, email, message]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError(null);
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, company, message, website }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Could not send. Please try again.");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Could not send. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div className="sb-modalOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sb-modalHeader">
          <div>
            <div className="sb-modalKicker">SimplifyBI</div>
            <h3 className="sb-modalTitle">{title}</h3>
          </div>

          <button type="button" className="sb-iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {status === "sent" ? (
          <div className="sb-modalBody">
            <div className="sb-alert sb-alertSuccess">
              Thanks — your message has been sent to <strong>james@simplifybi.com</strong>.
            </div>
            <div className="sb-modalActions">
              <button type="button" className="sb-btn sb-btnPrimary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form className="sb-modalBody" onSubmit={onSubmit}>
            {status === "error" && error ? (
              <div className="sb-alert sb-alertError">{error}</div>
            ) : (
              <div className="sb-modalHint">
                Tell us what you want connected (sites, maintenance, production, safety, finance) and we’ll reply.
              </div>
            )}

            <div className="sb-formGrid">
              <label className="sb-field">
                <span>Name</span>
                <input
                  className="sb-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="James"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="sb-field">
                <span>Email</span>
                <input
                  className="sb-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="sb-field sb-fieldFull">
                <span>Company (optional)</span>
                <input
                  className="sb-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="MineCo"
                  autoComplete="organization"
                />
              </label>

              <label className="sb-field sb-fieldFull">
                <span>What do you want to achieve?</span>
                <textarea
                  className="sb-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Example: unify maintenance + production KPIs and alert on leading indicators…"
                  rows={5}
                  required
                />
              </label>

              {/* honeypot */}
              <label className="sb-field sb-hp">
                <span>Website</span>
                <input
                  className="sb-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="sb-modalActions">
              <button type="button" className="sb-btn sb-btnGhost" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="sb-btn sb-btnPrimary"
                disabled={!canSubmit || status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
            </div>
          </form>
        )}
      </div>

      <button className="sb-modalBackdrop" aria-hidden="true" onClick={onClose} />
    </div>
  );
}