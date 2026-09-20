/* ------------------------------------------------------------------
   All site copy and data in one place (this becomes CMS content).
   Rule: nothing here is a claim Green Channels has not confirmed.
   Items marked `indicative` are illustrative wording to be confirmed.
------------------------------------------------------------------- */

export const site = {
  name: "Green Channels Ltd",
  url: "https://www.greenchannels.com",
  email: "alain@greenchannels.com",
  whatsapp: "+88 01713 031 742",
  phone: "+88 09642 602 444",
  address: ["Road 102, House 4, Apart H3", "Gulshan 2, Dhaka 1212", "Bangladesh"],
};

export const nav = [
  { href: "/workwear-uniforms", label: "Workwear & Uniforms" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/quality", label: "Quality" },
  { href: "/about", label: "About" },
];

export const credentials = [
  { label: "Experience", value: "35+ years", detail: "in Bangladesh" },
  { label: "Service", value: "End to end", detail: "development to shipment" },
  { label: "Network", value: "Partner factories", detail: "selected per programme" },
  { label: "Buyers", value: "Europe & North America", detail: "the markets we build for" },
];

export type GarmentKind =
  | "jacket"
  | "trousers"
  | "bib"
  | "coverall"
  | "vest"
  | "shorts"
  | "polo"
  | "tee"
  | "sweat";

export type Garment = {
  slug: string;
  kind: GarmentKind;
  name: string;
  family: string;
  note: string; // indicative
  summary: string; // indicative
  points: string[]; // indicative
};

export const garments: Garment[] = [
  {
    slug: "work-jackets",
    kind: "jacket",
    name: "Work jackets",
    family: "Outer layers",
    note: "Storm flap · bartacked pocket mouths",
    summary:
      "Outer layers built for daily wear across a multi-year programme, specified down to the closure, the pocket and the cuff.",
    points: [
      "Front closure and storm-flap options",
      "Bartacked pocket mouths and stress points",
      "Elbow, cuff and hem construction",
      "Fabric and lining specified per programme",
    ],
  },
  {
    slug: "work-trousers",
    kind: "trousers",
    name: "Work trousers",
    family: "Legwear",
    note: "Reinforced knee · triple-needle seams",
    summary:
      "The workhorse of a clothing programme: pocket layouts, knee construction and seams engineered for repeat orders.",
    points: [
      "Reinforced knee panels",
      "Triple-needle seams at stress points",
      "Cargo and utility pocket layouts",
      "Gusseted crotch construction",
    ],
  },
  {
    slug: "bib-and-brace",
    kind: "bib",
    name: "Bib & brace",
    family: "Legwear",
    note: "Adjustable braces · bib pocket",
    summary:
      "Full-cover legwear with braces and a bib, developed to sit well on the wearer and hold up to repeated washing.",
    points: [
      "Adjustable braces and fastenings",
      "Bib pocket layouts",
      "Reinforced knee and seat",
      "Size grids agreed at development",
    ],
  },
  {
    slug: "coveralls",
    kind: "coverall",
    name: "Coveralls",
    family: "All-in-one",
    note: "Full-length zip · reinforced gusset",
    summary:
      "One-piece garments where construction matters most: the zip, the gusset, the waist and the cuff all have to work together.",
    points: [
      "Full-length front zip",
      "Reinforced gusset construction",
      "Waist and cuff options",
      "Chest and utility pockets",
    ],
  },
  {
    slug: "work-vests",
    kind: "vest",
    name: "Work vests",
    family: "Outer layers",
    note: "Light outer layer · contrast trims",
    summary:
      "Light outer layers for programmes that need a coordinated look with practical pockets and closures.",
    points: [
      "Pocket and closure layouts",
      "Contrast trims and piping",
      "Lining options",
      "Matched to the wider programme",
    ],
  },
  {
    slug: "shorts",
    kind: "shorts",
    name: "Shorts",
    family: "Legwear",
    note: "Cargo pockets · reinforced hems",
    summary:
      "Warm-weather partners to the trouser range, developed in the same fabrics so the programme stays matched.",
    points: [
      "Cargo pocket layouts",
      "Reinforced hems",
      "Waistband and belt-loop options",
      "Shared fabrics with trousers",
    ],
  },
  {
    slug: "polo-shirts",
    kind: "polo",
    name: "Polo shirts",
    family: "Knitwear",
    note: "Knit · rib collar · embroidery-ready",
    summary:
      "The uniform staple for corporate wear: knit quality, collar shape and branding panels agreed before bulk.",
    points: [
      "Piqué and jersey knit options",
      "Rib collar and placket",
      "Embroidery-ready panels",
      "Shade-matched trims",
    ],
  },
  {
    slug: "t-shirts",
    kind: "tee",
    name: "T-shirts",
    family: "Knitwear",
    note: "Jersey · hem finish · print-ready",
    summary:
      "Everyday knitwear for programmes at scale, with weight, neck finish and print areas specified once and repeated.",
    points: [
      "Jersey weights and blends",
      "Neck rib and tape",
      "Print-ready panels",
      "Consistent hem finishes",
    ],
  },
  {
    slug: "sweatshirts",
    kind: "sweat",
    name: "Sweatshirts",
    family: "Knitwear",
    note: "Fleece · rib trims · logo-ready",
    summary:
      "Mid-layer knitwear developed with rib trims, fleece options and branding areas that hold their shape wash after wash.",
    points: [
      "Fleece and brushed-back options",
      "Rib cuffs and hem",
      "Logo-ready panels",
      "Matched programme colours",
    ],
  },
];

/* The service span, in Alain's own order. */
export const processSteps = [
  {
    n: "01",
    title: "Product development",
    text: "From a concept, a reference garment or a tech pack to a specification a factory can price and build.",
  },
  {
    n: "02",
    title: "Fabric & trim sourcing",
    text: "Fabrics, threads, zips and trims sourced and approved against the specification.",
  },
  {
    n: "03",
    title: "Sampling",
    text: "Prototype, fit and pre-production samples reviewed with you before bulk is committed.",
  },
  {
    n: "04",
    title: "Factory selection",
    text: "The right partner factory chosen for the garment and the programme, from a long-established network.",
  },
  {
    n: "05",
    title: "Merchandising",
    text: "Materials, timelines and approvals coordinated so the programme keeps to its schedule.",
  },
  {
    n: "06",
    title: "Production follow-up",
    text: "Our team follows production on the ground and reports against the plan.",
  },
  {
    n: "07",
    title: "Quality control",
    text: "Inspection at defined stages, from fabric to final random inspection.",
  },
  {
    n: "08",
    title: "Shipment",
    text: "Packing, documents and dispatch coordinated through to delivery.",
  },
];

/* The seven QC stages from RFP §9. */
export const qcStages = [
  {
    n: "01",
    title: "Pre-production review",
    label: "Specification · sample · trims",
    text: "Before a single metre is cut, the specification, approved sample and bill of materials are reviewed together with the factory.",
    checks: ["Specification against approved sample", "Trims and packaging confirmed", "Timeline and responsibilities agreed"],
  },
  {
    n: "02",
    title: "Fabric inspection",
    label: "Fabric · shade · weight",
    text: "Incoming fabric is checked for shade, weight and surface quality against the approved swatch.",
    checks: ["Shade against approved swatch", "Weight and composition", "Surface defects"],
  },
  {
    n: "03",
    title: "Initial production inspection",
    label: "First pieces off the line",
    text: "The first garments off the line are inspected against the sample so problems surface early, not at the end.",
    checks: ["Construction against sample", "Fit and measurement", "Trim placement"],
  },
  {
    n: "04",
    title: "Inline inspection",
    label: "Seams · stitching · trims",
    text: "During production, garments are inspected on the line for stitching, seams and workmanship.",
    checks: ["Seam and stitch quality", "Reinforcement points", "Consistency across the line"],
  },
  {
    n: "05",
    title: "Measurement control",
    label: "Measured against spec",
    text: "Finished garments are measured against the specification sheet across the agreed points of measure.",
    checks: ["Points of measure", "Tolerance against spec", "Size-set comparison"],
  },
  {
    n: "06",
    title: "Final random inspection",
    label: "Random sample from cartons",
    text: "A random sample is drawn from packed cartons and inspected before the goods leave the factory.",
    checks: ["Random carton selection", "Appearance and finishing", "Packing and labelling"],
  },
  {
    n: "07",
    title: "Shipment approval",
    label: "Approved for shipment",
    text: "Inspection results are reviewed and shipment is approved, or held, before dispatch.",
    checks: ["Inspection report reviewed", "Packing list against cartons", "Release for shipment"],
  },
];

/* Certifications Alain confirmed exist within the partner-factory network. */
export const certifications = ["amfori BSCI", "OEKO-TEX", "GOTS", "OCS", "GRS", "Fair Trade", "RCS"];

export type PartnerUnit = {
  id: string;
  type: "Knit" | "Woven";
  title: string;
  specialisation: string[];
  certs: string[];
  status: "Verified" | "Pending verification";
};

/* Illustrative only. */
export const partnerUnits: PartnerUnit[] = [
  {
    id: "04",
    type: "Knit",
    title: "Knit composite",
    specialisation: ["Polo shirts", "T-shirts", "Sweatshirts"],
    certs: ["amfori BSCI", "OEKO-TEX", "GRS"],
    status: "Verified",
  },
  {
    id: "07",
    type: "Woven",
    title: "Woven garments",
    specialisation: ["Work jackets", "Work trousers", "Bib & brace"],
    certs: ["amfori BSCI", "OCS"],
    status: "Pending verification",
  },
  {
    id: "11",
    type: "Woven",
    title: "Woven workwear",
    specialisation: ["Coveralls", "Work vests", "Shorts"],
    certs: ["amfori BSCI", "GOTS"],
    status: "Pending verification",
  },
  {
    id: "15",
    type: "Knit",
    title: "Knit and fleece",
    specialisation: ["Sweatshirts", "Polo shirts"],
    certs: ["OEKO-TEX", "RCS"],
    status: "Verified",
  },
];

export const secondaryCapabilities = [
  {
    id: "fashion",
    title: "Fashion & casualwear",
    text: "Alongside our workwear programmes, Green Channels sources fashion and casualwear for international buyers, using the same development, sourcing and quality process.",
  },
  {
    id: "home-textiles",
    title: "Home textiles",
    text: "To a smaller extent, Green Channels also supports sourcing for home textiles, drawing on the same partner network and controls.",
  },
];

export const rfqCategories = [
  ...garments.map((g) => ({ value: g.slug, label: g.name })),
  { value: "fashion-casualwear", label: "Fashion & casualwear" },
  { value: "home-textiles", label: "Home textiles" },
  { value: "other", label: "Other" },
];
