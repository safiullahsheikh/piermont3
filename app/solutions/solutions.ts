import type { Project } from "../work/projects";

export type Solution = {
  slug: string;
  label: string;
  /** Page title, before the " | Piermont Studios" suffix. */
  metaTitle: string;
  /** One line used on the solutions index, home and 404 lists. */
  summary: string;
  /** Hero title (h1). */
  title: string;
  /** The problem it answers, on the solutions overview. */
  problem: string;
  group: Project["group"];
  metaDescription: string;
  lead: string;
  /** Falls back to the first project's video when absent. */
  introImage?: { src: string; alt: string };
  introHeading: string;
  introText: [string, string];
  capabilitiesTitle: string;
  capabilities: { tag: string; title: string; body: string }[];
  processTitle: string;
  process: { title: string; text: string }[];
  deliverables: string[];
  workHeading: string;
  ctaLines: [string, string];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "website-development",
    label: "Website Development",
    metaTitle: "Website Design & Development Services",
    summary: "Fast, custom sites that turn visitors into customers.",
    title: "Website Development",
    problem: "Your site looks fine but doesn’t bring in business.",
    group: "WEBSITE DESIGN",
    metaDescription:
      "Custom websites built for speed, clarity and conversion, from marketing sites to e-commerce and CMS platforms, by Piermont Studios.",
    lead: "Custom sites built to load fast, read clearly and win customers, designed to look like nobody else.",
    introImage: { src: "/contact-mockup.png", alt: "Browser mockup of a polished marketing website" },
    introHeading: "Sites that look good and bring in business.",
    introText: [
      "We treat a website like a product. Clear structure, motion that has a reason to be there, and clean code that stays fast as you grow.",
      "From first wireframe to launch day, one team owns the full path: UX, UI, frontend, CMS, and the integrations that keep marketing moving.",
    ],
    capabilitiesTitle: "Built for how your brand shows up online",
    capabilities: [
      { tag: "MARKETING", title: "Brand & marketing sites", body: "Sites with clear messaging and thoughtful motion, laid out so visitors get in touch." },
      { tag: "COMMERCE", title: "E-commerce experiences", body: "Online stores with a simple checkout, stock connected behind the scenes and pages that stay fast when traffic spikes." },
      { tag: "PLATFORM", title: "CMS & content systems", body: "Your team can add and edit pages themselves instead of waiting on a developer for every change." },
      { tag: "PRODUCT", title: "Custom web apps", body: "Dashboards, portals and tools built around how your users actually work." },
    ],
    processTitle: "A clear path from brief to live site",
    process: [
      { title: "Discover", text: "Your goals, your audience, your limits and what the site needs to achieve." },
      { title: "Architect", text: "Site structure, user flows and a technical plan that keeps things fast as you grow." },
      { title: "Design & build", text: "Faithful builds of the designs, accessible code and integrations that work." },
      { title: "Launch & grow", text: "We launch, measure and keep improving, with support whenever you need it." },
    ],
    deliverables: [
      "Responsive UI across every breakpoint",
      "Performance-first frontend architecture",
      "SEO-ready structure and metadata",
      "CMS or headless content setup",
      "Analytics and conversion tracking",
      "Ongoing support and iteration",
    ],
    workHeading: "Recent website work",
    ctaLines: ["Ready to build", "your next site?"],
  },
  {
    slug: "social-media-design",
    label: "Social Media Design",
    metaTitle: "Social Media Design & Video Editing",
    summary: "Short form video and visuals made to stop the scroll.",
    title: "Social Media Design",
    problem: "Your posts get scrolled past.",
    group: "VIDEO EDITING",
    metaDescription:
      "Short form video, edits and motion made for Instagram, TikTok and YouTube Shorts. Social media design and video editing by Piermont Studios.",
    lead: "Scroll stopping video and visuals made for the feed, cut to hold attention from the first frame to the last.",
    introHeading: "Content people watch twice.",
    introText: [
      "Feeds move fast, so every piece has a second to earn attention. We plan the hook, the pace and the payoff before anything is edited.",
      "From fashion films to VFX clips, we cut, grade and finish content in the right format for every platform you post on.",
    ],
    capabilitiesTitle: "Made for the platforms your audience uses",
    capabilities: [
      { tag: "EDITING", title: "Short form edits", body: "Reels, TikToks and Shorts cut to the beat, with the hook in the first second." },
      { tag: "COLOR", title: "Grading & finish", body: "Color and sound that make your footage look like it belongs to one brand." },
      { tag: "VFX", title: "Motion & effects", body: "Compositing, transitions and animation that make people stop and ask how it was done." },
      { tag: "SYSTEMS", title: "Templates & kits", body: "Reusable graphics and edit templates so your team can post on brand every week." },
    ],
    processTitle: "From raw footage to a post that lands",
    process: [
      { title: "Brief", text: "What the piece is for, who it is for and where it will be posted." },
      { title: "Plan", text: "Hook, story and shot list, planned around how people actually scroll." },
      { title: "Edit", text: "Cutting, grading, sound and effects, with drafts you can comment on." },
      { title: "Deliver", text: "Every cut exported in the right size and length for each platform." },
    ],
    deliverables: [
      "Vertical, square and wide versions",
      "Captions and on screen text",
      "Color grading and sound mix",
      "Cover frames and thumbnails",
      "Edit templates for your team",
      "Files ready to post on every platform",
    ],
    workHeading: "Recent video work",
    ctaLines: ["Ready to make", "something people share?"],
  },
  {
    slug: "ad-campaigns",
    label: "Ad Campaigns",
    metaTitle: "Ad Campaigns & Paid Social Creative",
    summary: "Paid creative and media planned around your numbers.",
    title: "Ad Campaigns",
    problem: "Your ads get views, not customers.",
    group: "PERFORMANCE MARKETING",
    metaDescription:
      "Paid social ad films and performance marketing campaigns built to be watched to the end and turn viewers into customers, by Piermont Studios.",
    lead: "Ads people actually watch, planned around your numbers and made to bring in customers, not just views.",
    introHeading: "Ads that earn the next second.",
    introText: [
      "Nobody owes an ad their attention. We build every spot around a strong first second, a clear story and your product in frame the whole way through.",
      "We plan, shoot and cut the creative, then test versions against each other so the budget goes to the ads that perform.",
    ],
    capabilitiesTitle: "Creative and media working together",
    capabilities: [
      { tag: "STRATEGY", title: "Campaign planning", body: "Audience, offer and message worked out before any money is spent." },
      { tag: "CREATIVE", title: "Ad films & statics", body: "Short ad films and still ads made for Meta, TikTok, YouTube and Google." },
      { tag: "TESTING", title: "Variations & testing", body: "Different hooks, lengths and formats so we learn quickly what works." },
      { tag: "REPORTING", title: "Tracking & reporting", body: "Clear numbers on what each ad costs and what it brings back." },
    ],
    processTitle: "From idea to a campaign that pays back",
    process: [
      { title: "Research", text: "Your audience, your competitors and the offer that will make people act." },
      { title: "Concept", text: "Ad ideas and scripts, each built around one clear hook." },
      { title: "Produce", text: "Shooting and editing every version you need for each platform." },
      { title: "Optimize", text: "We launch, track results and move budget to the winners." },
    ],
    deliverables: [
      "Campaign strategy and targeting plan",
      "Ad films cut for every placement",
      "Static and carousel ads",
      "Hook and length variations for testing",
      "Tracking and conversion setup",
      "Monthly performance reports",
    ],
    workHeading: "Recent campaign work",
    ctaLines: ["Ready to run", "your next campaign?"],
  },
  {
    slug: "ai-development",
    label: "AI Development",
    metaTitle: "AI & Product Development Services",
    summary: "Useful AI features and products, built around real users.",
    title: "AI Development",
    problem: "Your team repeats the same work every day.",
    group: "PRODUCT DEVELOPMENT",
    metaDescription:
      "AI features, automations and digital products designed and built around real users. AI and product development by Piermont Studios.",
    lead: "Useful AI and well built products, designed around the people who use them and shipped without the hype.",
    introImage: {
      src: "/projects/pantry.png",
      alt: "Pantry mobile app home screen showing Pantry Health, recipes you can make now, and a grocery list",
    },
    introHeading: "Products that do the work for people.",
    introText: [
      "Good AI is often invisible. It fills in the list, suggests the next step or answers the question before someone has to ask.",
      "We design and build apps and tools end to end, and add AI where it saves people time, not where it makes a good demo.",
    ],
    capabilitiesTitle: "From first idea to a product in people's hands",
    capabilities: [
      { tag: "AI", title: "AI features", body: "Smart suggestions, assistants and search built into your product." },
      { tag: "AUTOMATION", title: "Workflows & agents", body: "Automations that take repetitive work off your team's plate." },
      { tag: "PRODUCT", title: "Apps & tools", body: "Mobile and web products designed and built around real daily use." },
      { tag: "INTEGRATION", title: "Models & data", body: "Choosing the right model and connecting it safely to your own data." },
    ],
    processTitle: "A clear path from idea to launch",
    process: [
      { title: "Discover", text: "The problem, the users and where AI can genuinely help." },
      { title: "Prototype", text: "A working prototype you can try within weeks, not months." },
      { title: "Build", text: "Production app, integrations and the guardrails to keep it reliable." },
      { title: "Improve", text: "We watch how people use it and keep making it better." },
    ],
    deliverables: [
      "Product strategy and roadmap",
      "UX and UI design",
      "Working prototype",
      "Production ready app or feature",
      "Model setup and integrations",
      "Ongoing support and improvements",
    ],
    workHeading: "Recent product work",
    ctaLines: ["Ready to build", "something useful?"],
  },
  {
    slug: "branding",
    label: "Branding",
    metaTitle: "Branding & Brand Identity Design",
    summary: "Identities with one clear idea, built to work everywhere.",
    title: "Brand Identity",
    problem: "People can’t tell you apart from the rest.",
    group: "BRANDING",
    metaDescription:
      "Brand identity, logos, color, type and guidelines that work on every screen and surface. Branding by Piermont Studios.",
    lead: "Identities with a clear idea behind them, built to work everywhere your brand shows up.",
    introHeading: "A brand people remember.",
    introText: [
      "A strong brand starts with one idea people can grasp in a second. We find that idea first, then build the logo, color and type around it.",
      "Then we make sure it holds up everywhere, from an app icon to a billboard, with guidelines your team can actually follow.",
    ],
    capabilitiesTitle: "Everything your brand needs to show up well",
    capabilities: [
      { tag: "STRATEGY", title: "Positioning & voice", body: "What you stand for, who you are for and how you sound." },
      { tag: "IDENTITY", title: "Logo & visual system", body: "Logo, color, type and imagery that work together." },
      { tag: "DIGITAL", title: "Web & product branding", body: "Your identity carried through your website, app and social." },
      { tag: "GUIDELINES", title: "Brand guidelines", body: "Clear rules and ready made assets so the brand stays consistent." },
    ],
    processTitle: "From a blank page to a brand you own",
    process: [
      { title: "Discover", text: "Your story, your audience and what sets you apart." },
      { title: "Define", text: "Positioning and the one idea the brand is built on." },
      { title: "Design", text: "Logo, color, type and imagery, tested on real applications." },
      { title: "Roll out", text: "Guidelines, assets and support as the brand goes live." },
    ],
    deliverables: [
      "Brand strategy and positioning",
      "Logo and logo variations",
      "Color and type system",
      "Brand guidelines",
      "Social and web templates",
      "Launch assets",
    ],
    workHeading: "Recent branding work",
    ctaLines: ["Ready to build", "your brand?"],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
