import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  Award, 
  Droplet, 
  Building2, 
  AlertTriangle,
  FileText,
  ChevronRight,
  HardHat
} from 'lucide-react';
import { COMPANY_INFO } from '../data/projectsData';
import { Link } from 'react-router-dom';

export default function CompliancePage() {
  const testingProtocols = [
    {
      title: "Hydrostatic Pipeline Pressure Hold Testing",
      standard: "BS EN 805 / TBS Specification",
      description: "Every single kilometer of installed HDPE and uPVC pipe undergoes rigorous water-filling, air purging, and pressurization to 1.5x nominal operating pressure (typically 16 to 24 bar) for a minimum 24-hour hold period to verify zero leakage.",
      metric: "24-Hour Pressure Hold with Digital Manometer Logging"
    },
    {
      title: "Reinforced Concrete Cube Crushing Strength",
      standard: "BS 1881 / TBS 135",
      description: "During structural casting of water reservoirs and building columns, concrete cubes (150mm x 150mm) are cast from each batch, cured in site water tanks, and crushed at 7 and 28 days in accredited government labs to verify compressive strength (Class C25 to C35).",
      metric: "Minimum 30 N/mm² at 28 Days for Water Reservoirs"
    },
    {
      title: "Reservoir Liquid-Retaining Watertightness",
      standard: "BS 8007 Code of Practice",
      description: "Upon formwork stripping, reservoirs are filled to full top water level (TWL) for 7 consecutive days. Water level drop is measured with micrometric hook gauges, accounting for evaporation, to certify 100% watertightness before disinfection.",
      metric: "Max Drop Permitted < 10mm Over 7 Days"
    },
    {
      title: "Groundwater Potability Laboratory Analysis",
      standard: "WHO & TBS Drinking Water Standards",
      description: "Water samples from newly flushed boreholes are tested across physical, chemical, and microbiological indices (pH, turbidity, heavy metals, fluoride, E. coli) through certified regional water quality testing laboratories.",
      metric: "Certified Potable Certificate Issued Per Well"
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#f5f6f7]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="pill-tag mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>REGULATORY ASSURANCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#131b33] tracking-tight">
            CRB Accreditation &amp; Quality Control
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#434f59] max-w-3xl leading-relaxed">
            Our commitment to engineering excellence is underpinned by rigorous adherence to the Contractors Registration Board (CRB) Act, Tanzanian Bureau of Standards (TBS), and international British Standards for hydraulic structures.
          </p>
        </div>

        {/* Verification Certificate Card */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#ced0d2]/70 shadow-sm mb-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#f5f6f7] gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#165cfd] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                CRB
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display text-[#131b33]">
                  Contractors Registration Board Tanzania
                </h2>
                <p className="text-xs text-[#8a8a8a]">
                  Statutory Regulatory Body Established Under Act No. 17 of 1997
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono-telemetry font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>OFFICIAL REGISTRATION STATUS: ACTIVE &amp; AUDITED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
            <div className="p-4 rounded-xl bg-[#f5f6f7] border border-[#ced0d2]/50">
              <span className="text-[10px] font-bold text-[#8a8a8a] uppercase block">Registration Number</span>
              <span className="text-base font-bold text-[#131b33] font-mono-telemetry mt-1 block">
                {COMPANY_INFO.crbNumber}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#f5f6f7] border border-[#ced0d2]/50">
              <span className="text-[10px] font-bold text-[#8a8a8a] uppercase block">Civil Works Licensing</span>
              <span className="text-base font-bold text-[#165cfd] font-mono-telemetry mt-1 block">
                Class 4 Certified
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#f5f6f7] border border-[#ced0d2]/50">
              <span className="text-[10px] font-bold text-[#8a8a8a] uppercase block">Building Works Licensing</span>
              <span className="text-base font-bold text-[#131b33] font-mono-telemetry mt-1 block">
                Class 6 / 7 Compliant
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#f5f6f7] border border-[#ced0d2]/50">
              <span className="text-[10px] font-bold text-[#8a8a8a] uppercase block">Tax Identification</span>
              <span className="text-base font-bold text-[#131b33] font-mono-telemetry mt-1 block">
                TIN: {COMPANY_INFO.tin}
              </span>
            </div>
          </div>

          <div className="text-xs text-[#434f59] leading-relaxed pt-4 border-t border-[#f5f6f7]">
            <strong>Tender Pre-qualification Notice:</strong> Mlaki Building &amp; Water Engineering Ltd is authorized to bid and execute government contracts under the Public Procurement Act (PPA) for RUWASA, TARURA, PO-RALG, Regional Water Authorities, and private development conglomerates.
          </div>
        </div>

        {/* 4 QA/QC Testing Standards */}
        <div className="mb-20">
          <div className="mb-10">
            <div className="pill-tag mb-3">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>TESTING &amp; LAB RIGOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#131b33] tracking-tight">
              Rigorous Laboratory &amp; Field Quality Protocols
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#434f59]">
              Every phase of execution is logged, verified with digital instruments, and countersigned by independent supervising engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingProtocols.map((protocol, pIdx) => (
              <div
                key={pIdx}
                className="card-surface bg-white border border-[#ced0d2]/70 p-8 rounded-[2rem] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#f5f6f7]">
                    <span className="text-xs font-mono-telemetry text-[#165cfd] font-bold">
                      PROTOCOL 0{pIdx + 1}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f5f6f7] text-[#131b33] font-medium border border-[#ced0d2]/50">
                      {protocol.standard}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#131b33] mt-4">
                    {protocol.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#434f59] leading-relaxed">
                    {protocol.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f5f6f7] bg-[#f5f6f7] p-3.5 rounded-xl">
                  <span className="text-[10px] font-bold text-[#8a8a8a] uppercase block">
                    Benchmark Target:
                  </span>
                  <span className="text-xs font-bold text-[#165cfd] font-mono-telemetry mt-0.5 block">
                    {protocol.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quality & Compliance Photo Gallery ───────────────── */}
        <div className="mb-16">
          <div className="pill-tag mb-4">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>FIELD QUALITY VERIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#131b33] tracking-tight mb-6">
            Audited. Tested. Certified.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-56 relative group">
              <img
                src="https://images.pexels.com/photos/29809623/pexels-photo-29809623.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Pipeline pressure testing and quality inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">PRESSURE TESTING</span>
            </div>
            <div className="md:col-span-3 rounded-2xl overflow-hidden h-56 relative group">
              <img
                src="https://images.pexels.com/photos/30162592/pexels-photo-30162592.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Structural concrete quality control"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">CONCRETE QA</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/38070/pexels-photo-38070.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Safety helmets and PPE for construction site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">PPE & HSE</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/8487375/pexels-photo-8487375.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Water quality laboratory testing and analysis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">WATER LAB TESTING</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Borehole drilling rig field operations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">BOREHOLE DRILLING</span>
            </div>
          </div>
        </div>

        {/* Health, Safety & Environment (HSE) Policy */}
        <div className="bg-[#101828] text-white rounded-[2.5rem] p-8 sm:p-12 border border-white/10 mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#165cfd]/20 text-[#165cfd] text-xs font-mono-telemetry font-bold mb-3">
              <HardHat className="w-3.5 h-3.5" />
              <span>HSE COMMITMENT</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-white">
              Zero-Harm Health, Safety &amp; Environment Policy
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Compliant with the Occupational Health and Safety Act (OSHA) 2003 of Tanzania.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/80">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-base">Trench Shoring Safety</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Mandatory hydraulic shoring boxes or 45-degree angle of repose sloping in all trenches exceeding 1.2m depth to protect pipeline installation personnel.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-base">Working at Heights (Reservoirs)</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                100% tie-off harness systems, safety catch netting, and certified scaffolding tags for elevated tower casting above 3 meters.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-base">Environmental Remediation</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Complete backfilling, soil compaction, and site re-greening with local vegetation following pipeline trenching to prevent erosion.
              </p>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center">
          <Link
            to="/contact"
            className="btn-pill-primary !px-8 !py-3.5"
          >
            <span>Request Verified Compliance Dossier</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
