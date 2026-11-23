import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Quote, 
  Star, 
  HelpCircle, 
  ShieldCheck, 
  Award,
  Building
} from 'lucide-react';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/projectsData';

export default function TestimonialsAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f5f6f7] py-20 space-y-24">
      {/* Testimonials Band */}
      <section className="max-w-[1140px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-tag mb-3 inline-flex">
            <Award className="w-3.5 h-3.5" />
            <span>PUBLIC SECTOR RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#131b33] tracking-tight">
            What Project Engineers Say
          </h2>
          <p className="mt-3 text-base text-[#434f59]">
            Trusted by national water authorities, local government directorates, and community water committees across Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="card-surface bg-white flex flex-col justify-between border border-[#ced0d2]/70 relative group"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#434f59] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f5f6f7] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#165cfd]/10 text-[#165cfd] font-bold flex items-center justify-center shrink-0 border border-[#165cfd]/20">
                  {item.author.charAt(4) || 'E'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131b33] font-display">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#8a8a8a]">
                    {item.title} · {item.organization}
                  </p>
                  <span className="text-[11px] font-mono-telemetry text-[#165cfd]">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Band */}
      <section className="max-w-[920px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="pill-tag mb-3 inline-flex">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CONTRACTOR CLARIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#131b33] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[#434f59]">
            Transparent answers regarding our CRB licensing, procurement criteria, and testing protocols.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#ced0d2]/70 overflow-hidden transition-all duration-300 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-[#131b33] hover:text-[#165cfd] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#165cfd] text-white rotate-180' : 'bg-[#f5f6f7] text-[#131b33]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#434f59] leading-relaxed border-t border-[#f5f6f7] pt-4 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
