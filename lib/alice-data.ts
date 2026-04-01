export const pipelineMetrics = [
  { label: "Products approved", value: "18", note: "Ready for drafting and comparison templates" },
  { label: "Drafts in review", value: "12", note: "Waiting on factual or SEO approval" },
  { label: "Priority city clusters", value: "27", note: "Tracked across top launch markets" },
  { label: "GBP sync targets", value: "54", note: "Top dealers mapped for next phase" },
];

export const aliceNav = [
  { href: "/", label: "Overview", caption: "Today and what needs action", icon: "home" },
  { href: "/ingestion", label: "Sources", caption: "Source files and extraction runs", icon: "documents" },
  { href: "/pkb", label: "Products", caption: "Approved product information", icon: "products" },
  { href: "/queue", label: "Review Queue", caption: "Draft review and publishing status", icon: "queue" },
  { href: "/keywords", label: "Actions", caption: "City and keyword priorities", icon: "opportunities" },
];

export const aliceBrands = [
  { name: "Astral Pipes", tone: "Technical and builder-first", priorityCities: ["Ahmedabad", "Surat", "Pune"] },
  { name: "Bondtite", tone: "Trade-focused and bold", priorityCities: ["Delhi", "Mumbai", "Hyderabad"] },
  { name: "Bathware", tone: "Premium and design-led", priorityCities: ["Mumbai", "Pune", "Bengaluru"] },
];

export const ingestionRuns = [
  {
    id: "ing-001",
    fileName: "FlowGuard_CPVC_Product_Brochure.pdf",
    brand: "Astral Pipes",
    status: "Approved",
    productsFound: 6,
    confidence: "94%",
    reviewer: "Aniket",
    uploadedAt: "25 Mar",
  },
  {
    id: "ing-002",
    fileName: "CPVC_Fittings_Spec_Sheet.pdf",
    brand: "Astral Pipes",
    status: "Needs review",
    productsFound: 4,
    confidence: "81%",
    reviewer: "Pending",
    uploadedAt: "25 Mar",
  },
  {
    id: "ing-003",
    fileName: "Industrial_Piping_Catalogue.docx",
    brand: "Astral Pipes",
    status: "Parsing",
    productsFound: 9,
    confidence: "89%",
    reviewer: "System",
    uploadedAt: "24 Mar",
  },
];

export const productRecords = [
  {
    id: "prd-001",
    name: "FlowGuard CPVC Pipe System",
    brand: "Astral Pipes",
    category: "Plumbing",
    audience: "Plumbers",
    usp: "Corrosion-free and long-life performance",
    spec: "15mm-100mm · up to 400 PSI",
    status: "Approved",
  },
  {
    id: "prd-002",
    name: "Astral CPVC Pro Fittings",
    brand: "Astral Pipes",
    category: "Fittings",
    audience: "Contractors",
    usp: "Fast installation and durable joints",
    spec: "Residential and commercial compatible",
    status: "Approved",
  },
  {
    id: "prd-003",
    name: "Industrial Flow Piping Range",
    brand: "Astral Pipes",
    category: "Industrial",
    audience: "Engineers",
    usp: "Specification-grade heavy-duty use cases",
    spec: "Chemical resistance and wide application",
    status: "Pending review",
  },
  {
    id: "prd-004",
    name: "Hot Water CPVC Line",
    brand: "Astral Pipes",
    category: "Hot and cold water",
    audience: "Builders",
    usp: "Stable temperature handling with low maintenance",
    spec: "Certified for domestic and project use",
    status: "Approved",
  },
];

