import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { navLinks } from "../data/tournament";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    cn(
      "rounded-lg px-3 py-2 text-[15px] font-medium transition-colors whitespace-nowrap",
      isActive ? "bg-neon-400/15 text-neon-300" : "text-slate-200 hover:bg-white/10 hover:text-white"
    );

  const regLinks = navLinks.filter((l) => l.to !== "/register");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-white/10 bg-navy-950/95 shadow-xl shadow-black/30 backdrop-blur-md"
          : "border-transparent bg-navy-950/60 backdrop-blur"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="প্রধান মেনু">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {regLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Button to="/register" size="sm" className="ml-3">
            টিম রেজিস্ট্রেশন
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 px-4 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {regLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-4 py-3 text-lg font-medium",
                    isActive ? "bg-neon-400/15 text-neon-300" : "text-slate-200 hover:bg-white/10"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/register" className="mt-3 w-full">
              টিম রেজিস্ট্রেশন
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
