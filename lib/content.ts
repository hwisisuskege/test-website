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
    short: "Your own corner of the internet, shaped around what makes the business yours. Clear in its purpose. Considered in every detail.",
    headline: "An experience that could only be yours.",
    intro:
      "The way a page opens. The words that draw someone in. The confidence to take the next step. We plan, design, and build websites where those details work together, from the first impression to the enquiry.",
    groups: [
      {
        title: "Strategy & website planning",
        problem:
          "Before a layout, there is a question: what does someone need to understand to choose you? We use that answer to decide the pages, the priorities, and the path through them.",
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
          "Your website should feel familiar to someone who knows your business and intriguing to someone who doesn’t. We find that expression through typography, image, space, and interaction.",
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
          "A prospective customer is deciding whether your work is right for their situation. We give your services, coverage, past projects, and enquiry journey the space and clarity to answer that question.",
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
          "You know every feature. Your visitor needs to see the difference the product could make in their day. We build the narrative from that point of view, then open up the detail at the right moment.",
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
          "The finished experience needs to carry the design’s intent and fit into the business behind it. We build responsive interfaces, editable content, and the connections that make the handoffs work.",
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
          "Care continues after the first visit and after launch. We look at loading speed, accessibility, search foundations, and the small improvements that keep a website comfortable to use.",
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
      "A recognisable voice, a considered rhythm, and ideas worth returning to. Content that sounds like you and makes sense to your audience.",
    headline: "Something worth coming back to.",
    intro:
      "One post introduces you. The next builds on the impression. We develop the ideas, visual language, and publishing rhythm that make your social presence feel like a continuing conversation.",
    groups: [
      {
        title: "Social strategy",
        problem:
          "Start with the person on the other side of the screen: what interests them, what they need to understand, and where they spend time. Those choices give every post a reason to exist.",
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
          "A profile is often the first introduction. We bring the bio, imagery, and essential information into focus so your selected channels feel like parts of the same business.",
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
          "There is a story in how you work, what your product changes, and the questions customers ask. We turn that material into posts, films, and explainers with a clear point of view.",
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
          "A consistent presence needs a process people can actually keep up with. We agree a publishing rhythm, an approval routine, and clear responsibilities for the conversations that follow.",
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
          "A launch unfolds over time: a first hint, a reason to care, an invitation to take part. We shape the content sequence and connect it to the pages and campaigns supporting the launch.",
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
    short: "Meet people at the moment of interest. Connect the search, the message, and the destination, then learn from what follows.",
    headline: "Be there when it matters.",
    intro:
      "Someone is looking for an answer, weighing an option, or ready to act. We connect search, advertising, content, and measurement around those moments, with a clear reason for every campaign and a considered place for every click to land.",
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
    text: "Tell us what you’re building and what you want to change. A rough idea, an existing website, or a clear brief gives us somewhere to start.",
  },
  {
    title: "Clarify goals & scope",
    text: "We ask about your customers, your ambitions, and the practical constraints. Together, we decide what the work needs to do and what deserves attention first.",
  },
  {
    title: "Receive a tailored proposal",
    text: "You receive a proposal with a defined scope, deliverables, investment, and milestones. Content responsibilities and approvals are agreed before the work begins.",
  },
  {
    title: "Design & build",
    text: "We share the direction and develop it through agreed review points. You bring business knowledge and consolidated feedback; we bring the design and technical craft.",
  },
  {
    title: "Review, launch & improve",
    text: "We check the details together, prepare the handover, and agree what happens next. Maintenance, measurement, and further development can continue as a separate scope.",
  },
];
export const faqs = [
  {
    q: "Do we need all three services?",
    a: "Only if they make sense for the project. A website, a focused campaign, or support with social content can each be a useful place to begin. We’ll work through the priorities with you before proposing a scope.",
  },
  {
    q: "How long will a project take?",
    a: "We’ll map out a realistic schedule once the scope is clear. The amount of content, technical work, and time needed for feedback all shape it. Milestones and responsibilities are agreed before the project starts.",
  },
  {
    q: "What will you need from us?",
    a: "Your knowledge of the business is the important part. We’ll also agree a point of contact, access to the relevant tools, and a way to collect feedback. The proposal makes clear who provides copy, imagery, and approvals; we can scope content production where you need support.",
  },
  {
    q: "Can you work with our existing website?",
    a: "Yes. We begin by looking at what is already there: the platform, the content, the experience, and the connections behind it. That gives us a basis for recommending considered improvements or a rebuild, with the tradeoffs explained.",
  },
  {
    q: "What happens after launch?",
    a: "We agree a handover and any training you need. If you’d like us to stay involved, maintenance, content, and campaign support can be scoped separately. You’ll know what is included and who is responsible for what.",
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
      "An imagined landscape studio creates spaces people want to spend time in. The challenge was to carry that feeling into a website while helping a prospective client understand the services and begin a conversation about their own space.",
    scope: ["Website strategy", "Visual direction", "Enquiry journey"],
    approach:
      "Warm stone, soft light, and generous space set the pace. The editorial direction lets the garden lead, then brings the visitor back to practical service information and a considered enquiry. The garden image is generated concept artwork, not a photograph of completed client work.",
    deliverables: [
      "Responsive homepage direction",
      "Service navigation",
      "Project enquiry interaction",
    ],
    imagery: "/images/fieldwork-garden.webp",
    verifiedOutcomes: [],
  },
  {
    id: "relay",
    name: "Relay",
    type: "Technology startup",
    label: "Concept project",
    brief:
      "An imagined collaboration product helps people turn scattered ideas into shared decisions. The brief was to make its value understandable before introducing the mechanics of the product.",
    scope: ["Product narrative", "Launch website", "Demo pathway"],
    approach:
      "A quiet visual system and a simple relationship diagram bring the story back to people working together. The narrative moves from an idea, to a shared direction, to a useful next step—giving a demo request a clear purpose.",
    deliverables: [
      "Product landing page direction",
      "Interface illustration",
      "Demo request pathway",
    ],
    imagery: null,
    verifiedOutcomes: [],
  },
];
