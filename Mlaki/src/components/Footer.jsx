import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  FileCheck, 
  Droplet, 
  Building2 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/projectsData';

export default function Footer() {
  return (
    <footer className="bg-[#0c0e17] text-white pt-20 pb-12 rounded-t-[3rem] sm:rounded-t-[4rem] relative overflow-hidden border-t border-white/10 mt-16">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#165cfd]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1140px] mx-auto px-6 relative z-10">
        {/* Top Header / Live Operational Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#165cfd] flex items-center justify-center font-bold text-white text-xl">
              M
            </div>
            <div>
              <h3 className="text-xl font-bold font-display tracking-tight text-white">
                MLAKI BUILDING & WATER ENGINEERING
              </h3>
              <p className="text-xs text-white/60">
                Registered Contractors Board of Tanzania (CRB) Certified
              </p>
            </div>
          </div>

          {/* System Operational Indicator */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono-telemetry">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">CRB VERIFIED ACTIVE</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">{COMPANY_INFO.crbNumber}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-white/10">
          {/* Column 1: Profile & Scope */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-display">
              Corporate Overview
            </h4>
            <p className="text-sm text-white/70 leading-relaxed pr-4">
              Mlaki Building & Water Engineering Ltd is a specialized Tanzanian contractor delivering resilient community water reticulation networks, heavy-duty reinforced concrete reservoirs, solar borehole schemes, and Class-compliant public institutional facilities.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                Class 4 Civil Works
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                Class 6/7 Building Works
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                RUWASA Water Approved
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-display">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>Top 5 Strategic Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>Engineering Services</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>About Our Company</span>
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>CRB & Safety Compliance</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#165cfd] transition-colors flex items-center gap-1">
                  <span>Tender Inquiries</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Strategic Focus */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-display">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#165cfd]" />
                <span>RUWASA Pipeline Reticulation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#165cfd]" />
                <span>Overhead Concrete Reservoirs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#165cfd]" />
                <span>Solar-Powered Borehole Yields</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#165cfd]" />
                <span>Institutional School & Clinic Blocks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#165cfd]" />
                <span>Stone Pitching & Drainage Culverts</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-display">
              Headquarters & Hubs
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                <span>
                  <strong>Dar es Salaam:</strong> Plot 42, Kijitonyama Commercial Strip, Bagamoyo Road
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                <span>
                  <strong>Dodoma Hub:</strong> Area D, Near RUWASA Secretariat
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Mlaki Building & Water Engineering Ltd. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>TIN: {COMPANY_INFO.tin}</span>
            <span>VRN: {COMPANY_INFO.vrn}</span>
            <span className="text-[#165cfd]">CRB Act Cap 235 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
