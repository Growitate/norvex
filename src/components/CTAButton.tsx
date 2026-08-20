import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type Tone = "light" | "dark";

type Props = {
  tone?: Tone;
  to?: ComponentProps<typeof Link>["to"];
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function CTAButton({ tone = "light", to, href, children, className = "", onClick, type }: Props) {
  const cls = `btn-sweep ${tone === "light" ? "sweep-light text-white bg-black border-black hover:bg-zinc-800" : "sweep-dark text-black border-black hover:bg-black hover:text-white"} inline-flex items-center justify-center border px-10 py-4 font-display text-[11px] uppercase tracking-brand-wide font-semibold ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