export const generationQueue = [
  {
    id: "blog-001",
    title: "Best CPVC Pipes in Surat for Reliable Hot Water Plumbing",
    city: "Surat",
    keyword: "cpvc pipes in surat",
    mode: "Quick",
    score: 86,
    status: "Ready for review",
  },
  {
    id: "blog-002",
    title: "Why Builders in Ahmedabad Choose FlowGuard CPVC Pipe Systems",
    city: "Ahmedabad",
    keyword: "cpvc pipe systems ahmedabad",
    mode: "Godlike",
    score: 79,
    status: "Needs fact check",
  },
  {
    id: "blog-003",
    title: "CPVC vs uPVC Pipes in Pune: Which One Fits Your Project?",
    city: "Pune",
    keyword: "cpvc vs upvc pipes pune",
    mode: "Comparison",
    score: 83,
    status: "Ready for SEO pass",
  },
  {
    id: "blog-004",
    title: "Top Plumbing Pipe Options for Residential Projects in Mumbai",
    city: "Mumbai",
    keyword: "plumbing pipes mumbai",
    mode: "Cluster",
    score: 74,
    status: "Regenerate intro",
  },
];

export const keywordGroups = [
  { keyword: "cpvc pipes", city: "Surat", intent: "Commercial", rank: "#9", trend: "+4", gap: "Need comparison blog" },
  { keyword: "cpvc pipe systems", city: "Ahmedabad", intent: "Local", rank: "#6", trend: "+2", gap: "Improve FAQs" },
  { keyword: "hot water pipes", city: "Pune", intent: "Informational", rank: "#14", trend: "-1", gap: "Missing city landing page" },
  { keyword: "plumbing pipes", city: "Mumbai", intent: "Transactional", rank: "#11", trend: "+3", gap: "Add dealer CTA" },
  { keyword: "industrial piping", city: "Rajkot", intent: "Commercial", rank: "#19", trend: "0", gap: "No published draft yet" },
];

export const reviewAlerts = [
  {
    title: "Spec mismatch detected",
    detail: "One Ahmedabad draft mentions a pressure claim not present in the approved PKB record.",
  },
  {
    title: "Thin local context",
    detail: "Two Mumbai drafts need stronger city-specific use cases before publish.",
  },
  {
    title: "Schema missing",
    detail: "The Pune comparison draft needs FAQ and Article schema before it qualifies for auto-publish.",
  },
];

export const generationModes = [
  { name: "Quick", useCase: "Fast city and keyword blogs for daily output", credits: "1 credit" },
  { name: "Godlike", useCase: "SERP-guided drafts for harder competitive terms", credits: "3 credits" },
  { name: "Comparison", useCase: "Astral versus competitor pages with factual guardrails", credits: "2 credits" },
  { name: "Cluster", useCase: "Pillar plus support pages for topical authority", credits: "15 credits" },
];

export const extractionChecks = [
  "Validate brand, category, and product family mapping before approval.",
  "Confirm every technical specification appears in the brochure source.",
  "Flag unsupported pricing or performance claims before PKB publish.",
  "Add target audience and application tags for downstream prompt quality.",
];

export const pkbFields = [
  "Brand tone and CTA guidance",
  "Product category and applications",
  "Technical specs and size ranges",
  "Certifications and trust signals",
  "Competitor comparison references",
];

export const reviewChecklist = [
  "Keyword intent matches the draft angle.",
  "City references feel local, not templated.",
  "Every product claim is grounded in the PKB record.",
  "Meta title, description, FAQ, and schema are complete.",
];

export const keywordPriorities = [
  { city: "Surat", focus: "CPVC pipes", nextMove: "Publish comparison page", urgency: "High" },
  { city: "Ahmedabad", focus: "CPVC pipe systems", nextMove: "Strengthen FAQ cluster", urgency: "High" },
  { city: "Mumbai", focus: "Plumbing pipes", nextMove: "Add dealer CTA and local schema", urgency: "Medium" },
  { city: "Rajkot", focus: "Industrial piping", nextMove: "Generate first draft", urgency: "Medium" },
];

export function getUrgencyTone(urgency: string) {
  if (urgency.toLowerCase() === "high") {
    return "high";
  }

  if (urgency.toLowerCase() === "medium") {
    return "medium";
  }

  return "low";
}
