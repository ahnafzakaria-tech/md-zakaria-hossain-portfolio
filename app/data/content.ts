// ─── Single source of truth for all site content ────────────────────────────
// Edit this file to update any text, links, or data across the site.

export const person = {
  name:         "Md Zakaria Hossain",
  nameShort:    "Zakaria Hossain",
  initials:     "ZH",
  title:        "Project Document Controller",
  subtitle:     "EPC & EDMS Specialist",
  headline:
    "Specialist in EPC project documentation, EDMS/PMIS administration, and construction document compliance — with a compliance-focused legal foundation.",
  location:     "Riyadh, Saudi Arabia",
  openTo:       "Open to relocation",
  email:        "ahnafzakariaz@gmail.com",
  phone:        "+966 5300 26787",          // Primary (KSA) — displayed in contact section
  linkedin:     "https://www.linkedin.com/in/md-zakaria-hossain-85229a23b",
  profilePhoto: "/profile.jpg",             // Place at: public/profile.jpg
  // CV path — update filename here to change it site-wide
  cvPath:       "/assets/Md-Zakaria-Hossain-CV.pdf",
} as const;

// Contact form — set formEndpoint to your Formspree ID (https://formspree.io)
// e.g. "https://formspree.io/f/YOUR_FORM_ID"
// Leave as empty string to fall back to mailto
export const formEndpoint = "" as string;

export const summary =
  "Document Controller with almost 4 years of experience managing engineering and construction documentation on large-scale power generation and renewable energy EPC projects across Saudi Arabia and Bangladesh. Strong expertise in project-specific document coding, numbering, classification, metadata validation, and EDMS/PMIS administration. Background in Law (LL.B, LL.M) brings a disciplined, compliance-focused approach to contractual documentation and regulatory record-keeping.";

export const stats = [
  { value: "~4",    label: "Years Experience",      suffix: "yrs" },
  { value: "2",     label: "Major EPC Projects",    suffix: ""    },
  { value: "2.7",   label: "GW Project Capacity",   suffix: "GW"  },
  { value: "2",     label: "Countries",             suffix: ""    },
] as const;

export const competencies = [
  "Document Control & Management",
  "Document Coding & Numbering",
  "EDMS / PMIS Administration",
  "Drawing & Revision Control",
  "MOM & MSRA Coordination",
  "Transmittal & Correspondence Management",
  "MAR & FCR Tracking",
  "Contract & Regulatory Compliance",
  "Project Close-out & Handover",
  "Subcontractor Coordination",
  "AI-Assisted Document Workflows",
  "Stakeholder Communication",
  "Reporting & Data Analysis",
] as const;

export const systems = [
  { name: "Thinkproject",         level: "Live — current role"  },
  { name: "Aconex",               level: "Professional training" },
  { name: "Samsung Knox (S-PMIS)",level: "Live — previous role"  },
  { name: "MS Office Suite",      level: "Advanced"              },
  { name: "AI Productivity Tools",level: "Active use"            },
] as const;

