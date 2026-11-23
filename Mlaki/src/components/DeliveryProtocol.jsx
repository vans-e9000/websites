import React from 'react';
import { 
  Compass, 
  Shovel, 
  Wrench, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Droplet
} from 'lucide-react';

export default function DeliveryProtocol() {
  const steps = [
    {
      step: "01",
      title: "Hydrogeological Exploration & Digital Surveying",
      subtitle: "Pre-construction Feasibility & Resistivity Mapping",
      description: "We deploy high-precision digital total stations, RTK GPS systems, and Vertical Electrical Sounding (VES) equipment to map fractured rock aquifers and compute hydraulic elevation profiles before breaking ground.",
      tags: ["VES Geophysics", "GPS RTK Grade", "EIA Compliant"],
      icon: Compass
    },
    {
      step: "02",
      title: "Controlled Excavation & Formwork Shoring",
      subtitle: "Substructure Engineering & Trench Stability",
      description: "Our heavy earthmoving fleet cuts precision trenches to 1.2m depth with proper sand cushioning. For overhead water reservoirs, heavy-duty scaffolding and circular steel formwork are assembled to withstand high hydraulic loads.",
      tags: ["1.2m Depth Minimum", "Sand Bedding Cushion", "Shoring Safety"],
      icon: Shovel
    },
    {
      step: "03",
      title: "Automated HDPE Butt-Fusion & Monolithic Pouring",
      subtitle: "Mechanical Joining & Class C30/37 Concrete",
      description: "Certified technicians fuse HDPE PE100 pipes using calibrated hydraulic butt-welding rigs with automatic temperature and pressure logging. For reservoirs, concrete is poured continuously with crystalline waterproofing admixtures.",
      tags: ["Data-Logged Butt Fusion", "BS 8007 Liquid Retaining", "C30/37 Grade"],
      icon: Wrench
    },
    {
      step: "04",
      title: "20-Bar Hydrostatic Testing & CRB Commissioning",
      subtitle: "Pressure Hold Verification & Public Handover",
      description: "Every pipeline segment undergoes 24-hour hydrostatic pressure hold tests at 1.5x working pressure. Concrete tanks are water-filled for 7 days to verify zero seepage prior to disinfection and official handover to RUWASA or PO-RALG.",
      tags: ["BS EN 805 Testing", "Chlorination Sanitized", "CRB Audit Pass"],
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-24 bg-[#101828] text-white relative overflow-hidden">
      {/* Background visual motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#165cfd_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6 relative z-10">
        {/* Section Manifesto Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#165cfd]/20 text-[#165cfd] border border-[#165cfd]/30 text-xs font-mono-telemetry font-bold mb-4">
            <Flame className="w-3.5 h-3.5 text-[#165cfd]" />
            <span>THE MLAKI ENGINEERING MANIFESTO</span>
          </div>

          <p className="text-white/60 text-base sm:text-lg mb-2">
            Most general contractors focus on: <span className="text-white font-medium">expedited surface completions.</span>
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            We focus on: <span className="text-[#165cfd] italic">generational durability</span>, rigorous hydraulic testing, and community water sovereignty.
          </h2>
        </div>

        {/* 4 Stacking Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-8 sm:p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#165cfd]/50 hover:bg-white/[0.07] transition-all duration-400 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-4xl font-extrabold font-mono-telemetry text-[#165cfd]">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#165cfd]/20 text-[#165cfd] flex items-center justify-center group-hover:bg-[#165cfd] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-xs font-mono-telemetry text-white/50 uppercase tracking-wider block mt-6">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1 group-hover:text-[#165cfd] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 font-mono-telemetry"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
