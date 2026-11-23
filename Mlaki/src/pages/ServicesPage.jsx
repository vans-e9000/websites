import React, { useState } from 'react';
import { 
  Droplet, 
  Building2, 
  SunMedium, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Sliders,
  FileCheck2,
  ChevronRight,
  HardHat
} from 'lucide-react';
import { SERVICES_LIST, COMPANY_INFO } from '../data/projectsData';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  /* Interactive Scope Estimator State */
  const [serviceType, setServiceType] = useState('water-reticulation');
  const [scopeQuantity, setScopeQuantity] = useState(25); // km or units or sqm

  const getEstimatorResult = () => {
    switch (serviceType) {
      case 'water-reticulation':
        return {
          label: `${scopeQuantity} km HDPE / uPVC Network`,
          estimatedDuration: `${Math.round(scopeQuantity * 0.25 + 2)} - ${Math.round(scopeQuantity * 0.35 + 4)} Months`,
          equipment: ['2x 20-Ton Excavators', '4x Butt-Fusion Rigs', '1x Total Station Survey Crew', 'Pressure Testing Pumps'],
          testing: 'Hydrostatic pressure hold test up to 20 bar (BS EN 805)'
        };
      case 'concrete-reservoir':
        return {
          label: `${scopeQuantity * 20} m³ Capacity Overhead / Ground Reservoir`,
          estimatedDuration: `${Math.round(scopeQuantity * 0.15 + 4)} - ${Math.round(scopeQuantity * 0.2 + 6)} Months`,
          equipment: ['Mobile Concrete Batching Plant', 'Tubular Scaffolding System', 'Vibrating Screeds', 'Crane Rigging'],
          testing: '7-Day Water Retaining Integrity & Cube Crushing Tests (BS 8007)'
        };
      case 'borehole-solar':
        return {
          label: `${Math.round(scopeQuantity * 6)} Meters Deep Aquifer Borehole + Solar Array`,
          estimatedDuration: `${Math.round(scopeQuantity * 0.08 + 1)} - ${Math.round(scopeQuantity * 0.12 + 2)} Months`,
          equipment: ['Rotary DTH Pneumatic Rig', 'Mud Pump System', '72hr Test Pumping Unit', 'Solar Inverter Racks'],
          testing: 'Step-Drawdown Recovery Yield & Water Chemistry Lab Analysis'
        };
      case 'institutional-building':
        return {
          label: `${scopeQuantity * 40} m² Built-up Classrooms / Dispensary Block`,
          estimatedDuration: `${Math.round(scopeQuantity * 0.15 + 3)} - ${Math.round(scopeQuantity * 0.25 + 5)} Months`,
          equipment: ['Compaction Rollers', 'Concrete Mixers', 'Scaffolding Towers', 'Timber Truss Jigs'],
          testing: 'Class 7 Building Code Verification & Structural Certificate'
        };
      default:
        return {
          label: 'Custom Engineering Works',
          estimatedDuration: '4 - 8 Months',
          equipment: ['Heavy Earthmoving & Compaction Equipment'],
          testing: 'CRB Standard Compliance'
        };
    }
  };

  const estimate = getEstimatorResult();

  return (
    <div className="pt-28 pb-20 bg-[#f5f6f7]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header Title */}
        <div className="mb-16">
          <div className="pill-tag mb-4">
            <HardHat className="w-3.5 h-3.5" />
            <span>ENGINEERING CAPABILITIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#131b33] tracking-tight">
            Comprehensive Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#434f59] max-w-3xl leading-relaxed">
            Delivering robust public infrastructure compliant with CRB Tanzania, RUWASA, and TARURA specifications. From regional water reticulation to reinforced reservoirs, deep drilling, and institutional buildings.
          </p>
        </div>

        {/* 6 Services Deep-Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES_LIST.map((srv, idx) => (
            <div
              key={srv.id}
              className="card-surface bg-white border border-[#ced0d2]/70 flex flex-col justify-between p-8 sm:p-10 rounded-[2rem] hover:shadow-xl transition-all duration-400 group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#f5f6f7]">
                  <div className="w-12 h-12 rounded-2xl bg-[#165cfd]/10 text-[#165cfd] flex items-center justify-center group-hover:bg-[#165cfd] group-hover:text-white transition-colors duration-300">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono-telemetry font-bold text-[#8a8a8a]">
                    SERVICE 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#131b33] mt-6 group-hover:text-[#165cfd] transition-colors">
                  {srv.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#434f59] leading-relaxed">
                  {srv.shortDesc}
                </p>

                {/* Sub-item checklists */}
                <div className="mt-6 pt-6 border-t border-[#f5f6f7] space-y-2.5">
                  <span className="text-xs font-bold text-[#131b33] uppercase tracking-wider block">
                    Execution Methodologies &amp; Standards:
                  </span>
                  {srv.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#434f59]">
                      <CheckCircle2 className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#f5f6f7] flex items-center justify-between">
                <span className="text-xs font-mono-telemetry text-[#8a8a8a]">
                  CRB STANDARDS AUDITED
                </span>
                <Link
                  to="/contact"
                  className="btn-pill-primary text-xs !py-2 !px-5"
                >
                  <span>Request Scope BOQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Services Photo Gallery ──────────────────────────── */}
        <div className="mb-16">
          <div className="pill-tag mb-4">
            <Droplet className="w-3.5 h-3.5" />
            <span>WORKS IN PROGRESS — FIELD EVIDENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#131b33] tracking-tight mb-6">
            Every Service — Evidenced on the Ground
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="HDPE water pipeline installation and trenching"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">PIPELINE WORKS</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Institutional building and construction erection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">BUILDING ERECTION</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/8487401/pexels-photo-8487401.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Water reservoir concrete casting and structural works"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">RESERVOIR CASTING</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Rural water supply and community borehole"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">RURAL WATER SUPPLY</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Solar borehole pumping and renewable energy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">SOLAR PUMPING</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            Interactive Scope & Timeline Estimator Tool
        ======================================================== */}
        <section className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-[#ced0d2]/70 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <div className="pill-tag mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>INTERACTIVE PLANNING TOOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#131b33] tracking-tight">
              Project Scope &amp; Timeline Estimator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#434f59]">
              Select an engineering division and scale to calculate typical execution timelines, machinery requirements, and testing standards based on our historical project benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Control Form (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-[#131b33] uppercase tracking-wider block mb-2">
                  1. Select Engineering Discipline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'water-reticulation', label: 'Water Reticulation' },
                    { id: 'concrete-reservoir', label: 'Concrete Reservoir' },
                    { id: 'borehole-solar', label: 'Borehole & Solar' },
                    { id: 'institutional-building', label: 'Institutional Building' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setServiceType(item.id)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                        serviceType === item.id
                          ? 'bg-[#165cfd] text-white border-[#165cfd] shadow-sm'
                          : 'bg-[#f5f6f7] text-[#131b33] border-[#ced0d2]/60 hover:bg-black/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#131b33] uppercase tracking-wider">
                    2. Scale / Quantity Parameter
                  </label>
                  <span className="text-sm font-mono-telemetry font-bold text-[#165cfd]">
                    Value: {scopeQuantity}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={scopeQuantity}
                  onChange={(e) => setScopeQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-[#f5f6f7] rounded-lg appearance-none cursor-pointer accent-[#165cfd]"
                />
                <div className="flex justify-between text-[11px] text-[#8a8a8a] mt-1">
                  <span>Small / Local Scale (5)</span>
                  <span>Regional Scheme (100)</span>
                </div>
              </div>
            </div>

            {/* Generated Calculation Card (6 Cols) */}
            <div className="lg:col-span-6 bg-[#101828] text-white p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono-telemetry text-emerald-400 font-bold">
                  ESTIMATED BENCHMARK
                </span>
                <span className="text-xs font-mono-telemetry text-white/50">
                  CRB CAP 235 MODEL
                </span>
              </div>

              <div>
                <span className="text-xs text-white/60 block">Scope Parameter</span>
                <h4 className="text-xl font-bold font-display text-white mt-0.5">
                  {estimate.label}
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/60 block">Projected Completion Timeline</span>
                  <span className="text-lg font-bold text-[#165cfd] font-display">
                    {estimate.estimatedDuration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/60 block">Shift Allocation</span>
                  <span className="text-xs font-mono-telemetry text-white font-semibold">
                    Double-Crew Ready
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-white/60 block mb-1.5">Key Machinery Deployed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {estimate.equipment.map((eq, i) => (
                    <span key={i} className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-md">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50">QA Validation: {estimate.testing}</span>
                <Link
                  to="/contact"
                  className="btn-pill-primary !py-2 !px-4 text-xs !bg-[#165cfd]"
                >
                  <span>Submit Exact BOQ</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
