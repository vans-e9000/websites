import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Droplet,
  FileText,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/projectsData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    serviceRequired: 'Rural Water Reticulation (RUWASA)',
    location: '',
    estimatedBudget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-28 pb-20 bg-[#f5f6f7]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="pill-tag mb-4">
            <Send className="w-3.5 h-3.5" />
            <span>TENDER &amp; PROJECT INQUIRIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#131b33] tracking-tight">
            Initiate Project Consultation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#434f59] max-w-3xl leading-relaxed">
            Submit your project scope, Bill of Quantities (BOQ), or tender inquiry directly to our engineering estimating desk in Dar es Salaam and Dodoma.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#ced0d2]/70 shadow-sm">
            {submitted ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-[#165cfd]/5 border border-[#165cfd]/20 text-center space-y-4 animate-in fade-in duration-400">
                <div className="w-16 h-16 rounded-full bg-[#165cfd] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#131b33]">
                  Tender Inquiry Successfully Logged
                </h3>
                <p className="text-sm text-[#434f59] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Our senior estimating engineer has received your specifications for <strong>{formData.serviceRequired}</strong>. An initial BOQ review and response will be transmitted to <strong>{formData.email}</strong> within 24 to 48 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-pill-primary text-xs !py-2.5 !px-6"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#131b33]">
                    Official Project Inquiry Form
                  </h3>
                  <p className="text-xs text-[#8a8a8a] mt-1">
                    All fields marked are reviewed confidentially by our certified engineering team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Eng. Juma Mwita"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Authority / Organization *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      placeholder="e.g. RUWASA Chamwino / District Council"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. juma@authority.go.tz"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+255 7XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Engineering Discipline *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full h-12 px-3 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none bg-white transition-all"
                    >
                      <option>Rural Water Reticulation (RUWASA)</option>
                      <option>Reinforced Concrete Reservoir / Tower</option>
                      <option>Borehole Drilling &amp; Solar Pumping</option>
                      <option>Institutional &amp; Class 7 Building Works</option>
                      <option>Masonry Stormwater Drains &amp; Culverts</option>
                      <option>Heavy Plant &amp; Rig Hire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                      Project Location (Region/District)
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Dodoma, Morogoro, Mtwara"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b33] uppercase mb-1.5">
                    Project Scope Details &amp; Specifications
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Briefly describe the proposed pipeline length, reservoir capacity, site accessibility, or tender submission deadline..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-[#ced0d2] text-sm text-[#131b33] focus:border-[#165cfd] focus:ring-2 focus:ring-[#165cfd]/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill-primary w-full !py-3.5 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Data...' : 'Submit Official Tender Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Regional Hubs & Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Photo Gallery Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden h-44 relative group">
                <img
                  src="https://images.pexels.com/photos/29809623/pexels-photo-29809623.jpeg?auto=compress&cs=tinysrgb&w=700"
                  alt="Mlaki pipeline installation Dodoma region"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold font-mono-telemetry">DAR ES SALAAM</span>
              </div>
              <div className="rounded-2xl overflow-hidden h-44 relative group">
                <img
                  src="https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=700"
                  alt="Mlaki building works Dodoma hub"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold font-mono-telemetry">DODOMA HUB</span>
              </div>
              <div className="rounded-2xl overflow-hidden h-44 relative group">
                <img
                  src="https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=700"
                  alt="Mbeya drilling and civil works base"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold font-mono-telemetry">MBEYA BASE</span>
              </div>
              <div className="rounded-2xl overflow-hidden h-44 relative group">
                <img
                  src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=700"
                  alt="Morogoro water infrastructure operations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-[10px] font-bold font-mono-telemetry">MOROGORO</span>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="card-surface bg-white border border-[#ced0d2]/70 p-8 rounded-[2rem]">
              <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider block mb-2">
                HEAD OFFICE // DAR ES SALAAM
              </span>
              <h3 className="text-xl font-bold font-display text-[#131b33]">
                Mlaki Corporate Headquarters
              </h3>
              <p className="text-sm text-[#434f59] mt-2 leading-relaxed">
                {COMPANY_INFO.address.headquarters}
              </p>

              <div className="mt-4 pt-4 border-t border-[#f5f6f7] space-y-2.5 text-xs text-[#434f59]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#165cfd]" />
                  <span>{COMPANY_INFO.phone} / {COMPANY_INFO.phoneSecondary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#165cfd]" />
                  <span>{COMPANY_INFO.tendersEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#165cfd]" />
                  <span>Monday – Friday: 08:00 – 17:30 EAT</span>
                </div>
              </div>
            </div>

            {/* Dodoma Regional Hub */}
            <div className="card-surface bg-white border border-[#ced0d2]/70 p-8 rounded-[2rem]">
              <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider block mb-2">
                CENTRAL OPERATIONS // DODOMA
              </span>
              <h3 className="text-xl font-bold font-display text-[#131b33]">
                RUWASA Liaison &amp; Central Hub
              </h3>
              <p className="text-sm text-[#434f59] mt-2 leading-relaxed">
                {COMPANY_INFO.address.dodomaHub}
              </p>
              <p className="text-xs text-[#8a8a8a] mt-2">
                Dedicated project dispatch base for Chamwino, Kondoa, Bahi, and Kongwa water schemes.
              </p>
            </div>

            {/* Southern Highlands Hub */}
            <div className="card-surface bg-white border border-[#ced0d2]/70 p-8 rounded-[2rem]">
              <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider block mb-2">
                SOUTHERN HIGHLANDS // MBEYA
              </span>
              <h3 className="text-xl font-bold font-display text-[#131b33]">
                Capcon / Mlaki Engineering Yard
              </h3>
              <p className="text-sm text-[#434f59] mt-2 leading-relaxed">
                {COMPANY_INFO.address.mbeyaBase}
              </p>
              <p className="text-xs text-[#8a8a8a] mt-2">
                Heavy plant storage, rotary drilling maintenance base, and concrete aggregate staging yard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
