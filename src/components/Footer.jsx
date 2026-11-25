import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import Logo from "./Logo";
import { contacts, contactInfo } from "../data/tournament";
import { toBn } from "../utils/validation";

function scrollToContact(event) {
  event.preventDefault?.();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  return (
    <>
      <section id="contact" className="scroll-mt-20 bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="mb-4 inline-flex rounded-full border border-neon-400/30 bg-neon-400/10 px-4 py-1 text-sm font-semibold text-neon-300">
              যোগাযোগ
            </span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">আমাদের সঙ্গে যোগাযোগ করুন</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-300">
              টুর্নামেন্ট সংক্রান্ত যেকোনো তথ্য, স্পনসরশিপ, নিবন্ধন কিংবা সহযোগিতার জন্য আমাদের সঙ্গে যোগাযোগ করুন। আমরা আপনার সঙ্গে কথা বলতে আগ্রহী।
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {contacts.slice(0, 2).map((contact) => (
              <a
                key={contact.phone}
                href={`tel:${contact.phone}`}
                className="card-surface group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-neon-400/40"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neon-400/10 text-neon-300 transition group-hover:bg-neon-400 group-hover:text-navy-950">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-slate-400">যোগাযোগ নম্বর</p>
                <p className="mt-1 font-bold text-white">{contact.display}</p>
              </a>
            ))}

            {contactInfo.email ? (
              <a href={`mailto:${contactInfo.email}`} className="card-surface group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/10 text-gold-300">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-slate-400">ইমেইল</p>
                <p className="mt-1 break-all font-bold text-white">{contactInfo.email}</p>
              </a>
            ) : (
              <div className="card-surface rounded-2xl p-5 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/10 text-gold-300">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-slate-400">ইমেইল</p>
                <p className="mt-1 font-bold text-white">ঘোষণা করা হবে</p>
              </div>
            )}

            {contactInfo.facebookUrl ? (
              <a href={contactInfo.facebookUrl} target="_blank" rel="noreferrer" className="card-surface group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-slate-400">ফেসবুক পেজ</p>
                <p className="mt-1 font-bold text-white">পেজ দেখুন</p>
              </a>
            ) : (
              <div className="card-surface rounded-2xl p-5 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-slate-400">ফেসবুক পেজ</p>
                <p className="mt-1 font-bold text-white">ঘোষণা করা হবে</p>
              </div>
            )}
          </div>

          {contacts[0] && (
            <div className="mt-5 text-center">
              <a
                href={`https://wa.me/88${contacts[0].phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neon-400/40 bg-neon-400/10 px-6 py-3 font-semibold text-neon-300 transition hover:-translate-y-0.5 hover:bg-neon-400 hover:text-navy-950"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                হোয়াটসঅ্যাপে যোগাযোগ করুন
              </a>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-navy-950">
        <div className="h-1 bg-gradient-to-r from-neon-500 via-gold-400 to-neon-500" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              খেলাধুলার মাধ্যমে বন্ধুত্ব, ঐক্য ও ভ্রাতৃত্বের বন্ধন গড়ে তোলাই আমাদের লক্ষ্য।
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 transition hover:text-neon-300">হোম</Link></li>
              <li><Link to="/tournament" className="text-slate-400 transition hover:text-neon-300">দলসমূহ</Link></li>
              <li><Link to="/matches" className="text-slate-400 transition hover:text-neon-300">ম্যাচের সূচি</Link></li>
              <li><Link to="/matches" className="text-slate-400 transition hover:text-neon-300">ম্যাচের ফলাফল</Link></li>
              <li><Link to="/rules" className="text-slate-400 transition hover:text-neon-300">টুর্নামেন্টের নিয়মাবলি</Link></li>
              <li><Link to="/" onClick={() => window.setTimeout(() => document.getElementById("sponsorship")?.scrollIntoView({ behavior: "smooth" }), 50)} className="text-slate-400 transition hover:text-neon-300">স্পনসরশিপ</Link></li>
              <li><a href="#contact" onClick={scrollToContact} className="text-slate-400 transition hover:text-neon-300">যোগাযোগ</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-white">যোগাযোগের তথ্য</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-neon-400" aria-hidden="true" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-neon-400" aria-hidden="true" />
                <span className="flex flex-wrap gap-x-5 gap-y-1">
                  {contacts.map((contact) => (
                    <a key={contact.phone} href={`tel:${contact.phone}`} className="hover:text-neon-300">
                      {contact.name}: {contact.display}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
          © {toBn(2026)} KNTs Club. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </>
  );
}
