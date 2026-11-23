import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border border-white/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual in Modal */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#165cfd] text-white text-xs font-semibold">
                {project.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono-telemetry border border-white/20">
                CRB VERIFIED CASE STUDY #{project.number}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-white/80">
              <MapPin className="w-4 h-4 text-[#165cfd]" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#f5f6f7] rounded-2xl border border-[#ced0d2]/60">
            <div>
              <span className="text-[11px] font-semibold text-[#8a8a8a] uppercase tracking-wider block">
                Contracting Client
              </span>
              <span className="text-sm font-bold text-[#131b33] mt-0.5 block">
                {project.client}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#8a8a8a] uppercase tracking-wider block">
                Project Duration
              </span>
              <span className="text-sm font-bold text-[#131b33] mt-0.5 block">
                {project.duration}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#8a8a8a] uppercase tracking-wider block">
                Contract Value
              </span>
              <span className="text-sm font-bold text-[#165cfd] mt-0.5 block">
                {project.value}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#8a8a8a] uppercase tracking-wider block">
                Classification
              </span>
              <span className="text-sm font-bold text-[#131b33] mt-0.5 block">
                {project.category}
              </span>
            </div>
          </div>

          {/* Project Detailed Description */}
          <div>
            <h3 className="text-lg font-bold font-display text-[#131b33] mb-3">
              Comprehensive Scope & Engineering Execution
            </h3>
            <p className="text-[#434f59] leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div>
            <h3 className="text-lg font-bold font-display text-[#131b33] mb-4">
              Technical Specifications & Compliance Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.technicalSpecs.map((spec, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#ced0d2]/70 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#165cfd] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#8a8a8a] block">{spec.label}</span>
                    <span className="text-sm font-semibold text-[#131b33]">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Socio-Economic Impact Statement */}
          <div className="p-5 rounded-2xl bg-[#165cfd]/5 border border-[#165cfd]/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#165cfd] text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#131b33] uppercase tracking-wide">
                Delivered Community & Environmental Impact
              </h4>
              <p className="text-sm text-[#434f59] mt-1">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ced0d2]/60">
            <span className="text-xs text-[#8a8a8a] font-mono-telemetry">
              AUDITED DOCUMENTATION // CRB APPROVED
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="btn-pill-secondary w-full sm:w-auto !py-2.5 !px-6 text-sm"
              >
                Close Dossier
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="btn-pill-primary w-full sm:w-auto !py-2.5 !px-6 text-sm flex items-center justify-center gap-2"
              >
                <span>Inquire Similar Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
