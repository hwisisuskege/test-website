export type ServiceGroup = {
  title: string;
  problem: string;
  deliverables: string[];
  when: string;
};
export type Service = {
  slug: string;
  number: string;
  stage: string;
  title: string;
  short: string;
  headline: string;
  intro: string;
  groups: ServiceGroup[];
  note: string;
};
export const services: Service[] = [
  {
    slug: "website-design-development",
    number: "01",
    stage: "Presence",
    title: "Website design & development",
    short: "A clear story. A considered experience. A better way to enquire.",
    headline: "A website that makes the next step obvious.",
    intro:
      "Turn what makes your business valuable into a digital experience people can understand, trust, and use. Strategy, design, and development work together from the first page outline.",
    groups: [
      {
        title: "Strategy & website planning",
        problem:
          "When every page feels equally important, visitors lose the thread. We help decide what your website needs to say and where it should lead.",
        deliverables: [
          "Business goals and audience discovery",
          "Website audits",
          "Sitemap and information architecture",
          "Customer journeys and conversion paths",
          "Content planning and page priorities",
        ],
        when: "Useful before a new build, a redesign, or a change in positioning.",
      },
      {
        title: "Brand-led website design",
        problem:
          "A generic template can make a distinctive business look interchangeable. We translate your identity into a coherent, usable website.",
        deliverables: [
          "Custom business websites",
          "Visual direction and UI design",
          "Responsive layouts",
          "Interaction design",
          "Website redesigns",
          "Reusable design systems",
        ],
        when: "Useful when your website no longer reflects the quality of your work.",
      },
      {
        title: "Service business websites",
        problem:
          "People need to know what you do, where you work, and how to get started. We bring those answers closer to the first click.",
        deliverables: [
          "Service and location pages",
          "Enquiry and quote request journeys",
          "Appointment booking integrations",
          "Trust-building content and project galleries",
          "Connections to existing customer management tools",
        ],
        when: "Useful for businesses that sell expertise, appointments, or local services.",
      },
      {
        title: "Startup & technology websites",
        problem:
          "A strong product can be difficult to explain. We build a narrative around the customer problem, the product, and its practical value.",
        deliverables: [
          "Product marketing websites",
          "SaaS websites and feature pages",
          "Product launch pages",
          "Waitlists, demo requests, and onboarding entry points",
          "Technical information in accessible language",
        ],
        when: "Useful before a launch, a new product release, or a positioning shift.",
      },
      {
        title: "Development & integrations",
        problem:
          "A design only works when it works in the browser and with your tools. We build the interface and connect the handoffs behind it.",
        deliverables: [
          "Responsive frontend development",
          "CMS implementation and editable content",
          "Form and workflow integrations",
          "Analytics and event tracking setup",
          "Relevant third-party platform connections",
        ],
        when: "Useful when you need a reliable build, editable content, or fewer manual tasks.",
      },
      {
        title: "Performance, accessibility & care",
        problem:
          "Slow pages and awkward interactions make a good first impression harder. We identify barriers and keep the website useful after launch.",
        deliverables: [
          "Page speed improvements",
          "Technical SEO foundations",
          "Accessibility improvements",
          "Ongoing maintenance and updates",
          "Website support and iterative improvements",
        ],
        when: "Useful for an existing site that needs focused improvements or ongoing care.",
      },
    ],
    note: "Every proposal defines its own scope. Content, integrations, hosting, maintenance, and accessibility targets are agreed before work begins; one project does not automatically include every service.",
  },
  {
    slug: "social-media",
    number: "02",
    stage: "Attention",
    title: "Social media",
    short:
      "Content with a point of view. A presence worth paying attention to.",
    headline: "Give people a reason to pay attention.",
    intro:
      "Build a consistent voice in the places your audience actually spends time. We connect strategy, useful content, and a practical publishing rhythm to your wider business story.",
    groups: [
      {
        title: "Social strategy",
        problem:
          "Posting more is not a strategy. We establish who you need to reach, what they care about, and which channels deserve your time.",
        deliverables: [
          "Audience and competitor research",
          "Channel selection",
          "Brand voice and messaging",
          "Content pillars",
          "Campaign planning and editorial calendars",
        ],
        when: "Useful when activity feels scattered or you are choosing where to begin.",
      },
      {
        title: "Profile & presence setup",
        problem:
          "An unclear bio or inconsistent profile can interrupt a promising first impression. We make your selected channels feel connected.",
        deliverables: [
          "Profile audits and optimization",
          "Bios and messaging",
          "Branded profile assets",
          "Highlight covers and reusable visual templates",
          "Consistency across selected channels",
        ],
        when: "Useful at launch, during a rebrand, or before a new campaign.",
      },
      {
        title: "Content production",
        problem:
          "Your expertise needs a format people can engage with. We turn ideas, products, and everyday questions into useful content.",
        deliverables: [
          "Static posts and carousels",
          "Short-form video concepts and editing",
          "Captions and calls to action",
          "Product explainers and service education",
          "Founder-led and thought leadership content",
        ],
        when: "Useful when you have knowledge to share but need creative direction and production support.",
      },
      {
        title: "Social management",
        problem:
          "Content plans need a workable routine. We create an approval and publishing process that fits your team.",
        deliverables: [
          "Content scheduling and publishing",
          "Approval workflows",
          "Community response guidelines",
          "Community management where scoped",
          "Monthly reporting and content refinement",
        ],
        when: "Useful when regular publishing is competing with the day-to-day running of the business.",
      },
      {
        title: "Launches & campaigns",
        problem:
          "A launch needs a connected story, not a single announcement. We plan a sequence that gives people context and a clear next step.",
        deliverables: [
          "Business and product launch campaigns",
          "Seasonal promotions",
          "Campaign creative and content series",
          "Coordination with landing pages and paid campaigns",
        ],
        when: "Useful for a product release, a new service, or a time-bound promotion.",
      },
    ],
    note: "Channel choice follows audience fit. LinkedIn may suit a technology business; Instagram or Facebook may suit a local service. Organic strategy and management are distinct from paid social advertising, which is scoped separately.",
  },
  {
    slug: "digital-marketing",
    number: "03",
    stage: "Action",
    title: "Digital marketing",
    short: "Connect discovery to a meaningful next step. Learn what works.",
    headline: "Turn being found into moving forward.",
    intro:
      "Connect search, advertising, content, and conversion around the way people choose your business. Start with a clear question, make the path measurable, and improve with evidence.",
    groups: [
      {
        title: "Search engine optimization",
        problem:
          "Useful pages can be hard to discover. We address the technical and content foundations that help search engines and people understand your site.",
        deliverables: [
          "Technical SEO audits",
          "On-page optimization",
          "Keyword and search intent research",
          "Site structure and internal linking",
          "Content planning and optimization",
          "Search performance reporting",
        ],
        when: "Useful when organic search is an important route to your services or product.",
      },
      {
        title: "Local search",
        problem:
          "Nearby customers need accurate information and clear service coverage. We help connect local discovery with a relevant website experience.",
        deliverables: [
          "Google Business Profile optimization",
          "Business information consistency",
          "Service area and location page strategy",
          "Review request workflows",
          "Local visibility measurement",
        ],
        when: "Useful for eligible businesses serving defined locations or service areas.",
      },
      {
        title: "Paid search",
        problem:
          "A click is only the start. We align search intent, ad messaging, and the landing page so people can take a relevant next step.",
        deliverables: [
          "Search campaign strategy and setup",
          "Keyword targeting and negative keywords",
          "Ad copy and creative testing",
          "Dedicated campaign landing pages",
          "Conversion tracking and ongoing optimization",
        ],
        when: "Useful when there is existing search demand and a budget to test how it converts.",
      },
      {
        title: "Paid social",
        problem:
          "An ad needs a useful offer and a coherent destination. We connect creative, audience choices, and landing pages around a defined objective.",
        deliverables: [
          "Campaign planning",
          "Audience strategy",
          "Ad creative and messaging",
          "Landing page alignment",
          "Retargeting where appropriate and consented",
          "Campaign reporting",
        ],
        when: "Useful when your offer can be introduced to a relevant audience through a deliberate creative test.",
      },
      {
        title: "Content & email",
        problem:
          "People rarely decide on the first visit. We create content that answers questions and helps interested prospects continue the conversation.",
        deliverables: [
          "Website and landing page copy",
          "Search-informed articles",
          "Case study development",
          "Lead magnet planning",
          "Welcome and lead nurturing email sequences",
          "Campaign email content",
        ],
        when: "Useful when prospects need education, evidence, or follow-up before they are ready.",
      },
      {
        title: "Conversion & measurement",
        problem:
          "Traffic alone does not explain what is working. We look at the journey from visit to enquiry and make the important steps measurable.",
        deliverables: [
          "Website conversion reviews",
          "Form and landing page improvements",
          "Analytics implementation",
          "Event and enquiry tracking",
          "Testing plans and performance reporting",
        ],
        when: "Useful before scaling campaigns or when an existing website creates friction.",
      },
    ],
    note: "Advertising spend is separate from management fees. Search visibility takes time. Results depend on the business, market, budget, and implementation; rankings, revenue, lead volumes, and advertising returns are never guaranteed. Measurement and retargeting require an agreed consent approach.",
  },
];
export const process = [
  {
    title: "Share the brief",
    text: "Tell us about your business, the problem, and what you want to change. An early idea is enough to start.",
  },
  {
    title: "Clarify goals & scope",
    text: "Together, we work through priorities, audiences, content, technical needs, and what success should mean.",
  },
  {
    title: "Receive a tailored proposal",
    text: "Review the deliverables, responsibilities, investment, and milestones. We agree the scope before work begins.",
  },
  {
    title: "Design & build",
    text: "See the work at agreed checkpoints. You bring business expertise and consolidated feedback; we develop the experience.",
  },
  {
    title: "Review, launch & improve",
    text: "Check content, functionality, and the launch checklist together. Agree handover and any ongoing support or measurement.",
  },
];
export const faqs = [
  {
    q: "Do we need all three services?",
    a: "No. We start with the problem and scope the work around it. That may mean a website alone, a focused campaign, or a connected programme across several channels.",
  },
  {
    q: "How long will a project take?",
    a: "Timing depends on scope, content readiness, integrations, and review cycles. We propose milestones after discovery and agree responsibilities before work begins.",
  },
  {
    q: "What will you need from us?",
    a: "A clear point of contact, your business knowledge, access to relevant tools, and timely, consolidated feedback. We agree who supplies copy, images, brand assets, and approvals in the proposal. Content production can be included where needed.",
  },
  {
    q: "Can you work with our existing website?",
    a: "Yes. An audit helps establish what is worth keeping, which constraints matter, and whether focused improvements or a rebuild make more sense. Platform access and compatibility are checked first.",
  },
  {
    q: "What happens after launch?",
    a: "We agree a handover and any training, maintenance, content support, or campaign management you need. Ongoing work is scoped separately so responsibilities and costs stay clear.",
  },
];
export type CaseStudy = {
  id: string;
  name: string;
  type: string;
  label: string;
  brief: string;
  scope: string[];
  approach: string;
  deliverables: string[];
  imagery: string | null;
  verifiedOutcomes: string[];
};
export const caseStudies: CaseStudy[] = [
  {
    id: "fieldwork",
    name: "Fieldwork",
    type: "Local landscape studio",
    label: "Concept project",
    brief:
      "Imagine a landscape studio whose thoughtful work is hidden behind an unclear website. The brief: make its services tangible and the enquiry process straightforward.",
    scope: ["Website strategy", "Visual direction", "Enquiry journey"],
    approach:
      "A warm, editorial layout gives the work room to breathe. Clear service descriptions and a guided brief help a prospective client explain their space and priorities.",
    deliverables: [
      "Responsive homepage direction",
      "Service navigation",
      "Project enquiry interaction",
    ],
    imagery: null,
    verifiedOutcomes: [],
  },
  {
    id: "relay",
    name: "Relay",
    type: "Technology startup",
    label: "Concept project",
    brief:
      "Imagine a workflow product preparing to launch. The brief: explain how it connects a team’s decisions without overwhelming visitors with technical features.",
    scope: ["Product narrative", "Launch website", "Demo pathway"],
    approach:
      "A precise interface diagram makes an abstract product concrete. Benefit-led sections connect features to everyday tasks, with a clear invitation to explore the product.",
    deliverables: [
      "Product landing page direction",
      "Interface illustration",
      "Demo request pathway",
    ],
    imagery: null,
    verifiedOutcomes: [],
  },
];