export const experience = [
  {
    id:       "ceec",
    company:  "CEEC — China Energy Engineering Corporation",
    role:     "Project Document Controller",
    period:   "Nov 2025 — Present",
    location: "Riyadh, Saudi Arabia",
    project:  "Starah Independent Power Plant — 2GW Onshore Wind Project",
    capacity: "2,000 MW",
    type:     "Onshore Wind | EPC",
    edms:     "Thinkproject",
    current:  true,
    bullets: [
      "Manage project document numbering and coding — assigning and validating document numbers per project-specific coding structure, discipline/system classification, and sequential numbering requirements.",
      "Control engineering drawings and revisions — monitoring drawing status, revision history, approvals, and distribution of latest approved versions to relevant project teams.",
      "Prepare and circulate Minutes of Meeting (MOM) for weekly, kick-off, and project meetings — maintaining traceable records of actions, decisions, and responsibilities.",
      "Review Method Statements (MOS) and Risk Assessments (RA) and coordinate approval routing between Engineering, EPC HSSE, and the Owner.",
      "Manage Field Change Requests (FCRs), Site Instructions, and Engineering Contact Sheets within the project EDMS.",
      "Maintain Owner-facing tracking for Material Approval Requests (MARs) and Concrete Pouring Plans from initial submission through approval.",
      "Monitor overdue submissions, pending comments, and outstanding actions to support timely document review and approval cycles.",
      "Train and support EPC engineers and new Construction Department personnel on EDMS workflows and documentation requirements.",
    ],
    photos: [
      "/images/ceec/desk.jpg",
      "/images/ceec/desert.jpg",
      "/images/ceec/camp.jpg",
      "/images/ceec/sunset.jpg",
      "/images/ceec/team.jpg",
    ],
  },
  {
    id:       "samsung",
    company:  "Samsung C&T Corporation",
    role:     "Project Document Controller",
    period:   "Nov 2022 — Oct 2025",
    location: "Meghnaghat, Bangladesh",
    project:  "Meghnaghat 718MW Combined Cycle Power Plant",
    capacity: "718 MW",
    type:     "CCPP | EPC",
    edms:     "Samsung Knox Portal (S-PMIS)",
    current:  false,
    milestone: "Project reached Commercial Operation Date (COD)",
    clients:  ["JERA", "GE Vernova"],
    bullets: [
      "Managed end-to-end document control for a 718MW Combined Cycle Power Plant EPC project — maintaining accurate and traceable project records throughout the full project lifecycle.",
      "Registered, classified, reviewed, and distributed engineering, construction, vendor, and project documentation — ensuring correct document status, revision, and accessibility.",
      "Administered project documentation through Samsung Knox Portal (S-PMIS) — managing submissions, workflows, review status, revisions, and controlled records.",
      "Prepared and issued transmittals and document submissions to EPC teams, vendors, subcontractors, and stakeholders — tracking responses, comments, approvals, and resubmissions.",
      "Maintained document registers, correspondence logs, engineering records, and submission trackers — preparing daily, weekly, and monthly reports for project management.",
      "Supported project close-out and handover by compiling, checking, and tracking as-built drawings, final technical documents, and handover records.",
      "Provided document control training and guidance to project personnel on S-PMIS workflows, submission procedures, and documentation requirements.",
    ],
    photos: [
      "/images/samsung/aerial-1.jpg",
      "/images/samsung/aerial-2.jpg",
      "/images/samsung/aerial-3.jpg",
      "/images/samsung/aerial-4.jpg",
      "/images/samsung/cod.jpg",
    ],
  },
  {
    id:       "law",
    company:  "District and Sessions Judge Court, Dhaka",
    role:     "Apprentice Lawyer",
    period:   "Jan 2022 — Oct 2022",
    location: "Dhaka, Bangladesh",
    project:  null,
    current:  false,
    bullets: [
      "Drafted and reviewed legal documents, supporting case strategy through legal research, analysis, and risk assessment.",
      "Conducted legal research on applicable laws and regulatory requirements while maintaining organized case files and documentation.",
    ],
    photos: [],
  },
] as const;

export const education = [
  {
    degree:      "Master of Laws (LL.M)",
    institution: "Bangladesh University of Business and Technology (BUBT)",
    period:      "Dec 2021 — Dec 2022",
    cgpa:        "3.79 / 4.00",
  },
  {
    degree:      "Bachelor of Laws (LL.B)",
    institution: "Bangladesh University of Business and Technology (BUBT)",
    period:      "Oct 2017 — Nov 2021",
    cgpa:        "3.70 / 4.00",
  },
] as const;

export const training = [
  {
    title:    "Aconex — Document Control & EDMS Workflow",
    issuer:   "Oracle Aconex",
    note:     "Professional Training Completed",
    date:     null,  // Date not available — update when known
  },
] as const;

