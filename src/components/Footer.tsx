import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-new.png";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="bg-[#050507] text-white border-t border-white/10">
      <div className="border-b border-white/10 py-8 bg-[#09090b]">
        <Marquee
          items={["NØRVA STORE", "Y2K FASHION", "GOTHIC ACCESSORIES", "LIMITED EDITION", "DARK AESTHETIC", "STATEMENT PIECES"]}
          size="md"
          speed="slow"
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <span className="font-display font-bold text-2xl tracking-[0.25em] uppercase text-white block">
            NØRVA <span className="font-light text-zinc-400 text-lg">STORE</span>
          </span>
          <p className="mt-4 max-w-xs text-xs uppercase tracking-brand text-zinc-400">
            Y2K style fashionable store. Expressing individuality through bold gothic & dark statement accessories.
          </p>
        </div>

        <div>
          <h4 className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
            Pages
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Catalog</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Featured Collections</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            <li>
              <a href="https://wa.me/919971303047" className="hover:text-white transition-colors">
                +91 9971303047 (WhatsApp)
              </a>
            </li>
            <li>
              <a href="mailto:norvastorex@gmail.com" className="hover:text-white transition-colors">
                norvastorex@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @norvaxstore
              </a>
            </li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Send a Message</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
            Legal
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            <li><Link to="/legal/$page" params={{ page: "refund" }} className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link to="/legal/$page" params={{ page: "terms" }} className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/legal/$page" params={{ page: "privacy" }} className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal/$page" params={{ page: "disclaimer" }} className="hover:text-white transition-colors">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-[10px] uppercase tracking-brand text-zinc-500 md:px-8">
        © {new Date().getFullYear()} Nørva Store (Jevani Enterprises) — All rights reserved
      </div>
    </footer>
  );
}
