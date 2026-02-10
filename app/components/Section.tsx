import { PropsWithChildren } from "react";

export function Section(
  props: PropsWithChildren<{
    id?: string;
    title: string;
    subtitle?: string;
  }>,
) {
  return (
    <section id={props.id} className="sb-section">
      <div className="sb-sectionGlow" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {props.title}
          </h2>
          {props.subtitle ? (
            <p className="mt-3 text-pretty text-base leading-7 text-white/70">
              {props.subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{props.children}</div>
      </div>
    </section>
  );
}
