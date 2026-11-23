import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Droplet, 
  Building2, 
  Gauge, 
  CheckCircle2, 
  Phone,
  HardHat
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/projectsData';
import StrategicProjectsGrid from '../components/StrategicProjectsGrid';
import MicroInteractions from '../components/MicroInteractions';
import DeliveryProtocol from '../components/DeliveryProtocol';
import TestimonialsAndFAQ from '../components/TestimonialsAndFAQ';

export default function HomePage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* ========================================================
          1. HERO SECTION — "The Opening Shot"
      ======================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden mx-4 sm:mx-6 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0c0e17] text-white my-2 border border-black/10 shadow-xl">
        {/* Full-bleed background hero visual */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero.jpg"
            alt="Mlaki Building & Water Engineering Project Site Tanzania"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.75] contrast-[1.05]"
          />
          {/* Gradient Overlay as per design.md (primary-to-black bottom-left push) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-[#0c0e17]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e17]/90 via-[#0c0e17]/40 to-transparent" />
        </div>

        {/* Content pushed to bottom-left third */}
        <div className="max-w-[1140px] w-full mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10 flex flex-col justify-end">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono-telemetry mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">CRB REGISTERED CONTRACTOR</span>
              <span className="text-white/40">·</span>
              <span className="text-[#165cfd] font-bold">{COMPANY_INFO.crbNumber}</span>
            </div>

            {/* Headline Scale Contrast */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight leading-[1.08]">
              Reliable Water &amp; Building Engineering for <span className="text-[#165cfd] underline decoration-white/20 underline-offset-8">Tanzania</span>.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Specializing in rural community water supply schemes (RUWASA), reinforced concrete reservoirs, solar borehole drilling, and public institutional building works.
            </p>

            {/* CTA Button Group */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="btn-pill-primary text-sm !py-3 !px-7 shadow-lg shadow-[#165cfd]/25"
              >
                <span>View Strategic Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="btn-pill-secondary text-sm !py-3 !px-7 !bg-white/10 !text-white !border-white/30 hover:!bg-white hover:!text-[#131b33] backdrop-blur-md"
              >
                <span>Request Tender BOQ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Floating Stats Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-md border-t border-white/10 hidden md:block">
          <div className="max-w-[1140px] mx-auto px-6 py-4 grid grid-cols-5 gap-6 text-xs text-white/80">
            <div>
              <span className="block text-white font-bold text-base font-display">185+ km</span>
              <span className="text-white/60">Pipeline Laid</span>
            </div>
            <div>
              <span className="block text-white font-bold text-base font-display">42+ Units</span>
              <span className="text-white/60">Concrete Reservoirs</span>
            </div>
            <div>
              <span className="block text-white font-bold text-base font-display">95+ Sites</span>
              <span className="text-white/60">Boreholes Energized</span>
            </div>
            <div>
              <span className="block text-white font-bold text-base font-display">Class 4 &amp; 7</span>
              <span className="text-white/60">CRB Licensed</span>
            </div>
            <div>
              <span className="block text-white font-bold text-base font-display">100% Passed</span>
              <span className="text-white/60">RUWASA Pressure Audits</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. AUTHORITY PARTNERS / LOGO WALL
      ======================================================== */}
      <section className="py-12 bg-[#f5f6f7] border-b border-[#ced0d2]/40">
        <div className="max-w-[1140px] mx-auto px-6 text-center">
          <span className="text-xs font-mono-telemetry uppercase tracking-wider text-[#8a8a8a] font-bold block mb-6">
            REGULATED &amp; ACCREDITED BY TANZANIAN STATUTORY AUTHORITIES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
            <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#131b33]">
              <ShieldCheck className="w-5 h-5 text-[#165cfd]" />
              <span>CRB Tanzania</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#131b33]">
              <Droplet className="w-5 h-5 text-[#165cfd]" />
              <span>RUWASA</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#131b33]">
              <Building2 className="w-5 h-5 text-[#165cfd]" />
              <span>PO-RALG TAMISEMI</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#131b33]">
              <Gauge className="w-5 h-5 text-[#165cfd]" />
              <span>Ministry of Water</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#131b33]">
              <HardHat className="w-5 h-5 text-[#165cfd]" />
              <span>TARURA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. TOP 5 STRATEGIC PROJECTS
      ======================================================== */}
      <StrategicProjectsGrid limit={5} showFilter={true} />


      {/* ========================================================
          5. MICRO-INTERACTION FUNCTIONAL ARTIFACTS
      ======================================================== */}
      <MicroInteractions />

      {/* ========================================================
          6. CORE SERVICES GRID
      ======================================================== */}
      <section className="py-20 bg-[#f5f6f7]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="pill-tag mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>TECHNICAL DIVISIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#131b33] tracking-tight">
                Our Engineering Disciplines
              </h2>
              <p className="mt-3 text-base text-[#434f59] max-w-xl">
                Comprehensive civil, hydraulic, and building construction capabilities compliant with national procurement guidelines.
              </p>
            </div>
            <Link
              to="/services"
              className="btn-pill-outline-accent"
            >
              <span>View All 6 Service Disciplines</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.slice(0, 6).map((service, index) => (
              <div
                key={service.id}
                className="card-surface bg-white flex flex-col justify-between border border-[#ced0d2]/70 group hover:border-[#165cfd]/50"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#165cfd]/10 text-[#165cfd] flex items-center justify-center mb-6 group-hover:bg-[#165cfd] group-hover:text-white transition-colors duration-300">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#131b33] group-hover:text-[#165cfd] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#434f59] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-[#434f59]">
                    {service.details.slice(0, 3).map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#165cfd] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f5f6f7]">
                  <Link
                    to="/services"
                    className="text-xs font-bold text-[#165cfd] hover:text-[#131b33] inline-flex items-center gap-1 group/link"
                  >
                    <span>Inspect Division Standards</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. PHILOSOPHY & 4-PHASE PROTOCOL
      ======================================================== */}
      <DeliveryProtocol />

      {/* ========================================================
          8. TESTIMONIALS & FAQ
      ======================================================== */}
      <TestimonialsAndFAQ />

      {/* ========================================================
          9. CONVERSION BANNER (GET IN TOUCH)
      ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="bg-[#165cfd] rounded-[2.5rem] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl relative z-10">
              <span className="text-xs font-mono-telemetry font-bold tracking-wider uppercase bg-white/20 text-white px-3 py-1 rounded-full border border-white/20 inline-block mb-4">
                READY FOR PROCUREMENT &amp; TENDERS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight">
                Partner with a proven Tanzanian contractor.
              </h2>
              <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
                Whether you need a 70km rural water reticulation network, an elevated concrete water reservoir, or Class 7-compliant public institutional buildings, Mlaki delivers with audited excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
              <Link
                to="/contact"
                className="btn-pill-secondary !bg-white !text-[#165cfd] !border-transparent hover:!bg-[#131b33] hover:!text-white w-full sm:w-auto text-center"
              >
                <span>Request Project Proposal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="btn-pill-secondary !bg-transparent !text-white !border-white/40 hover:!bg-white/20 w-full sm:w-auto text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
