/** Facts sourced from CRB Tanzania public contractor registry (crb.go.tz). Do not invent numbers. */
export const company = {
  brandName: 'Arusha Painters and Builders',
  legalName: 'ARUSHA PAINTERS BUILDERS & GENERAL SUPPLIES CO. LTD.',
  shortName: 'APB',
  managingDirector: 'Elias Makere',
  category: 'Local',
  town: 'Arusha',
  physicalAddress: 'St. Benjamini Street',
  postalAddress: 'P. O. Box 7083',
  phones: ['0784349226', '0754568424'],
  /** Email not listed on CRB detail pages as of research date. */
  email: null as string | null,
  registrations: [
    {
      type: 'Building',
      class: '6',
      number: 'B6/1341/03/2020',
      sourceUrl: 'https://www.crb.go.tz/contractordetails/home/show/781',
    },
    {
      type: 'Civil',
      class: '7',
      number: 'C7/2279/08/2015',
      sourceUrl: 'https://www.crb.go.tz/contractordetails/home/show/780',
    },
  ],
  crbSearchUrl:
    'https://www.crb.go.tz/contractordetails/home/search?search=arusha+painters',
  whatsappNumber: '255784349226',
  tagline: 'Registered painters, builders, and suppliers for Arusha and beyond.',
} as const

export const services = [
  {
    id: 'painting',
    title: 'Architectural painting',
    summary:
      'Premium interior and exterior finishes that protect and present your property.',
    detail:
      'We prepare surfaces carefully and apply durable coating systems suited to Tanzanian climate — from villa exteriors to commercial interiors.',
  },
  {
    id: 'building',
    title: 'Building construction',
    summary:
      'CRB Building Class 6 delivery for residential estates and multi-unit projects.',
    detail:
      'From foundations through structural work and handover, we coordinate trades with clear schedules and site discipline.',
  },
  {
    id: 'finishing',
    title: 'Interior finishing & gypsum',
    summary:
      'High-end plaster, gypsum layouts, and decorative ceilings for polished living spaces.',
    detail:
      'We focus on clean lines, accurate levels, and finish quality that stands up to inspection and everyday use.',
  },
  {
    id: 'civil',
    title: 'Civil earthworks & foundations',
    summary:
      'CRB Civil Class 7 capability for drainage, earthworks, and foundation works.',
    detail:
      'Site clearing, masonry, drainage, and foundation packages that set your build up for lasting performance.',
  },
  {
    id: 'supplies',
    title: 'Fit-outs & general supplies',
    summary:
      'Commercial fit-outs and reliable sourcing of construction materials.',
    detail:
      'We support corporate and institutional clients with fit-out execution and general supply coordination when you need materials on time.',
  },
] as const

