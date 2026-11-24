import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Home from "./pages/Home";
import Tournament from "./pages/Tournament";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Matches from "./pages/Matches";

// Scroll to top on every page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section className="hero-bg px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-gradient">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold text-white">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-slate-300">আপনি যে পেজটি খুঁজছেন তা নেই বা সরানো হয়েছে।</p>
      <div className="mt-6">
        <Button to="/">হোমে ফিরে যান</Button>
      </div>
    </section>
  );
}

// HashRouter is used so that every page works on any static host
// (Vercel, Netlify, GitHub Pages...) without server rewrite rules.
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="app-main flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
