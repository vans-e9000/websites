import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Layers,
  Droplet,
  Building2,
  FileCheck
} from 'lucide-react';
import { TOP_5_STRATEGIC_PROJECTS, COMPANY_INFO } from '../data/projectsData';
import ProjectModal from '../components/ProjectModal';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  const filterOptions = [
    'All',
    'Water Engineering',
    'Structural Civil Works',
    'Building Works',
    'Groundwater & Renewable Energy',
    'Civil Infrastructure'
  ];

  const projects = selectedFilter === 'All'
    ? TOP_5_STRATEGIC_PROJECTS
    : TOP_5_STRATEGIC_PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <div className="pt-28 pb-20 bg-[#f5f6f7]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header Breadcrumb & Title */}
        <div className="mb-14">
          <div className="pill-tag mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTRACTOR CASE STUDIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#131b33] tracking-tight">
            Strategic Engineering Projects
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#434f59] max-w-3xl leading-relaxed">
            Detailed dossiers on our benchmark contracts across Tanzania: high-capacity HDPE water pipelines, elevated reinforced concrete towers, solar borehole schemes, institutional facilities, and regional flood mitigation infrastructure.
          </p>

          {/* Filter Pills Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2 bg-white p-2 rounded-full border border-[#ced0d2]/70 shadow-xs">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedFilter === opt
                    ? 'bg-[#165cfd] text-white shadow-sm'
                    : 'text-[#434f59] hover:text-[#131b33] hover:bg-black/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card-surface bg-white border border-[#ced0d2]/70 hover:shadow-xl transition-all duration-400 p-0 overflow-hidden rounded-[2rem] grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* Project Image Column (5 Cols) */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />

                {/* Badges on Visual */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#165cfd] text-white text-xs font-semibold shadow-sm">
                    {project.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono-telemetry border border-white/20">
                    PROJECT #{project.number}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                  <span className="text-xs text-white/80">{project.location}</span>
                  <h3 className="text-xl font-bold font-display">{project.title}</h3>
                </div>
              </div>

              {/* Project Details Column (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="hidden lg:flex items-center justify-between pb-3 border-b border-[#f5f6f7]">
                    <div className="flex items-center gap-2 text-xs text-[#8a8a8a]">
                      <MapPin className="w-3.5 h-3.5 text-[#165cfd]" />
                      <span>{project.location}</span>
                    </div>
                    <span className="text-xs font-mono-telemetry text-[#165cfd] font-bold">
                      {project.value}
                    </span>
                  </div>

                  <h3 className="hidden lg:block text-2xl font-bold font-display text-[#131b33] mt-3">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#434f59] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Client & Timeline Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-[#f5f6f7] border border-[#ced0d2]/50 text-xs">
                    <div>
                      <span className="text-[#8a8a8a] block uppercase text-[10px] font-bold">Contract Client</span>
                      <span className="font-semibold text-[#131b33]">{project.client}</span>
                    </div>
                    <div>
                      <span className="text-[#8a8a8a] block uppercase text-[10px] font-bold">Execution Period</span>
                      <span className="font-semibold text-[#131b33]">{project.duration}</span>
                    </div>
                    <div>
                      <span className="text-[#8a8a8a] block uppercase text-[10px] font-bold">Engineering Discipline</span>
                      <span className="font-semibold text-[#165cfd]">{project.category}</span>
                    </div>
                  </div>

                  {/* Technical Specs List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#131b33] uppercase tracking-wider block">
                      Audited Technical Standards:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#434f59]">
                      {project.technicalSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#165cfd] shrink-0" />
                          <span><strong>{spec.label}:</strong> {spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-[#f5f6f7] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setModalProject(project)}
                    className="btn-pill-primary w-full sm:w-auto text-xs sm:text-sm !py-2.5 !px-6"
                  >
                    <span>Open Complete Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/contact"
                    className="text-xs font-bold text-[#131b33] hover:text-[#165cfd] transition-colors flex items-center gap-1"
                  >
                    <span>Inquire for Similar Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Additional Site Imagery ───────────────────────────── */}
        <div className="mt-16 mb-4">
          <div className="pill-tag mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>FIELD DOCUMENTATION — CROSS-PROJECT OPERATIONS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Engineering team reviewing structural plans on-site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">SITE REVIEW</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/38070/pexels-photo-38070.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Safety helmets — CRB site safety compliance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">HSE COMPLIANCE</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-52 relative group">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Construction workers erecting concrete structure"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">CONCRETE WORKS</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 relative group">
              <img
                src="https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="HDPE pipeline laying and trenching operations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">PIPELINE LAYING</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-48 relative group">
              <img
                src="https://images.pexels.com/photos/8487375/pexels-photo-8487375.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Water quality testing and field analysis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">WATER QUALITY</span>
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden h-48 relative group">
              <img
                src="https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Stormwater drainage and culvert infrastructure"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold font-mono-telemetry">DRAINAGE WORKS</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-8 sm:p-12 rounded-[2rem] bg-[#101828] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div>
            <h3 className="text-2xl font-bold font-display text-white">
              Need detailed Engineering BOQs or CRB Compliance Dossiers?
            </h3>
            <p className="mt-2 text-sm text-white/70 max-w-xl">
              We provide formal contractor pre-qualification documents, past performance certificates, and equipment schedules for official tenders.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-pill-primary !bg-[#165cfd] !text-white whitespace-nowrap"
          >
            <span>Contact Tender Desk</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Case Study Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </div>
  );
}
