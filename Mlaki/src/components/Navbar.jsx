import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  Droplet,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/projectsData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Strategic Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'CRB & Quality', path: '/compliance' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out px-4 py-3 sm:py-4">
      <div 
        className={`mx-auto max-w-[1140px] transition-all duration-400 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-[#ced0d2]/60' 
            : 'bg-white/80 backdrop-blur-md shadow-sm border border-black/[0.05]'
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#165cfd] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-95 transition-transform duration-300">
            <span className="tracking-tighter">M</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#131b33] text-lg tracking-tight font-display">
                MLAKI
              </span>
              <span className="text-[10px] font-mono-telemetry font-bold bg-[#165cfd]/10 text-[#165cfd] px-1.5 py-0.5 rounded-full border border-[#165cfd]/20">
                CRB
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-wider text-[#434f59] uppercase">
              Building & Water Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-[#165cfd] text-white shadow-sm'
                    : 'text-[#434f59] hover:text-[#165cfd] hover:bg-black/[0.03]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden xl:flex items-center gap-2 text-xs font-semibold text-[#131b33] hover:text-[#165cfd] transition-colors py-1.5 px-3 rounded-full border border-[#ced0d2]/60 bg-black/[0.02]"
          >
            <Phone className="w-3.5 h-3.5 text-[#165cfd]" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <Link
            to="/contact"
            className="btn-pill-primary text-xs sm:text-sm !py-2.5 !px-5"
          >
            <span>Tender Inquiry</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full text-[#131b33] hover:bg-black/[0.05] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-[1140px] mt-2 p-5 bg-white rounded-3xl shadow-2xl border border-[#ced0d2]/70 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f6f7]">
              <span className="text-xs font-mono-telemetry text-[#8a8a8a]">
                CRB REG NO: {COMPANY_INFO.crbNumber}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#165cfd] font-semibold bg-[#165cfd]/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Certified
              </span>
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                    active
                      ? 'bg-[#165cfd] text-white font-semibold'
                      : 'text-[#131b33] hover:bg-[#f5f6f7]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-[#8a8a8a]'}`} />
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[#f5f6f7] flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-[#ced0d2] text-[#131b33] text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-[#165cfd]" />
                <span>Call Dispatch: {COMPANY_INFO.phone}</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-pill-primary w-full text-center justify-center"
              >
                <span>Request Project Tender Quote</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