export const certifications = [
  {
    title:  "AI Foundations",
    issuer: "OpenAI Academy",
    type:   "Course Completion Certificate",
    date:   "August 2026",
  },
  {
    title:  "Applied AI Foundations",
    issuer: "OpenAI Academy",
    type:   "Course Completion Certificate",
    date:   "August 2026",
  },
  {
    title:  "Agents and Workflows",
    issuer: "OpenAI Academy",
    type:   "Course Completion Certificate",
    date:   "August 2026",
  },
] as const;

export const languages = [
  { name: "Bengali", level: "Native"        },
  { name: "English", level: "Fluent"        },
  { name: "Hindi",   level: "Conversational"},
] as const;

export const testimonial = {
  quote:
    "Mr. Zakaria is a passionate and sincere professional who approaches his work with dedication and a positive attitude. I am confident that he will continue to succeed in any professional environment. I wish him continued growth, success, good health, and safety.",
  name:    "Taesang Park",
  role:    "E&I Manager",
  company: "Meghnaghat 718MW Combined Cycle Power Plant Project, Samsung C&T",
} as const;

export const nav = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Expertise",  href: "#expertise"  },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
  // CV section is linked from hero CTA and CV section itself; omitted from nav to keep it compact
] as const;

// ─── Expertise ───────────────────────────────────────────────────────────────

export const expertiseCategories = [
  {
    id:    "doc-control",
    label: "Document Control",
    icon:  "FileStack",
    skills: [
      "Document Coding & Numbering",
      "Document Registration & Classification",
      "Drawing & Revision Control",
      "Transmittal Preparation & Tracking",
      "Document Status Monitoring",
      "Correspondence Management",
      "Superseded Document Archiving",
      "Project Close-out & Handover Packages",
    ],
  },
  {
    id:    "edms-pmis",
    label: "EDMS / PMIS",
    icon:  "Database",
    skills: [
      "Thinkproject Administration",
      "Samsung Knox Portal (S-PMIS)",
      "Aconex Workflows",
      "Submission & Workflow Management",
      "Revision & Review Status Tracking",
      "Controlled Records Management",
      "EDMS User Training & Guidance",
      "Document Register Maintenance",
    ],
  },
  {
    id:    "epc-construction",
    label: "EPC / Construction Documentation",
    icon:  "ClipboardList",
    skills: [
      "MOM Preparation & Circulation",
      "Method Statement (MOS) Review",
      "Risk Assessment (RA) Coordination",
      "MAR Tracking & Management",
      "Field Change Request (FCR) Control",
      "Site Instruction Management",
      "Concrete Pouring Plan Tracking",
      "Subcontractor Submittal Coordination",
      "As-Built Documentation Support",
      "Inspection Record Management",
    ],
  },
  {
    id:    "compliance-coordination",
    label: "Compliance & Coordination",
    icon:  "Scale",
    skills: [
      "Contract & Regulatory Compliance",
      "Approval Routing (Engineering / HSSE / Owner)",
      "Overdue Submission Monitoring",
      "Multidisciplinary Stakeholder Coordination",
      "Subcontractor & Vendor Liaison",
      "Daily / Weekly / Monthly Reporting",
      "Legal Document Drafting & Review",
      "Regulatory Research & Risk Assessment",
    ],
  },
] as const;

