import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { contacts, contactInfo, socialLinks, navLinks, tournament } from "../data/tournament";
import { toBn } from "../utils/validation";

// lucide-react no longer ships brand icons, so small inline SVGs are used.
const socialIcons = {
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8zM10 15V9l5.2 3z" />
  ),
  instagram: (
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="h-1 bg-gradient-to-r from-neon-500 via-gold-400 to-neon-500" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {tournament.organizerFullBn} আয়োজিত {tournament.nameBn}। মাঠে নামুন, নিজের সেরাটা দিন।
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-neon-400 hover:text-navy-950"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  {socialIcons[s.key]}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">গুরুত্বপূর্ণ লিংক</h3>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-400 transition hover:text-neon-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-white">যোগাযোগ</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-neon-400" aria-hidden="true" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-neon-400" aria-hidden="true" />
              <span className="break-all">{contactInfo.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-neon-400" aria-hidden="true" />
              <span className="flex flex-wrap gap-x-5 gap-y-1">
                {contacts.map((c) => (
                  <a key={c.phone} href={`tel:${c.phone}`} className="hover:text-neon-300">
                    {c.name}: {c.display}
                  </a>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        © {toBn(new Date().getFullYear())} KNTS Club। সর্বস্বত্ব সংরক্ষিত।
        <div className="mt-2 leading-relaxed">
          <a
            href="https://portfolio-pkdk.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neon-300"
          >
            Created by Dipto Howlader Prethul
          </a>
          <span className="mx-2 text-slate-700">|</span>
          <a
            href="https://portfolio-pkdk.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neon-300"
          >
            Need customized Website?
          </a>
          <span> </span>
          <a
            href="https://portfolio-pkdk.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neon-300"
          >
            Contact : https://portfolio-pkdk.onrender.com/
          </a>
          <span className="mx-2 text-slate-700">|</span>
          <a
            href="https://portfolio-pkdk.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neon-300"
          >
            see my work
          </a>
        </div>
      </div>
    </footer>
  );
}
