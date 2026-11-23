import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Droplet, 
  Building,
  Target,
  Compass,
  FileText,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/projectsData';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: "Eng. Gilbert Mlaki",
      role: "Managing Director & Principal Civil Engineer",
      credentials: "B.Sc. Civil & Structural Engineering (UDSM), Registered Consulting Engineer ERB",
      bio: "Over 18 years directing large-scale civil works, rural water reticulation programs, and municipal infrastructure across Tanzania."
    },
    {
      name: "Eng. Anthony Mlaki",
      role: "Director of Field Operations & Heavy Machinery",
      credentials: "B.Sc. Mechanical & Construction Plant Management",
      bio: "Supervises our mobile fleet, HDPE pipeline fusion logistics, and high-precision structural concrete installations nationwide."
    },
    {
      name: "Dr. Amina J. Mwakyusa",
      role: "Lead Hydrogeologist & Groundwater Director",
      credentials: "Ph.D. Hydrogeology & Geophysics",
      bio: "Spearheads our aquifer exploration, VES resistivity soundings, and deep borehole yield testing protocols."
    },
    {
      name: "Eng. Baraka S. Mushi",
      role: "Chief Quality Assurance & Structural Inspector",
      credentials: "M.Sc. Structural Engineering, Certified CRB QA Auditor",
      bio: "Guarantees 100% compliance with BS 8007 liquid-retaining standards and coordinates independent concrete cube testing."
    }
  ];

  const fleetInventory = [
    { category: "Trenching & Excavation", items: "4x CAT & Komatsu 20-Ton Hydraulic Excavators, 2x Backhoe Loaders" },
    { category: "Groundwater Exploration", items: "2x Heavy Rotary DTH Pneumatic Drill Rigs (capable of 250m depth)" },
    { category: "Pipeline Welding", items: "6x Hydraulic Automatic Butt-Fusion Welders (up to DN 500mm), Electrofusion kits" },
    { category: "Concrete & Formwork", items: "2x Mobile 40m³/hr Batching Plants, 4x Concrete Mixers, 10,000m² tubular scaffolding" },
    { category: "Surveying & Geodesy", items: "3x Leica Robotic Total Stations, 4x Dual-Frequency RTK GNSS GPS Units" },
    { category: "Testing & Diagnostics", items: "Digital hydrostatic pipeline pressure testing skids (up to 30 bar), ultrasonic flow meters" }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#f5f6f7]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Page Title */}
        <div className="mb-16">
          <div className="pill-tag mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CORPORATE PROFILE &amp; HERITAGE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#131b33] tracking-tight">
            Engineering with Integrity Across Tanzania
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#434f59] max-w-3xl leading-relaxed">
            Registered with the Contractors Registration Board (CRB) of Tanzania, Mlaki Building &amp; Water Engineering Ltd has spent over a decade delivering critical water supply networks and institutional infrastructure that empower communities.
          </p>
        </div>

        {/* Corporate Highlights Banner */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#ced0d2]/70 shadow-sm mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xs font-mono-telemetry text-[#8a8a8a] uppercase block">
              Contractor Registration
            </span>
            <span className="text-2xl font-bold text-[#131b33] font-display mt-1 block">
              {COMPANY_INFO.crbNumber}
            </span>
            <p className="text-xs text-[#434f59] mt-2">
              Audited and fully active under the Contractors Registration Board Act Cap 235 of Tanzania.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono-telemetry text-[#8a8a8a] uppercase block">
              Certified Categories
            </span>
            <span className="text-2xl font-bold text-[#165cfd] font-display mt-1 block">
              Class 4 &amp; Class 7
            </span>
            <p className="text-xs text-[#434f59] mt-2">
              Licensed for Civil Works (Class 4) and Building Works (Class 6/7 Compliant).
            </p>
          </div>
          <div>
            <span className="text-xs font-mono-telemetry text-[#8a8a8a] uppercase block">
              Operational Footprint
            </span>
            <span className="text-2xl font-bold text-[#131b33] font-display mt-1 block">
              Nationwide Tanzania
            </span>
            <p className="text-xs text-[#434f59] mt-2">
              Headquarters in Dar es Salaam with regional operations in Dodoma, Mbeya, Morogoro, and Mtwara.
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="card-surface bg-white border border-[#ced0d2]/70 p-8 sm:p-10 rounded-[2rem]">
            <div className="w-12 h-12 rounded-2xl bg-[#165cfd]/10 text-[#165cfd] flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-display text-[#131b33]">
              Our Mission
            </h3>
            <p className="mt-3 text-[#434f59] leading-relaxed text-sm sm:text-base">
              To construct durable, life-sustaining water networks, reinforced storage reservoirs, and educational-healthcare facilities through uncompromising engineering rigor, transparent procurement, and respectful community partnership across the United Republic of Tanzania.
            </p>
          </div>

          <div className="card-surface bg-white border border-[#ced0d2]/70 p-8 sm:p-10 rounded-[2rem]">
            <div className="w-12 h-12 rounded-2xl bg-[#165cfd]/10 text-[#165cfd] flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-display text-[#131b33]">
              Our Vision
            </h3>
            <p className="mt-3 text-[#434f59] leading-relaxed text-sm sm:text-base">
              To be recognized as East Africa's premier domestic engineering contractor in rural water reticulation, solar aquifer development, and resilient civil structures, setting the benchmark for local technical self-reliance.
            </p>
          </div>
        </div>

        {/* ── Photo Gallery: On-Site Engineering ───────────────── */}
        <div className="mb-20">
          <div className="pill-tag mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>ON-SITE ENGINEERING OPERATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#131b33] tracking-tight mb-6">
            Where Precision Meets the Field
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Row 1 */}
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Civil engineering crew on-site Tanzania"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">SITE OPERATIONS</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group">
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Construction planning and quality assurance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">QA & PLANNING</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Engineering team meeting and coordination"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">TEAM COORDINATION</span>
            </div>
            {/* Row 2 */}
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group col-span-2 md:col-span-1">
              <img
                src="https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Civil works concrete and structural engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">STRUCTURAL WORKS</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group">
              <img
                src="https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Solar panels for borehole water pumping system"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">SOLAR ENERGY</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative group">
              <img
                src="https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Water infrastructure and pipe reticulation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">WATER SYSTEMS</span>
            </div>
          </div>
        </div>

        {/* Executive Leadership Team */}
        <div className="mb-20">
          <div className="mb-10">
            <div className="pill-tag mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>TECHNICAL LEADERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#131b33] tracking-tight">
              Executive Directors &amp; Chief Engineers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div
                key={idx}
                className="card-surface bg-white border border-[#ced0d2]/70 p-8 rounded-[2rem] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono-telemetry text-[#165cfd] font-bold">
                    OFFICER #{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[#131b33] mt-1">
                    {leader.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#8a8a8a] block mt-0.5">
                    {leader.role}
                  </span>
                  <p className="text-xs text-[#165cfd] font-mono-telemetry mt-2 bg-[#165cfd]/5 p-2 rounded-lg border border-[#165cfd]/10">
                    {leader.credentials}
                  </p>
                  <p className="text-sm text-[#434f59] mt-3 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machinery & Fleet Inventory */}
        <div className="bg-[#101828] text-white rounded-[2.5rem] p-8 sm:p-12 border border-white/10 mb-16">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#165cfd]/20 text-[#165cfd] text-xs font-mono-telemetry font-bold mb-3">
              <Truck className="w-3.5 h-3.5" />
              <span>HEAVY ASSETS &amp; PLANT CAPACITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Company-Owned Heavy Plant &amp; Testing Rigs
            </h2>
            <p className="mt-2 text-sm text-white/70">
              We own and maintain our fleet directly to ensure total independence from equipment rental bottlenecks, guaranteeing strict adherence to project deadlines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetInventory.map((fleet, fIdx) => (
              <div
                key={fIdx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
              >
                <span className="text-xs font-bold text-[#165cfd] uppercase font-mono-telemetry">
                  {fleet.category}
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {fleet.items}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Tender CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="btn-pill-primary !px-8 !py-3.5 text-base"
          >
            <span>Request Company Profile &amp; Audited Financials</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