export const softwareTools = [
  {
    name:        "Thinkproject",
    category:    "EDMS / PMIS",
    level:       "Live — Current Role",
    levelKind:   "live" as const,
    context:     "CEEC · Starah 2GW Wind Project",
  },
  {
    name:        "Samsung Knox Portal (S-PMIS)",
    category:    "EDMS / PMIS",
    level:       "Live — Previous Role",
    levelKind:   "live" as const,
    context:     "Samsung C&T · Meghnaghat 718MW CCPP",
  },
  {
    name:        "Aconex",
    category:    "EDMS / PMIS",
    level:       "Professional Training",
    levelKind:   "trained" as const,
    context:     "Oracle Aconex — Document Control & Workflow",
  },
  {
    name:        "Microsoft Excel",
    category:    "MS Office",
    level:       "Advanced",
    levelKind:   "advanced" as const,
    context:     "Document registers, trackers, reporting",
  },
  {
    name:        "Microsoft Word",
    category:    "MS Office",
    level:       "Advanced",
    levelKind:   "advanced" as const,
    context:     "MOM, transmittals, correspondence",
  },
  {
    name:        "Microsoft PowerPoint",
    category:    "MS Office",
    level:       "Proficient",
    levelKind:   "proficient" as const,
    context:     "Presentations & project reporting",
  },
  {
    name:        "AI Productivity Tools",
    category:    "AI",
    level:       "Active Use",
    levelKind:   "active" as const,
    context:     "Workflow automation, document efficiency",
  },
] as const;

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects = [
  {
    id:         "starah-wind",
    name:       "Starah Independent Power Plant",
    subtitle:   "2GW Onshore Wind Project",
    capacity:   "2,000 MW",
    type:       "Onshore Wind",
    location:   "Saudi Arabia",
    status:     "Under Construction",
    statusKind: "active" as const,
    contractor: "CEEC — China Energy Engineering Corporation",
    owner:      "Project Owner (Starah IPP)",  // CV refers to "the Owner" — specific name not disclosed
    edms:       "Thinkproject",
    myRole:     "Project Document Controller",
    period:     "Nov 2025 — Present",
    milestone:  null,
    coverImage: "/images/ceec/sunset.jpg",   // Place: public/images/ceec/sunset.jpg
    highlights: [
      "Document numbering and coding — assigning and validating document numbers per project-specific coding structure, discipline classification, and sequential numbering requirements",
      "Engineering drawing and revision control — monitoring status, approvals, and distribution of latest approved versions to all relevant project teams",
      "MOM preparation and circulation for weekly, kick-off, and project-level meetings — maintaining traceable records of actions and responsibilities",
      "MOS/RA review and approval routing between Engineering, EPC HSSE, and the Owner",
      "FCR, Site Instruction, and Engineering Contact Sheet management within the project EDMS",
      "MAR and Concrete Pouring Plan tracking — from initial submission through Owner approval or resubmission",
      "Overdue submission monitoring and outstanding action tracking to support timely review cycles",
      "EDMS workflow training for EPC engineers and new Construction Department personnel",
    ],
  },
  {
    id:         "meghnaghat-ccpp",
    name:       "Meghnaghat 718MW Combined Cycle Power Plant",
    subtitle:   "CCPP EPC Project",
    capacity:   "718 MW",
    type:       "Combined Cycle Power Plant",
    location:   "Meghnaghat, Bangladesh",
    status:     "Completed — COD Achieved",
    statusKind: "completed" as const,
    contractor: "Samsung C&T Corporation",
    owner:      "JERA Meghnaghat Power Limited",
    technology: "GE Vernova",
    edms:       "Samsung Knox Portal (S-PMIS)",
    myRole:     "Project Document Controller",
    period:     "Nov 2022 — Oct 2025",
    milestone:  "Commercial Operation Date (COD) achieved",
    coverImage: "/images/samsung/aerial-1.jpg",   // Place: public/images/samsung/aerial-1.jpg
    highlights: [
      "End-to-end document control across the full EPC project lifecycle — from engineering phase through construction, commissioning, and handover",
      "Registration, classification, review, and distribution of engineering, construction, vendor, and project documentation",
      "S-PMIS administration — managing submissions, workflows, review status, revisions, and controlled records",
      "Transmittal preparation and tracking — responses, comments, approvals, and resubmissions to EPC teams, vendors, and subcontractors",
      "Document registers, correspondence logs, and submission trackers — daily, weekly, and monthly reporting to project management",
      "Project close-out and handover — compiling and tracking as-built drawings, final technical documents, and handover packages",
      "Personnel training on S-PMIS workflows, submission procedures, and documentation requirements",
    ],
  },
] as const;
