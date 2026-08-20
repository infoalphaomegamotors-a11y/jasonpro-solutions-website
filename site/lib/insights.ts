export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  sections: { heading: string; body: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "website-or-business-system",
    title: "Do You Need a Website or a Business System?",
    summary: "A practical way to distinguish a marketing website from an operational system before spending money on the wrong solution.",
    category: "SYSTEMS",
    readTime: "6 MIN READ",
    sections: [
      { heading: "START WITH THE JOB TO BE DONE", body: ["A website mainly helps people understand, trust and contact a business. A business system mainly helps people complete repeatable work: capture information, assign tasks, track progress, manage records, approve work or produce reports.", "The distinction matters because a polished website cannot repair an internal process that is fundamentally manual, fragmented or difficult to monitor."] },
      { heading: "WHEN A WEBSITE IS ENOUGH", body: ["A website is usually the right first investment when the business problem is visibility, credibility, information clarity, lead generation or product discovery.", "Typical signs include customers repeatedly asking what you do, poor mobile presentation, weak search visibility, an outdated brand impression or enquiries arriving without enough context."] },
      { heading: "WHEN YOU NEED A SYSTEM", body: ["A system becomes more appropriate when the same information is copied between spreadsheets, WhatsApp, email and paper; when several people need the same status information; or when delays happen because nobody can see where work is stuck.", "Useful systems can be small. A focused client portal, application tracker, stock workflow or operations dashboard can create more value than a large platform that tries to automate everything at once."] },
      { heading: "A BETTER DECISION RULE", body: ["If the main problem happens before a customer contacts you, start by examining the website and customer journey. If the main problem happens after the enquiry arrives, map the operating process before choosing technology.", "JasonPro scopes both the external customer experience and the internal workflow so the recommendation can match the actual constraint rather than the most fashionable tool."] },
    ],
  },
  {
    slug: "what-makes-a-business-website-convert",
    title: "What Makes a Business Website Actually Convert?",
    summary: "Conversion is usually the result of clarity, proof and reduced friction—not decorative effects or a larger number of sections.",
    category: "WEB DESIGN",
    readTime: "5 MIN READ",
    sections: [
      { heading: "CLARITY BEFORE CREATIVITY", body: ["A visitor should understand what the business does, who it helps and what action to take without decoding the design. Strong typography and visual direction matter, but they should strengthen the offer instead of competing with it."] },
      { heading: "PROOF HAS TO BE SPECIFIC", body: ["Screenshots, real work, process examples, deliverables and verified outcomes are more persuasive than generic claims such as innovative, world-class or best quality.", "When measurable outcomes are not available, show the actual thinking and execution. Credibility should never depend on invented metrics."] },
      { heading: "REDUCE DECISION FRICTION", body: ["Too many equal calls-to-action create hesitation. Most service websites need one primary conversion path and a smaller number of clearly differentiated alternatives for users at different stages of readiness."] },
      { heading: "MEASURE THE WHOLE FUNNEL", body: ["A useful website measurement plan looks beyond page views. Track whether qualified visitors reach service pages, view proof, begin an enquiry and submit enough information for the business to respond efficiently."] },
    ],
  },
  {
    slug: "when-to-automate-a-business-process",
    title: "When Should an SME Automate a Business Process?",
    summary: "Automate stable, repetitive work with a clear failure cost. Do not automate confusion.",
    category: "AUTOMATION",
    readTime: "6 MIN READ",
    sections: [
      { heading: "AUTOMATION IS NOT THE FIRST STEP", body: ["Before automating a workflow, document what happens today. Identify the trigger, the people involved, the information required, the decisions made and the point where delays or defects occur.", "Automating an unstable process can make errors happen faster and make the underlying problem harder to see."] },
      { heading: "GOOD AUTOMATION CANDIDATES", body: ["Look for tasks that occur frequently, follow consistent rules, consume administrative time and create a measurable consequence when they are missed.", "Examples include lead routing, recurring document preparation, status notifications, approval reminders, structured data capture and management reporting."] },
      { heading: "KEEP HUMANS AT HIGH-RISK DECISIONS", body: ["Automation should prepare information and remove repetitive work, but consequential decisions often need a deliberate human review step. The workflow should make that control visible rather than pretending the process is fully autonomous."] },
      { heading: "DEFINE SUCCESS BEFORE BUILDING", body: ["Useful measures include cycle time, handoff delays, number of manual data entries, error rate and time spent producing the same report. If no improvement can be observed after implementation, the automation has not demonstrated value."] },
    ],
  },
  {
    slug: "professional-brand-identity-system",
    title: "What Should a Professional Brand Identity Include?",
    summary: "A logo is one asset. A usable identity is a repeatable system for recognition and consistent communication.",
    category: "BRANDING",
    readTime: "5 MIN READ",
    sections: [
      { heading: "THE LOGO IS ONLY THE START", body: ["A professional identity normally needs primary and secondary marks, spacing rules, colour specifications, typography and examples that show how the system behaves across real applications."] },
      { heading: "DESIGN FOR THE OUTPUT", body: ["An identity has to survive small social-media avatars, invoices, large signage, embroidery, print, web interfaces and low-cost production methods. A mark that only works in a presentation mockup is not yet a robust business asset."] },
      { heading: "BUILD REPEATABILITY", body: ["Templates for common communications reduce variation. Social graphics, quotations, presentations, stationery and campaign material should feel related without becoming identical."] },
      { heading: "TEST RECOGNITION, NOT PERSONAL TASTE", body: ["Good identity decisions support distinction, legibility, relevance and consistent use. Personal preference matters, but it should not be the only evaluation criterion."] },
    ],
  },
  {
    slug: "better-project-brief",
    title: "How to Write a Better Website or Design Project Brief",
    summary: "A useful brief reduces quotation delays, rework and assumptions by defining the problem before prescribing the output.",
    category: "PROJECT PLANNING",
    readTime: "5 MIN READ",
    sections: [
      { heading: "DESCRIBE THE PROBLEM", body: ["Explain what is happening today and why it is no longer acceptable. This gives the designer or developer a decision context instead of a list of disconnected features."] },
      { heading: "DEFINE THE OUTCOME", body: ["Describe what users should be able to understand or do when the project is complete. Outcomes are more useful than vague instructions such as make it modern or add AI."] },
      { heading: "LIST KNOWN CONSTRAINTS", body: ["Include deadlines, existing systems, required integrations, content availability, production specifications and budget context. Constraints discovered late are a common source of rework."] },
      { heading: "SEPARATE MUST-HAVES FROM IDEAS", body: ["Mark genuinely required functionality separately from features that are still being explored. This makes it easier to scope a first release and prevents optional ideas from quietly becoming mandatory work."] },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
