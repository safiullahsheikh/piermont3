// The six phases every project runs through (production /process). Also on /solutions.
export const FLOW = [
  {
    step: "01",
    phase: "Discover",
    title: "Understand the real problem",
    summary:
      "We start by listening. Your goals, your audience, your limits and what a good result looks like, all before anything gets designed.",
    duration: "1 to 2 weeks",
    image: "/process/phase1.jpg",
    imageAlt: "Poster reading Your Mind Creates Problems That Don’t Exist, Rule your mind or it will rule you",
    activities: [
      "Stakeholder kickoff and alignment",
      "Audience and competitor scan",
      "Audit of current brand and product",
      "Success metrics and constraints map",
    ],
    deliverables: [
      "Discovery brief",
      "Opportunity map",
      "Project roadmap outline",
    ],
  },
  {
    step: "02",
    phase: "Define",
    title: "Shape the direction",
    summary:
      "What we learn turns into a plan: how you position yourself, what you say, how the site is organised and how it will be built.",
    duration: "1 to 2 weeks",
    image: "/process/phase2.jpg",
    imageAlt: "A paintbrush painting a winding road through a dark landscape",
    activities: [
      "Positioning and messaging framework",
      "IA and user journey mapping",
      "Technical approach and stack decisions",
      "Scope lock and milestone plan",
    ],
    deliverables: [
      "Strategy deck",
      "Sitemap / flows",
      "Build plan with milestones",
    ],
  },
  {
    step: "03",
    phase: "Design",
    title: "Design the experience",
    summary:
      "The plan becomes real screens and a real identity. Layouts, a design system and clickable prototypes you can try before we write any code.",
    duration: "2 to 4 weeks",
    image: "/process/phase3.jpg",
    imageAlt: "Tiny figures on ladders building a shopping app screen on a giant phone",
    activities: [
      "Visual direction and mood exploration",
      "High-fidelity UI across key screens",
      "Design system foundations",
      "Interactive prototypes and review cycles",
    ],
    deliverables: [
      "Approved UI designs",
      "Component library starter",
      "Prototype for stakeholder sign-off",
    ],
  },
  {
    step: "04",
    phase: "Build",
    title: "Engineer what we designed",
    summary:
      "We build the designs into a fast, accessible product with clean code, integrations that work and a CMS your team can run.",
    duration: "3 to 6 weeks",
    image: "/process/phase4.jpg",
    imageAlt: "Coding poster with streams of code spiralling into a black hole",
    activities: [
      "Frontend implementation and motion",
      "CMS / headless content setup",
      "Integrations and custom features",
      "QA across devices and breakpoints",
    ],
    deliverables: [
      "Staging environment",
      "Production-ready build",
      "Handoff docs and training",
    ],
  },
  {
    step: "05",
    phase: "Launch",
    title: "Ship with confidence",
    summary:
      "Launch day is planned and calm. SEO basics, analytics, speed checks and a clear switchover plan are all sorted beforehand.",
    duration: "1 week",
    image: "/process/phase5.jpg",
    imageAlt: "A king chess piece on a chessboard with the words the Ruler",
    activities: [
      "Performance and accessibility pass",
      "Analytics and conversion tracking",
      "SEO metadata and redirects",
      "Launch checklist and cutover",
    ],
    deliverables: [
      "Live production site",
      "Launch report",
      "Post-launch support window",
    ],
  },
  {
    step: "06",
    phase: "Grow",
    title: "Iterate on what works",
    summary:
      "Launch is the start. We look at the data, fix what isn't working and keep releasing improvements.",
    duration: "Ongoing",
    image: "/service-seo.png",
    imageAlt: "Growth, analytics, and iteration planning",
    activities: [
      "Performance and funnel review",
      "A/B and content experiments",
      "Feature and page expansions",
      "Retainer or sprint-based support",
    ],
    deliverables: [
      "Monthly insights summary",
      "Prioritized backlog",
      "Continuous release cadence",
    ],
  },
] as const;
