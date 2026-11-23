// Data for Mlaki Building & Water Engineering Ltd
// Specializing in CRB Tanzania certified Civil, Water and Building works

export const COMPANY_INFO = {
  name: "Mlaki Building & Water Engineering Ltd",
  shortName: "Mlaki Engineering",
  crbNumber: "CRB/C4/0892/2018",
  tin: "134-889-204",
  vrn: "40-028891-Z",
  categories: [
    { title: "Civil Works Contractor", classLevel: "Class 4" },
    { title: "Building Works Contractor", classLevel: "Class 6 / 7 Compliant" },
    { title: "Water Infrastructure Specialist", classLevel: "Specialist" }
  ],
  phone: "+255 765 824 119",
  phoneSecondary: "+255 22 277 5401",
  email: "info@mlakiengineering.co.tz",
  tendersEmail: "tenders@mlakiengineering.co.tz",
  address: {
    headquarters: "Plot 42, Kijitonyama Commercial Strip, Bagamoyo Road, Dar es Salaam, Tanzania",
    dodomaHub: "Area D, Near RUWASA Regional Secretariat, Dodoma, Tanzania",
    mbeyaBase: "Mwanjelwa Industrial Area, P.O. Box 2126, Mbeya, Tanzania"
  },
  established: "2014",
  stats: [
    { label: "Water Pipeline Laid", value: "185+ km", description: "HDPE PE100 & uPVC bulk reticulation" },
    { label: "Concrete Reservoirs", value: "42+ Units", description: "Elevated towers & ground storage tanks" },
    { label: "Boreholes Energized", value: "95+ Sites", description: "Solar-hybrid & deep aquifer systems" },
    { label: "Institutional Buildings", value: "68+ Blocks", description: "Classrooms, dispensaries & offices" },
    { label: "CRB Compliance", value: "100%", description: "Audited & active registered contractor" }
  ]
};

