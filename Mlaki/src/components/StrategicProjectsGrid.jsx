import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Droplet,
  Building
} from 'lucide-react';
import { TOP_5_STRATEGIC_PROJECTS } from '../data/projectsData';
import ProjectModal from './ProjectModal';

export default function StrategicProjectsGrid({ limit = 5, showFilter = true }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['All', 'Water Engineering', 'Structural Civil Works', 'Building Works', 'Groundwater & Renewable Energy', 'Civil Infrastructure'];

  const filteredProjects = selectedCategory === 'All'
    ? TOP_5_STRATEGIC_PROJECTS
    : TOP_5_STRATEGIC_PROJECTS.filter(p => p.category === selectedCategory);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section className="py-20 bg-[#f5f6f7] relative">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="pill-tag mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE CONTRACT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#131b33] tracking-tight">
              Top 5 Strategic Projects
            </h2>
            <p className="mt-3 text-base text-[#434f59] max-w-2xl">
              Engineered to Tanzanian Ministry of Water and CRB standards. Explore our benchmark contracts across pipeline reticulation, reinforced reservoirs, solar boreholes, institutional blocks, and regional drainage.
            </p>
          </div>

          {/* Category Filter Pills */}
          {showFilter && (
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#ced0d2]/60 shadow-sm max-w-full overflow-x-auto">
              {['All', 'Water Engineering', 'Building Works', 'Structural Civil Works'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#165cfd] text-white shadow-sm'
                      : 'text-[#434f59] hover:text-[#131b33] hover:bg-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => {
            // Give card 1 or card 2 a special full or highlighted span when appropriate
            const isFeatured = index === 0;

            return (
              <div
                key={project.id}
                className={`group bg-white rounded-2xl overflow-hidden border border-[#ced0d2]/70 shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Visual Area */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-72 sm:h-96' : 'h-64'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Overlay Tags */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#165cfd] text-white text-xs font-semibold shadow-sm">
                      {project.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono-telemetry border border-white/20">
                      #{project.number}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#165cfd]" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className={`font-bold font-display text-white tracking-tight ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8a8a8a] pb-3 border-b border-[#f5f6f7]">
                      <span>Client: <strong>{project.client}</strong></span>
                      <span className="font-mono-telemetry text-[#165cfd] font-bold">{project.value}</span>
                    </div>

                    <p className="mt-3 text-sm text-[#434f59] line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Key Technical Metric Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technicalSpecs.slice(0, 2).map((spec, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[11px] font-medium bg-[#f5f6f7] text-[#131b33] px-2.5 py-1 rounded-lg border border-[#ced0d2]/40"
                        >
                          {spec.label}: {spec.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-[#f5f6f7] flex items-center justify-between">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="text-sm font-bold text-[#165cfd] hover:text-[#131b33] transition-colors inline-flex items-center gap-1.5 group/btn"
                    >
                      <span>Read Technical Dossier</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <span className="text-xs font-mono-telemetry text-[#8a8a8a]">
                      {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Action */}
        {limit < TOP_5_STRATEGIC_PROJECTS.length && (
          <div className="mt-12 text-center">
            <a
              href="/projects"
              className="btn-pill-primary !px-8"
            >
              <span>Explore All Project Dossiers</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
}
