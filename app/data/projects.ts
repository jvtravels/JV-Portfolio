export interface Metric {
  value: string;
  label: string;
}

export interface UserGroup {
  num: string;
  title: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  tags: string[];
  description: string;
  whatIs: string;
  timeline: string;
  problem: string;
  tldrDecisions: string[];
  solution: string;
  results: string;
  metrics: Metric[];
  learningsList: string[];
  industry: string;
  role: string;
  liveSite: string;
  liveUrl: string;
  year: string;
  images: string[];
  coverDark?: string;
  coverLight?: string;
  comingSoon?: boolean;
  userGroups: UserGroup[];
  hmwQuestion: string;
  brandNote: string;
}

const FU = (id: string) =>
  `https://framerusercontent.com/images/${id}.jpg?width=2160&height=1200`;

export const PROJECTS: Project[] = [
  {
    slug: "tempo",
    shortTitle: "Tempo",
    title: "Tempo (YC23) - AI Software Factory",
    tags: ["Product Design", "AI Workflows", "SaaS"],
    description: "Tempo is an AI software factory that brings design, planning, and engineering into one workspace.\n\nThe product design work focused on making AI-driven workflows feel legible and trustworthy for teams shipping production software.",
    whatIs: "Tempo is an all-in-one workspace for software teams, combining docs, canvases, issues, and AI agents to help teams design and ship features faster.",
    timeline: "Ongoing",
    problem: "Teams using AI tools to build software lacked a shared workspace that kept design, planning, and code in sync. Context was scattered across disconnected tools.",
    tldrDecisions: [
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
    ],
    solution: "Placeholder solution summary — to be replaced with real case-study content.",
    results: "Placeholder results summary — to be replaced with real case-study content.",
    metrics: [
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
    ],
    learningsList: [
      "Placeholder learning — to be replaced with real case-study content.",
    ],
    industry: "SaaS",
    role: "Product Design",
    liveSite: "tempo.new",
    liveUrl: "https://tempo.new",
    year: "2026",
    images: ["/Work/Tempo-dark.png"],
    coverDark: "/Work/Tempo-dark.png",
    coverLight: "/Work/Tempo-light.png",
    userGroups: [
      { num: "01", title: "Placeholder audience", bullets: ["Placeholder — to be replaced with real audience insight"] },
    ],
    hmwQuestion: "Placeholder HMW question — to be replaced with real case-study content.",
    brandNote: "Placeholder brand note — to be replaced with real case-study content.",
  },
  {
    slug: "eves",
    shortTitle: "EVES",
    title: "EVES — Electric Vehicle Energy Solution",
    tags: ["Product Design", "SaaS"],
    description: "Placeholder description — to be replaced with real case-study content.",
    whatIs: "Placeholder — to be replaced with real case-study content.",
    timeline: "Placeholder",
    problem: "Placeholder problem statement — to be replaced with real case-study content.",
    tldrDecisions: [
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
    ],
    solution: "Placeholder solution summary — to be replaced with real case-study content.",
    results: "Placeholder results summary — to be replaced with real case-study content.",
    metrics: [
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
    ],
    learningsList: [
      "Placeholder learning — to be replaced with real case-study content.",
    ],
    industry: "Enterprise SaaS",
    role: "Product Design",
    liveSite: "eves",
    liveUrl: "#",
    year: "2026",
    images: ["/Work/EVES-dark.png"],
    coverDark: "/Work/EVES-dark.png",
    coverLight: "/Work/EVES-dark.png",
    userGroups: [
      { num: "01", title: "Placeholder audience", bullets: ["Placeholder — to be replaced with real audience insight"] },
    ],
    hmwQuestion: "Placeholder HMW question — to be replaced with real case-study content.",
    brandNote: "Placeholder brand note — to be replaced with real case-study content.",
  },
  {
    slug: "payg",
    shortTitle: "PAYG",
    title: "DynaChrg PAYG - Pay as you go",
    tags: ["Mobile UX Design"],
    description: "Placeholder description — to be replaced with real case-study content.",
    whatIs: "Placeholder — to be replaced with real case-study content.",
    timeline: "Placeholder",
    problem: "Placeholder problem statement — to be replaced with real case-study content.",
    tldrDecisions: [
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
      "Placeholder — real product decisions to be added",
    ],
    solution: "Placeholder solution summary — to be replaced with real case-study content.",
    results: "Placeholder results summary — to be replaced with real case-study content.",
    metrics: [
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
      { value: "—", label: "Placeholder metric" },
    ],
    learningsList: [
      "Placeholder learning — to be replaced with real case-study content.",
    ],
    industry: "EV Charging",
    role: "0→1 Product Design",
    liveSite: "payg",
    liveUrl: "#",
    year: "2026",
    images: ["/Work/PAYG-dark.png"],
    coverDark: "/Work/PAYG-dark.png",
    coverLight: "/Work/PAYG-dark.png",
    userGroups: [
      { num: "01", title: "Placeholder audience", bullets: ["Placeholder — to be replaced with real audience insight"] },
    ],
    hmwQuestion: "Placeholder HMW question — to be replaced with real case-study content.",
    brandNote: "Placeholder brand note — to be replaced with real case-study content.",
  },
  {
    slug: "cypher",
    shortTitle: "Cypher",
    title: "Cypher — Website and AI-driven identity for data consultancy",
    tags: ["Web Design", "Development", "Branding"],
    description: "Cypher's positioning called for a digital presence that feels modern, data-driven, and confident.\n\nGenerative AI visuals and commerce-inspired patterns helped communicate innovation clearly, setting the product apart while supporting conversion and usability.",
    whatIs: "Cypher is a data consultancy that helps companies make better decisions through analytics, machine learning, and data infrastructure. They work across industries but are strongest in e-commerce and consumer technology.",
    timeline: "9 weeks",
    problem: "A data consultancy with real depth but a presence interchangeable with a hundred others. Needed to signal innovation without leaning on the usual data-firm clichés. Their previous site looked like every other analytics agency.",
    tldrDecisions: [
      "Used generative AI visuals as a visual language — dynamic, data-native, and distinctly theirs",
      "Commerce-inspired patterns because Cypher's clients think in conversion, not dashboards",
      "Avoided the 'dark data' aesthetic trap — chose confident and human over cold and technical",
      "Built motion into the brand system so it scales across all channels",
    ],
    solution: "Generative AI visuals as the visual language — dynamic, data-native, distinct. Commerce-inspired patterns because Cypher's clients think in conversion, not dashboards.",
    results: "A digital presence that opens conversations. New clients consistently mention the website during initial calls as the reason they reached out.",
    metrics: [
      { value: "9wk", label: "Brand to launch" },
      { value: "↑", label: "Inbound quality" },
      { value: "3×", label: "Site session time" },
    ],
    learningsList: [
      "For a data firm, the most credible signal is showing that you understand systems visually. The site has to think the way the company thinks.",
      "AI-generated assets can be brand assets when they're designed with intent. The generative system we built is consistent, not random.",
      "A site that opens conversations is worth more than one that closes them. The job of the brand is to earn the meeting, not replace it.",
    ],
    industry: "Data Consultancy",
    role: "Brand, Design, Development",
    liveSite: "cypher.build",
    liveUrl: "https://cypher.build",
    year: "2024",
    comingSoon: true,
    images: ["/Work/P4.avif", ...["fynz6BBRInDRcNAbR3yxF6bBpXM","6Rp81LAufsCTmiSLdaZ4r0ONk","KGmmFz02BG6G7gU5DSsQvZyAns","N4kMZRWkDBbqycFllX3fgDfNBE","37jFAEJjlvkZ0UzGaV6uQWxOw"].map(FU)],
    userGroups: [
      { num: "01", title: "E-commerce Leaders", bullets: ["Running high-volume Shopify and DTC stores", "Need analytics that connect data to revenue decisions", "Compare Cypher against in-house data teams"] },
      { num: "02", title: "Growth Teams", bullets: ["Running experiments and attribution models", "Need a partner who speaks conversion, not just dashboards", "Judge the consultancy by how well their site communicates"] },
      { num: "03", title: "CTOs & Technical Founders", bullets: ["Evaluating data infrastructure decisions", "Need to trust the team's technical depth before engaging", "Look for evidence of systems thinking in every touchpoint"] },
    ],
    hmwQuestion: "How might we position a data consultancy as distinctly modern without falling into the dark, cold, technical aesthetics every competitor uses?",
    brandNote: "The generative AI visual system wasn't a gimmick — it was the brand strategy. A data firm that uses AI to make its own identity signals that it thinks in systems, not services. Every asset in the system is generated but governed: coherent, not random.",
  },
  {
    slug: "specter",
    shortTitle: "Specter",
    title: "Specter — Website design for startup data tool. In collaboration with Endless.",
    tags: ["Web Design"],
    description: "Specter's website needed a way to communicate complex tracking capabilities with clarity.\n\nWith unified visual language and custom illustrations made the tool easier to understand, helping users quickly grasp what Specter does and how it works. This alone supported higher conversion across key pages.",
    whatIs: "Specter is a data tracking platform that gives product teams visibility into their users' behaviour across every touchpoint. It surfaces insights that most analytics tools miss, with a focus on actionable data over raw metrics.",
    timeline: "7 weeks",
    problem: "Specter tracks things competitors can't, but the product's breadth made it hard to explain. Without a clear visual narrative, visitors left before understanding the value. The site needed to do the job of a sales demo.",
    tldrDecisions: [
      "Built a unified visual language across all feature pages — one system, not a stack of modules",
      "Used custom illustrations to make tracking mechanisms legible without screenshots",
      "Prioritised the 'what does this mean for me' question over feature depth on every page",
      "Created a narrative arc: problem surface → Specter sees it → here's what you do with it",
    ],
    solution: "Unified visual language across the site — one system, not a stack of feature pages. Custom illustrations made the tracking mechanisms legible at a glance.",
    results: "Higher conversion across key pages. The clarity of the site gave the sales team a better starting point for every conversation.",
    metrics: [
      { value: "7wk", label: "Design to ship" },
      { value: "↑", label: "Key page conversion" },
      { value: "↓", label: "Sales cycle length" },
    ],
    learningsList: [
      "Complexity isn't the same as depth. The most technical products often benefit most from the most careful simplification.",
      "A unified visual language isn't a nice-to-have — it's what makes a multi-feature product feel like one coherent thing.",
      "The site that does the demo's job for free is the most valuable sales asset a startup can have.",
    ],
    industry: "Data Platform",
    role: "Web Design",
    liveSite: "tryspecter.com",
    liveUrl: "https://tryspecter.com",
    year: "2023",
    images: ["SmtK9KZcrkUYMWnYkTcyKhB5Q","4jDwPWKuQ4GuNjGGY116rNRk","FQOAlhyOGYWJ7x5J4e2J9Jbs9U","neuUpQrIkDzTa5K3UeIaCujuzA","iVSTiCKZ2BuXeIXgxYAQHA4wL0","g32wH391Oxlix9zigqdOuBibQ","llpPFKiavhuWjCVIVCR4usx9kLI"].map(FU),
    userGroups: [
      { num: "01", title: "Product Managers", bullets: ["Need visibility into user behaviour across every touchpoint", "Want actionable insights, not raw metric exports", "Compare tools based on how fast they can surface answers"] },
      { num: "02", title: "Growth Engineers", bullets: ["Building funnels and attribution models", "Need tracking that captures what standard tools miss", "Judge platforms by how quickly they can get to production"] },
      { num: "03", title: "Startup Founders", bullets: ["Wearing multiple hats across product and growth", "Need a single source of truth without a data team", "Evaluate tools by whether the site explains it without a demo"] },
    ],
    hmwQuestion: "How might we make Specter's tracking depth legible to visitors in under 30 seconds — without a demo, without jargon?",
    brandNote: "The site had to replace the sales demo. I built a unified visual system across every feature page — one illustration style, one layout grammar, one narrative arc. The design doesn't describe features; it walks visitors through the problem they already have.",
  },
  {
    slug: "the-signal",
    shortTitle: "The Signal",
    title: "The Signal — Website and identity for 50k+ reader AI newsletter",
    tags: ["Web Design", "Development", "Branding"],
    description: "The Signal needed a digital presence that reflects its distinct voice in the AI space and supports continued audience growth.\n\nA generative AI–driven web experience and custom key visuals helped differentiate the brand, while the new identity reinforced credibility with past partners including Microsoft, Anthropic, and Adobe. All this leading to higher engagement and more newsletter sign-ups.",
    whatIs: "The Signal is an AI newsletter with 50,000+ readers. It covers developments in artificial intelligence, machine learning, and technology for a professional audience — with partners including Microsoft, Anthropic, and Adobe.",
    timeline: "8 weeks",
    problem: "A 50k+ reader newsletter with a distinct editorial voice and no visual identity to match. The site didn't reflect the calibre of the content or the credibility of the partners. Newsletter signups were plateauing without a strong brand anchor.",
    tldrDecisions: [
      "Used generative AI as the visual language — fitting that an AI newsletter would be represented by AI-made art",
      "Built the identity to work at scale: email header, social card, web, and press kit",
      "Designed the homepage as a conversion surface, not an archive — email capture first",
      "Made the partner logos prominent without breaking the editorial tone",
    ],
    solution: "Generative AI-driven web experience and custom key visuals. Identity built to hold its own alongside Microsoft, Anthropic, and Adobe as named partners.",
    results: "Higher engagement, more newsletter sign-ups, and an identity that's been referenced in press coverage about the AI media landscape.",
    metrics: [
      { value: "50k+", label: "Reader base at launch" },
      { value: "↑", label: "Weekly sign-up rate" },
      { value: "↑", label: "Open rate vs baseline" },
    ],
    learningsList: [
      "For a media brand, the site is the product. It has to signal editorial intelligence from the first frame — readers don't separate the design from the writing.",
      "Generative art earns trust when it's coherent. Random AI imagery reads as lazy; a designed generative system reads as intentional.",
      "Partner credibility is a design asset. Knowing how and where to surface it is as important as the partners themselves.",
    ],
    industry: "AI Newsletter",
    role: "Brand, Design, Development",
    liveSite: "thesignal.so",
    liveUrl: "https://thesignal.so",
    year: "2024",
    images: ["tTwTTxVKKSOBw7A80LspDxx8Ag","Ki97QAhosBVwFWkAhgeLUQVGqkE","wGptrNrdWEFEHvTo3kd5W2GZlFE","rBVG2OpUTvd9RD7s6g2vPHxJvM","zew92AlsAUgaxe9dU1MxdOzpdTY","3nwiqOKR0QQkRa09CvFF9GWDyW4","TN2YjyIUOgX4a7wk896aHTe9GoI"].map(FU),
    userGroups: [
      { num: "01", title: "AI Professionals", bullets: ["Working in ML, research, or product at AI companies", "Read newsletters to stay ahead without drowning in noise", "Share content with colleagues — brand visibility matters"] },
      { num: "02", title: "Tech Leaders", bullets: ["CTOs, VPs of Engineering, and technical founders", "Need curated signal, not volume", "Partners like Microsoft and Anthropic validate credibility instantly"] },
      { num: "03", title: "Curious Generalists", bullets: ["Interested in AI's impact beyond the technical layer", "Arrive from social sharing and press coverage", "Convert when the brand feels credible and the writing feels smart"] },
    ],
    hmwQuestion: "How might we build a brand identity that earns shelf space next to Microsoft, Anthropic, and Adobe — without a marketing team?",
    brandNote: "A newsletter's site is the brand. Readers don't separate the design from the editorial voice. I used a generative AI visual system — fitting that an AI-focused publication would be represented by AI-made art. The homepage was designed as a conversion surface first: email capture above the fold, partner logos as credibility signals, archives behind a scroll.",
  },
  {
    slug: "calldesk",
    shortTitle: "Calldesk",
    title: "Calldesk — Web design for AI-powered call automation platform",
    tags: ["Web Design", "Development", "Branding"],
    description: "Enterprise teams looking at AI call automation need to quickly understand how it works and why it can be trusted. The website guides users through the product in a clear, straightforward way, making the value of automation easy to grasp from the first visit.\n\nNew website helped Calldesk present itself as a serious enterprise solution and support conversion among large clients.",
    whatIs: "Calldesk is an AI-powered call automation platform that handles inbound customer service calls at scale. Enterprise teams use it to automate repetitive call flows without sacrificing the quality of the customer experience.",
    timeline: "11 weeks",
    problem: "Enterprise buyers needed to trust AI call automation before they'd consider it. The previous site looked like a startup pitch deck, not a production-grade enterprise solution. Procurement teams weren't finding what they needed to move the decision forward.",
    tldrDecisions: [
      "Structured the site around buyer anxiety, not product features: how it works, why it's safe, what it delivers",
      "Designed for the procurement reader: clear ROI signal, security context, integration depth",
      "Used the product UI as a trust signal — showing the interface early reduces fear of AI",
      "Built a visual language that communicates reliability over innovation",
    ],
    solution: "Site structured to guide users through the product clearly — how it works, why it's trustworthy, what it delivers. Visual language calibrated for procurement conversations, not developer audiences.",
    results: "Calldesk can now hold their own in enterprise sales conversations. The site shortened the sales cycle and increased qualified inbound from large clients.",
    metrics: [
      { value: "11wk", label: "End to end" },
      { value: "↓", label: "Sales cycle length" },
      { value: "↑", label: "Enterprise inbound" },
    ],
    learningsList: [
      "Enterprise buyers aren't sold by features — they're sold by trust signals. The site's job was to establish credibility before a human ever got on a call.",
      "Showing the product UI reduces fear. For AI tools, a visible interface communicates control more effectively than any copy.",
      "Procurement is a team sport. Design the site for the person who has to justify the decision upward, not just the person who found it.",
    ],
    industry: "AI Automation",
    role: "Brand, Design, Development",
    liveSite: "calldesk.ai",
    liveUrl: "https://calldesk.ai",
    year: "2023",
    images: ["rDJ5VixMzo7xJq21ruy4Sxxc6hs","30xXx7xHYxSD5tVsKQFDvjTn5M","MhU890cqYObCfX1KRm47xlLIUmw","PW4fgszPdl29jJXd8UG6GxiIoOM","zxjF0itWDo6PeEOPaLx14AY0oX8","PpiIWmDONPNnVVD3egtvMkqkhCE","Z0DRdmk8aN84QUaAD7VJdQxRgFo"].map(FU),
    userGroups: [
      { num: "01", title: "Enterprise IT Leaders", bullets: ["Evaluating AI call automation for large-scale deployment", "Need security and integration context before any demo", "Judge vendors by how professional their web presence looks"] },
      { num: "02", title: "Contact Centre Managers", bullets: ["Handling thousands of inbound calls monthly", "Need to see proof that AI can handle their specific call types", "Look for case studies and volume data before engaging"] },
      { num: "03", title: "Procurement Teams", bullets: ["Signing off on vendor decisions internally", "Need the site to answer their compliance checklist", "Reference the website in board presentations and budget requests"] },
    ],
    hmwQuestion: "How might we make enterprise buyers trust AI call automation enough to put it in front of their procurement team?",
    brandNote: "Enterprise software sites have a trust problem: they often look like they were built by engineers for engineers. I designed for the procurement reader — clear ROI signals, security context surfaced early, and a visual language that communicates reliability over innovation. Showing the product UI early reduced fear of AI in ways that no copy could.",
  },
  {
    slug: "cluster",
    shortTitle: "Cluster",
    title: "Cluster — Website and visual identity for AI A/B testing platform",
    tags: ["Web Design", "Development", "Branding", "Logo"],
    description: "Shopify brands evaluating A/B testing tools need to quickly see credibility, results, and a clear path forward. The website and visual identity were built to present Cluster as a premium solution and make its value easy to understand from the first visit.\n\nA clear structure, subtle Shopify-inspired UI references, and a focused conversion flow helped build trust and highlight real outcomes. As a result, the site supported qualified demo bookings and became a key driver for growth.",
    whatIs: "Cluster is an AI-powered A/B testing platform built for Shopify brands. It helps e-commerce teams run smarter experiments and act on results faster, with an interface designed for marketers rather than data scientists.",
    timeline: "10 weeks",
    problem: "Shopify brands evaluating A/B testing tools need to see credibility and results fast. Cluster's previous site didn't close that gap. The platform was more capable than its competitors, but the site wasn't making that case.",
    tldrDecisions: [
      "Used subtle Shopify UI references to create instant familiarity with the target audience",
      "Led with outcome data — real numbers from real stores — before any feature explanation",
      "Built the logo and identity to own a visual space that no other testing tool occupies",
      "Designed the CTA architecture around demo bookings as the primary conversion goal",
    ],
    solution: "Premium visual identity and a focused conversion flow. Subtle Shopify UI references for familiarity, real outcome data for trust, CTA architecture built around demo bookings.",
    results: "Qualified demo bookings increased. The site became the primary sales artifact in outbound and a key driver for the company's growth phase.",
    metrics: [
      { value: "10wk", label: "Brief to launch" },
      { value: "↑", label: "Demo bookings" },
      { value: "↑", label: "Outbound conversion" },
    ],
    learningsList: [
      "For conversion-focused tools, the site itself needs to demonstrate conversion thinking. Structure, hierarchy, and CTA placement are as important as the visual design.",
      "Familiarity is a shortcut to trust. Shopify merchants recognised the UI language immediately — which made Cluster feel like something they already understood.",
      "Outcome data is the most powerful copy. A real number from a real store outperforms any product description by a factor of ten.",
    ],
    industry: "A/B Testing",
    role: "Brand, Design, Development",
    liveSite: "getcluster.ai",
    liveUrl: "https://getcluster.ai",
    year: "2024",
    images: ["SeimINeO4PQo59rKVBALJD5K97U","trJBUUG2Qvbnn3ek9V1vNIRlSk","vc8ysRIsGrKvnzWLnCEdsnx8h1Y","2a15y9rH5xgAUisETtEZknPXyA","m5O2FSwwz3gv6SsvbGwPVwAr4J0","i1oqDYo4MGZgBXHvP6SejktTyZ0"].map(FU),
    userGroups: [
      { num: "01", title: "Shopify Brand Owners", bullets: ["Running 7–8 figure stores and scaling aggressively", "Need A/B testing that's fast to set up and easy to read", "Compare tools by how quickly they can show revenue impact"] },
      { num: "02", title: "E-commerce Growth Managers", bullets: ["Running continuous experiments across CRO and paid channels", "Need a tool that surfaces statistical significance without a data analyst", "Evaluate platforms by how well they integrate with existing stack"] },
      { num: "03", title: "DTC Founders", bullets: ["Making every decision themselves across product and marketing", "Need the tool to feel familiar — Shopify-native, not foreign", "Convert when they see real numbers from real stores like theirs"] },
    ],
    hmwQuestion: "How might we make Cluster feel like the obvious choice for Shopify brands before they've even booked a demo?",
    brandNote: "The logo and identity were built to own a visual space that no other A/B testing tool occupies. Subtle Shopify UI references created instant familiarity. Outcome data from real stores led the narrative — numbers before features, always. The CTA architecture was designed entirely around demo bookings as the single conversion goal.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

// Slugs of the 4 projects already shown on the homepage's Work section —
// used to keep /work limited to the projects not already on display there.
export const HOMEPAGE_PROJECT_SLUGS = PROJECTS.slice(0, 4).map(p => p.slug);

// Only these case studies are included in the sitemap and indexed; all other slugs are noindex.
export const INDEXABLE_SLUGS = ["tempo", "eves", "payg"];