export const TOP_5_STRATEGIC_PROJECTS = [
  {
    id: "water-pipeline-networks",
    number: "01",
    title: "Rural Community Water Supply & Pipeline Networks",
    category: "Water Engineering",
    tag: "💧 RUWASA Initiative",
    location: "Kondoa & Chamwino Districts, Dodoma Region",
    client: "Rural Water Supply and Sanitation Agency (RUWASA)",
    duration: "14 Months",
    value: "TZS 3.85 Billion",
    image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary: "Sourcing, mechanical trenching, and butt-fusion laying of over 68 kilometers of high-density polyethylene (HDPE PE100 PN16) and uPVC water distribution pipeline networks.",
    description: "Full-scale regional rural water scheme developed under the National Water Investment Program. The project involved surveying tough rocky terrain, trench excavation to 1.2m depth, electrofusion and butt-welding of DN 110mm to DN 315mm HDPE pipelines, constructing 24 public water kiosks (DPs), breakout tanks, and integrating automated solar pumping stations to provide reliable potable water to over 48,000 community members.",
    technicalSpecs: [
      { label: "Pipeline Length", value: "68.4 km total network" },
      { label: "Pipe Standards", value: "HDPE PE100 PN10/PN16 & uPVC Class 10" },
      { label: "Distribution Points", value: "24 Community Water Kiosks" },
      { label: "Excavation Type", value: "Mechanical & controlled rock trenching" },
      { label: "Pressure Testing", value: "Hydrostatic test up to 24 bar (BS EN 805)" }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-through-a-concrete-culvert-41908-large.mp4",
    impact: "Eliminated daily 6-kilometer water walks for 12 rural villages, reducing waterborne illness incidents by 82%."
  },
  {
    id: "concrete-water-reservoir",
    number: "02",
    title: "Reinforced Concrete Water Reservoir Construction",
    category: "Structural Civil Works",
    tag: "🏗️ Elevated Tower",
    location: "Kilosa Urban Periphery, Morogoro Region",
    client: "Morogoro Urban Water Supply & Sanitation Authority (MORUWASA)",
    duration: "11 Months",
    value: "TZS 2.40 Billion",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary: "High-precision structural engineering, tubular scaffolding framework, and monolithic concrete casting of a 500m³ elevated reinforced concrete water tower.",
    description: "Constructed at an elevation of 24 meters above ground level to ensure sustained gravity pressure across a multi-ward distribution grid. Scope encompassed deep reinforced pile foundations, cast-in-place circular columns and ring-beam scaffolding, continuous pour water-retaining concrete (Class C30/37 with waterproofing crystalline admixtures), internal food-grade epoxy sealing, valve chamber installation, and lightning arrestor systems.",
    technicalSpecs: [
      { label: "Tank Capacity", value: "500,000 Liters (500 m³)" },
      { label: "Tower Height", value: "24.0 Meters to tank soffit" },
      { label: "Concrete Grade", value: "Class 30/37 Waterproof Monolithic" },
      { label: "Steel Reinforcement", value: "High-yield deformed bars BS 4449 (48 tons)" },
      { label: "Testing Standard", value: "BS 8007 Liquid Retaining Structures test" }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-crane-lifting-materials-on-a-construction-site-41618-large.mp4",
    impact: "Stabilized potable water pressure for 35,000 urban and peri-urban residents with 24/7 continuous gravity feed."
  },
  {
    id: "institutional-building-erection",
    number: "03",
    title: "Public & Commercial Institutional Building Erection",
    category: "Building Works",
    tag: "🪵 Class 7 Building",
    location: "Mtwara Rural & Lindi Municipalities",
    client: "President's Office - Regional Administration and Local Government (PO-RALG)",
    duration: "9 Months",
    value: "TZS 1.75 Billion",
    image: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary: "Full-scope structural development of institutional facilities—such as school blocks, dispensary health centers, and administrative offices—compliant with Class 7 Building standards.",
    description: "Fast-track erection of a modern institutional healthcare dispensary and twin primary educational classroom blocks. Works included reinforced strip footing foundations, hollow-block masonry walls, smooth sand-cement plastering, timber truss fabrication, heavy-gauge colored corrugated iron sheet roofing (0.4mm G28 AZ150), sanitary plumbing, electrical installation, rainwater harvesting systems, and perimeter security fencing.",
    technicalSpecs: [
      { label: "Built-up Area", value: "1,450 sq. meters across 4 buildings" },
      { label: "Roofing System", value: "Pre-painted AZ150 Iron sheets on treated cypress" },
      { label: "Finishes", value: "Anti-fungal acrylic exterior & terrazzo interior" },
      { label: "Plumbing & San", value: "Gravity-fed wash facilities with septic biodigester" },
      { label: "Compliance", value: "Compliant with Class 7 Building works & TBS" }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-workers-on-a-construction-site-41617-large.mp4",
    impact: "Delivered state-of-the-art primary maternal care and classroom facilities serving over 1,200 students and 8,000 patients."
  },
  {
    id: "borehole-drilling-solar",
    number: "04",
    title: "Borehole Drilling, Pump Testing & Solar Integration",
    category: "Groundwater & Renewable Energy",
    tag: "🚰 Solar Pumping",
    location: "Kongwa & Bahi Districts, Central Tanzania",
    client: "Ministry of Water & Community Water Supply Organizations (CBWSO)",
    duration: "6 Months",
    value: "TZS 1.25 Billion",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary: "Deep groundwater exploration, professional rotary mud/air borehole drilling to 180m, step-drawdown yield testing, and 12kW hybrid solar pumping systems.",
    description: "Targeting deep fractured basement aquifers in semi-arid central Tanzania. Executed hydrogeological resistivity soundings, drilled 10-inch diameter boreholes lined with 8-inch slot uPVC casing and gravel pack, conducted 72-hour continuous pump yield tests, and installed solar-powered stainless steel submersible pumps driven by high-efficiency mono-crystalline solar arrays with remote GSM telemetry tracking.",
    technicalSpecs: [
      { label: "Drilling Depth", value: "160m - 195m into basement rock" },
      { label: "Average Yield", value: "28,000 Liters / Hour (sustained)" },
      { label: "Solar Array", value: "12.8 kWp Tier-1 Monocrystalline panels" },
      { label: "Pump Unit", value: "Grundfos 4-inch Submersible Solar Motor" },
      { label: "Telemetry", value: "GSM remote flow, yield & pressure telemetry" }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-rapidly-out-of-a-pipe-42618-large.mp4",
    impact: "Supplies 100% free solar-pumped clean drinking water year-round to 3 arid agro-pastoralist communities."
  },
  {
    id: "masonry-drainage-culverts",
    number: "05",
    title: "Masonry Stormwater Drain & Culvert Construction",
    category: "Civil Infrastructure",
    tag: "🛣️ Flood Mitigation",
    location: "Makambako - Njombe Regional Corridor",
    client: "Tanzania Rural and Urban Roads Agency (TARURA)",
    duration: "8 Months",
    value: "TZS 1.60 Billion",
    image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary: "Structural civil works involving stone-pitching channels, masonry retaining walls, and reinforced concrete box culverts safeguarding local road networks from water logging.",
    description: "Engineered stormwater drainage along vulnerable escarpment roads prone to tropical monsoon erosion. Construction included 9.2 kilometers of trapezoidal stone-pitched lined drains with cement mortar (1:3 mix), reinforced concrete apron slab transitions, 6 double-cell reinforced concrete box culverts (2.5m x 2.0m), and energy dissipater drop-structures to prevent downstream agricultural land degradation.",
    technicalSpecs: [
      { label: "Channel Length", value: "9,200 meters lined drainage" },
      { label: "Stone Pitching", value: "Hand-dressed hard igneous stone, 200mm depth" },
      { label: "Culvert Units", value: "6 Precast & Cast-in-place Box Culverts" },
      { label: "Concrete Grade", value: "Class 25/20 reinforced wing-walls" },
      { label: "Erosion Protection", value: "Gabion mattresses & stone rip-rap aprons" }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-through-a-concrete-culvert-41908-large.mp4",
    impact: "Protected 45 km of vital regional agricultural road corridors from seasonal flood cut-offs, benefiting 70,000 commuters."
  }
];

export const SERVICES_LIST = [
  {
    id: "water-supply",
    title: "Rural & Peri-Urban Water Reticulation Networks",
    icon: "Droplets",
    shortDesc: "Sourcing, trenching, butt-welding and hydrostatic commissioning of HDPE and uPVC networks for RUWASA and municipal water utilities.",
    details: [
      "Trenching in rock, gravel, and sandy loam soil profiles",
      "Butt-fusion and electrofusion welding of HDPE PE100 pipes up to DN 500mm",
      "Installation of air valves, washout chambers, and section isolating gate valves",
      "Construction of community distribution points (Water Kiosks) and metered taps",
      "Full hydrostatic pressure testing up to 25 bar complying with BS EN 805"
    ]
  },
  {
    id: "concrete-reservoirs",
    title: "Reinforced Concrete Reservoirs & Towers",
    icon: "Building2",
    shortDesc: "Structural formwork, rebar tying, and monolithic water-retaining concrete casting for overhead towers and ground-level storage tanks.",
    details: [
      "Overhead elevated concrete water tanks (capacities 50m³ to 1,000m³)",
      "Ground-level reinforced concrete reservoirs (up to 3,000m³ capacity)",
      "Strict compliance with BS 8007 design for water retaining structures",
      "Crack-width control, crystalline waterproofing admixtures, and food-safe epoxy liners",
      "Integrated ultrasonic level sensors and digital telemetry integration"
    ]
  },
  {
    id: "borehole-solar",
    title: "Borehole Drilling & Hybrid Solar Pumping",
    icon: "SunMedium",
    shortDesc: "Groundwater geophysical resistivity surveys, heavy rotary drilling, yield step-testing, and solar photovoltaic pumping schemes.",
    details: [
      "Comprehensive VES (Vertical Electrical Sounding) geophysical hydrogeology",
      "Rotary DTH hammer and mud-rotary drilling down to 250 meters depth",
      "Continuous 24-72 hour pumping tests to determine safe sustainable yields",
      "Design and installation of solar PV arrays with MPPT variable frequency drives",
      "Complete water chemical, physical, and bacteriological laboratory testing"
    ]
  },
  {
    id: "institutional-building",
    title: "Public & Institutional Building Works",
    icon: "Warehouse",
    shortDesc: "Full-scope civil building erection of schools, health centers, maternity wards, and local government administration offices.",
    details: [
      "Compliance with Class 7 Building Works thresholds and national building codes",
      "Reinforced concrete frames, substructure strip foundations, and floor slabs",
      "Precision hollow-block and burnt clay brick masonry construction",
      "Structural timber and light-gauge steel roof truss engineering",
      "Internal and external electrical, sanitary, sewage, and rainwater harvesting networks"
    ]
  },
  {
    id: "stormwater-drainage",
    title: "Masonry Drainage, Culverts & Civil Works",
    icon: "ShieldAlert",
    shortDesc: "Erosion mitigation, stone-pitched roadside channels, reinforced box culverts, and retaining wall infrastructure.",
    details: [
      "Stone pitching with dressed granite and cement mortar bedding",
      "Precast and cast-in-place reinforced concrete box and pipe culverts",
      "Gabion wire baskets and Reno mattresses for riverbank stabilization",
      "Bridge approach aprons, headwalls, and energy dissipater check dams",
      "Road formation grading, sub-base preparation, and surface stormwater diversions"
    ]
  },
  {
    id: "facility-maintenance",
    title: "Infrastructure Overhaul & Preventative Maintenance",
    icon: "Wrench",
    shortDesc: "Rapid-response pipeline leak repairs, tank re-lining, solar pump servicing, and long-term facility management contracts.",
    details: [
      "Ultrasonic pipeline acoustic leak detection and emergency mechanical joint repair",
      "Borehole camera inspections, acid cleaning, and airlift flushing",
      "Water tank desilting, pressure washing, and structural crack injection repair",
      "Solar inverter firmware diagnostics, panel replacement, and surge protection upgrades",
      "Annual scheduled maintenance programs for CBWSOs and district councils"
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "Mlaki Engineering demonstrated exceptional technical competence on our 68km rural water reticulation contract. Their butt-fusion joints and pipeline pressure testing cleared every RUWASA quality threshold without a single re-test required.",
    author: "Eng. J. M. Mwambene",
    title: "Regional Project Coordinator",
    organization: "RUWASA - Rural Water Supply and Sanitation Agency",
    location: "Dodoma, Tanzania",
    rating: 5
  },
  {
    quote: "Constructing a 500m³ elevated concrete reservoir requires absolute structural discipline. Mlaki's formwork, rebar layout, and concrete cube test results were consistently above specified design strength. A dependable local contractor.",
    author: "Eng. Sophia Lyimo",
    title: "Director of Technical Services",
    organization: "Urban Water & Sanitation Authority",
    location: "Morogoro, Tanzania",
    rating: 5
  },
  {
    quote: "Their building construction team finished our 4-block dispensary and maternity center two weeks ahead of schedule. The masonry, clean plastering, and solar water connection have completely transformed healthcare access for our community.",
    author: "Dr. Hamisi K. Bakari",
    title: "District Medical Officer",
    organization: "Council Health Management Team (CHMT)",
    location: "Mtwara, Tanzania",
    rating: 5
  }
];

export const FAQ_ITEMS = [
  {
    q: "Is Mlaki Building & Water Engineering an active, registered contractor with CRB Tanzania?",
    a: "Yes. Mlaki is formally registered with the Contractors Registration Board (CRB) of Tanzania under Registration Number CRB/C4/0892/2018. We hold active Class 4 Civil Works and Class 6/7 Building Works licenses, fully certified to participate in national government and public authority tenders (RUWASA, TARURA, TANROADS, PO-RALG, and private developments)."
  },
  {
    q: "What regions in Tanzania does Mlaki Engineering operate in?",
    a: "While our corporate headquarters is situated in Dar es Salaam, we maintain active field bases and regional operational hubs in Dodoma, Mbeya, Morogoro, and Mtwara. Our mobile drilling rigs, earthmoving fleet, and pipeline crews operate nationwide throughout mainland Tanzania."
  },
  {
    q: "How do you guarantee water pressure and structural integrity for water reservoirs?",
    a: "All reinforced concrete structures follow BS 8007 design standards for water-retaining structures. We perform mandatory concrete slump tests on-site and 7-day and 28-day crushing strength tests via certified government laboratories. In addition, every completed reservoir undergoes full 7-day hydrostatic water-tightness testing prior to official commissioning."
  },
  {
    q: "Can Mlaki handle turnkey borehole drilling with solar water pumping installation?",
    a: "Yes, we provide end-to-end solutions. This begins with geophysical survey soundings to identify aquifer depth, drilling down to 250m, borehole reaming and casing, 72-hour step-drawdown pumping tests, solar PV array mounting, pump installation (Grundfos/Lorentz), piping to storage, and water chemical purity testing."
  },
  {
    q: "How do we request a quotation or invite Mlaki to submit a tender bid?",
    a: "You can submit an inquiry directly through our website Contact page, email us at tenders@mlakiengineering.co.tz, or call our tender operations desk at +255 765 824 119. We provide comprehensive BOQ (Bill of Quantities) analyses, technical methodology statements, and compliance documentation within 48 to 72 hours."
  }
];