export const projects = [
  {
    id: 'premium-painting',
    title: 'Premium Commercial & Resort Painting Finishes',
    category: 'Painting',
    image: '/images/uganda-painter-wall.jpg',
    imageAlt: 'African painter working on wall with roller',
    summary:
      'Full-scope exterior and interior painting, weatherproofing coatings, and high-end texture applications for modern luxury estates, corporate buildings, and safari lodges.',
    outcome:
      'Weather-ready exteriors and refined interiors with consistent colour and coverage.',
  },
  {
    id: 'luxury-safari-lodge',
    title: 'Luxury Safari Lodge Finishing & Structural Remodeling',
    category: 'Finishing',
    image: '/images/luxury-home-exterior.jpg',
    imageAlt: 'Contemporary luxury home exterior with glass facade',
    summary:
      'Premium structural renovations, architectural timber coatings, and aesthetic wall finishes designed to withstand harsh wildlife sanctuary weather conditions.',
    outcome:
      'Durable finishes that stand up to extreme weather while maintaining aesthetic excellence.',
  },
  {
    id: 'residential-estate',
    title: 'Multi-Unit Residential Estate Structural Erection',
    category: 'Building',
    image: '/images/abuja-construction-site.jpg',
    imageAlt: 'Expansive construction site in Abuja, Nigeria',
    summary:
      'Ground-up structural development of contemporary residential properties, from initial column framing up to masonry shell handovers.',
    outcome:
      'Dependable sequencing from groundworks through shell and finishing stages.',
  },
  {
    id: 'gypsum-partitions',
    title: 'Turnkey Gypsum Partitioning & False Ceiling Layouts',
    category: 'Finishing',
    image: '/images/gypsum-ceiling.jpg',
    imageAlt: 'Worker painting ceiling with roller during interior finishing',
    summary:
      'Sourcing, frame modeling, and installation of complex acoustic drywall partitions, multi-tier gypsum ceilings, and hidden atmospheric lighting trays.',
    outcome:
      'Sharp detailing and spaces ready for furniture, lighting, and daily use.',
  },
  {
    id: 'institutional-facility',
    title: 'Local Institutional & Public Facility Erection',
    category: 'Building',
    image: '/images/brick-wall-workers.jpg',
    imageAlt: 'Construction workers building brick wall outdoors',
    summary:
      'General contracting and building management of regional municipal structures, including educational blocks, office expansions, and health facilities.',
    outcome:
      'Quality construction that meets institutional standards and community needs.',
  },
  {
    id: 'concrete-foundations',
    title: 'Reinforced Concrete Retaining Walls & Civil Foundations',
    category: 'Civil',
    image: '/images/concrete-foundation.jpg',
    imageAlt: 'Worker on reinforced concrete foundation',
    summary:
      'Structural earthworks, deep ground excavation, site stabilization, and the casting of massive concrete retaining structures to protect layouts against heavy rains.',
    outcome:
      'Stable groundworks aligned with Building and Civil registration scope.',
  },
  {
    id: 'drainage-infrastructure',
    title: 'Municipal Drainage Infrastructure & Culvert Alignment',
    category: 'Civil',
    image: '/images/foundation-digging.jpg',
    imageAlt: 'Construction workers digging foundation ditches',
    summary:
      'Sourcing and placement of stone masonry drainage basins, open ditch lines, and stormwater handling channels alongside regional road networks.',
    outcome:
      'Effective drainage systems that prevent flooding and protect infrastructure.',
  },
  {
    id: 'earthworks-grading',
    title: 'Urban Land Site Clearance & Earthworks Grading',
    category: 'Civil',
    image: '/images/excavator-site.jpg',
    imageAlt: 'Excavator working at construction site',
    summary:
      'Mechanical clearing, rough leveling, topsoil displacement, and dense compacting routines using heavy plant machinery to prepare raw land plots.',
    outcome:
      'Properly prepared sites ready for construction development.',
  },
  {
    id: 'glass-aluminum-fitout',
    title: 'High-Capacity Architectural Glass & Aluminum Fit-Outs',
    category: 'Supplies',
    image: '/images/modern-office-interior.jpg',
    imageAlt: 'Spacious modern office interior with contemporary furniture',
    summary:
      'Precise interior and exterior structural detailing, including modern commercial glass windows, acoustic curtain walls, and high-durability sliding frameworks.',
    outcome:
      'Modern installations that enhance building aesthetics and functionality.',
  },
  {
    id: 'bulk-material-sourcing',
    title: 'Bulk Industrial Paint & Project Material Sourcing',
    category: 'Supplies',
    image: '/images/construction-materials-storage.jpg',
    imageAlt: 'Outdoor industrial storage yard with construction supplies',
    summary:
      'Strategic business supply logistics involving the large-scale distribution of high-grade commercial paints, structural cements, timber, and masonry essentials.',
    outcome:
      'Reliable material supply that keeps projects on schedule and within budget.',
  },
] as const

export const testimonials = [
  {
    quote:
      'They treated our villa exterior like a precision job — prep, coats, and clean handover.',
    name: 'Homeowner, Arusha',
  },
  {
    quote:
      'Clear communication on the estate build and a crew that showed up ready to work.',
    name: 'Project client, Northern Zone',
  },
  {
    quote:
      'Gypsum and finishing matched the drawings. We did not have to chase rework.',
    name: 'Interior renovation client',
  },
] as const
