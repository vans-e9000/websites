import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Tv, 
  Radio, 
  CheckCircle2, 
  ExternalLink,
  Droplets,
  HardHat,
  Gauge
} from 'lucide-react';

export default function VideoShowcase() {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const videoFeeds = [
    {
      id: 'pipeline-network',
      title: 'Water Transmission Pipeline & HDPE Reticulation',
      badge: 'Feed 01 · Water Works',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-through-a-concrete-culvert-41908-large.mp4',
      fallbackImage: '/assets/images/project1_water_pipeline.jpg',
      location: 'Kondoa - Chamwino Water Corridor, Dodoma',
      metric: '68.4 km Total Network',
      spec: 'HDPE PE100 PN16 Butt-Fusion Welding',
      pressure: '16.5 Bar Operating Hydrostatic',
      description: 'Live field footage documenting high-capacity water pipeline excavation, joint alignment, and continuous flow validation through regional rural reticulation corridors.'
    },
    {
      id: 'structural-reservoir',
      title: 'Reinforced Concrete Reservoir Structural Casting',
      badge: 'Feed 02 · Civil Structural',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crane-lifting-materials-on-a-construction-site-41618-large.mp4',
      fallbackImage: '/assets/images/project2_concrete_reservoir.jpg',
      location: 'Kilosa Elevated Water Tower Site, Morogoro',
      metric: '500,000 Liters Capacity',
      spec: 'Class C30/37 Monolithic Water Retaining Concrete',
      pressure: '24.0m Tower Head Elevation',
      description: 'Structural crane operations, tubular staging assembly, and heavy monolithic concrete pouring for an overhead elevated water reservoir to maintain gravity feed.'
    },
    {
      id: 'borehole-flushing',
      title: 'Borehole Drilling & Pressurized Flow Testing',
      badge: 'Feed 03 · Groundwater',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-rapidly-out-of-a-pipe-42618-large.mp4',
      fallbackImage: '/assets/images/project4_borehole_drilling.jpg',
      location: 'Bahi Basin Aquifer Exploration, Central TZ',
      metric: '28,000 L/hr Sustained Yield',
      spec: '190m Deep Basement Rotary Drilling + Solar Array',
      pressure: '72-Hour Continuous Step-Drawdown',
      description: 'Hydraulic discharge flush and yield verification after deep rotary air-hammer drilling, confirming pure potable water flow ready for solar pump coupling.'
    }
  ];

  const current = videoFeeds[activeFeedIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFeedChange = (index) => {
    setActiveFeedIndex(index);
    setIsPlaying(true);
  };

  return (
    <section className="py-20 bg-white border-y border-[#ced0d2]/40 relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="pill-tag mb-3">
              <Tv className="w-3.5 h-3.5" />
              <span>LIVE FIELD DOCUMENTATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#131b33] tracking-tight">
              Engineering in Motion
            </h2>
            <p className="mt-3 text-base text-[#434f59] max-w-xl">
              Authentic on-site footage showing our crews laying heavy HDPE water pipelines, pouring reinforced reservoir structures, and conducting pressurized borehole yield flushes across Tanzania.
            </p>
          </div>

          {/* Feed Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#f5f6f7] p-1.5 rounded-full border border-[#ced0d2]/60">
            {videoFeeds.map((feed, idx) => (
              <button
                key={feed.id}
                onClick={() => handleFeedChange(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  activeFeedIndex === idx
                    ? 'bg-[#165cfd] text-white shadow-sm'
                    : 'text-[#434f59] hover:text-[#131b33] hover:bg-black/5'
                }`}
              >
                <Radio className={`w-3 h-3 ${activeFeedIndex === idx ? 'animate-pulse' : ''}`} />
                <span>Feed {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Player & Specs Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f5f6f7] rounded-[2rem] p-4 sm:p-8 border border-[#ced0d2]/60 shadow-sm">
          {/* Main Video Viewport (7 Cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-black aspect-video group shadow-md">
            <video
              ref={videoRef}
              key={current.videoUrl}
              src={current.videoUrl}
              poster={current.fallbackImage}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Overlay Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-mono-telemetry px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>REC 1080P FIELD CAM</span>
              </span>
              <span className="bg-[#165cfd] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {current.badge}
              </span>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-white/20 text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-xs font-mono-telemetry text-white/80 hidden sm:inline">
                  {current.title}
                </span>
              </div>

              <div className="text-xs font-mono-telemetry text-white/70 pr-3">
                TZ-ENG // LIVE
              </div>
            </div>
          </div>

          {/* Telemetry & Spec Sheet (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono-telemetry uppercase tracking-wider text-[#165cfd] font-bold">
                {current.location}
              </span>
              <h3 className="text-2xl font-bold font-display text-[#131b33] mt-1">
                {current.title}
              </h3>
              <p className="text-sm text-[#434f59] mt-3 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-4 rounded-xl border border-[#ced0d2]/50 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#8a8a8a] mb-1">
                  <Gauge className="w-3.5 h-3.5 text-[#165cfd]" />
                  <span>Key Output Metric</span>
                </div>
                <div className="text-base font-bold text-[#131b33] font-display">
                  {current.metric}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#ced0d2]/50 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#8a8a8a] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#165cfd]" />
                  <span>Operating Pressure / Head</span>
                </div>
                <div className="text-base font-bold text-[#131b33] font-display">
                  {current.pressure}
                </div>
              </div>
            </div>

            {/* Technical Specification Badge */}
            <div className="bg-white p-4 rounded-xl border border-[#ced0d2]/50 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#165cfd] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#131b33] uppercase tracking-wide">
                  Engineering Standard Applied
                </h5>
                <p className="text-xs text-[#434f59] mt-0.5">
                  {current.spec}
                </p>
              </div>
            </div>

            {/* Quick Switch Preview Thumbnails */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider block mb-2.5">
                Switch Operational Angle:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {videoFeeds.map((feed, idx) => (
                  <button
                    key={feed.id}
                    onClick={() => handleFeedChange(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                      activeFeedIndex === idx 
                        ? 'border-[#165cfd] ring-2 ring-[#165cfd]/20 scale-102' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={feed.fallbackImage} 
                      alt={feed.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
