export type ResourceSection = {
  title: string;
  body: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { columns: string[]; rows: string[][] };
};
export type Resource = {
  slug: string;
  kind: "case-studies" | "blog" | "events";
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt?: string;
  fallbackImage?: string;
  label: string;
  sections: ResourceSection[];
  notice?: string;
  author?: string;
  readMinutes?: number;
  featured?: boolean;
  takeaways?: string[];
  metrics?: { value: string; label: string }[];
  supportingImages?: {
    image: string;
    fallbackImage: string;
    imageAlt: string;
  }[];
  date?: string;
  end?: string;
  location?: string;
};
export const resources: Resource[] = [
  {
    slug: "safer-autonomous-mobility",
    kind: "case-studies",
    category: "Autonomous systems",
    title: "From a promising driving model to a measurable safety workflow.",
    summary:
      "An urban-mobility scenario showing how simulation, data quality, and disciplined release gates can make an autonomy program easier to evaluate.",
    image: "/images/editorial/autonomous-mobility.jpg",
    imageAlt:
      "Autonomous vehicle visualizing pedestrians and its planned route",
    fallbackImage: "/images/how-we-help-globe.jpg",
    sections: [
      {
        title: "A better model was not the whole problem",
        body: "In this fictional engagement, Harbor Mobility was preparing a supervised shuttle pilot across two urban routes. The perception model performed well on a curated dataset, but the engineering team could not connect that result to the situations a vehicle would encounter on a wet evening, at a busy crossing, or during a construction diversion.",
        paragraphs: [
          "The initial backlog mixed ordinary software defects with safety-relevant observations. Reviewers relied on clips selected by individual engineers, so repeated failures were easy to miss. We framed the work around an operational design domain: the specific routes, conditions, speeds, and supervision arrangements in which the pilot would be evaluated.",
        ],
      },
      {
        title: "Build a scenario inventory before expanding the pilot",
        body: "The first workstream organized recorded journeys into conditions rather than folders. Each scenario carried route context, lighting, weather, object visibility, and the expected behavior. Rare situations were deliberately retained in the evaluation set instead of disappearing into aggregate averages.",
        paragraphs: [
          "A separate regression suite replayed the same cases after every model or planning change. Simulation supplemented recorded evidence, but it did not replace controlled physical testing. A simulator can expose failures in a known model of the world; it cannot establish that every assumption about the real world is correct.",
        ],
        bullets: [
          "Define the pilot boundaries and explicit conditions that require a safe stop.",
          "Version datasets, labels, evaluation code, and model artifacts together.",
          "Route safety-relevant observations to reviewers with named ownership.",
          "Keep physical verification and human supervision separate from ordinary release automation.",
        ],
      },
      {
        title: "Connect engineering changes to release decisions",
        body: "We introduced a release review with three distinct questions: did the change improve the intended behavior, did it regress another scenario, and is there enough evidence to operate within the pilot boundaries? A higher average detection score did not automatically answer any of those questions.",
        paragraphs: [
          "Reviewers received a compact evidence pack: the change description, affected scenarios, evaluation results, unresolved exceptions, and the rollback procedure. A model remained eligible for investigation without being eligible for deployment. That distinction gave engineers room to experiment without widening the pilot prematurely.",
        ],
      },
      {
        title: "Illustrative results from a 12-week program",
        body: "The invented figures below describe what the scenario team measured. They compare the same evaluation workflow before and after tooling changes; they are not a public-road safety certification or a real customer report.",
        paragraphs: [],
        table: {
          columns: [
            "Workflow measure",
            "Scenario baseline",
            "Scenario outcome",
          ],
          rows: [
            [
              "Review time for a regression batch",
              "2.5 working days",
              "0.8 working days",
            ],
            ["Recorded cases with complete context", "61%", "96%"],
            [
              "Manual preparation of release evidence",
              "9 hours per release",
              "3 hours per release",
            ],
            ["Pilot operating scope", "Two supervised routes", "Unchanged"],
          ],
        },
      },
      {
        title: "What an engineering leader can take away",
        body: "Treat evaluation as a product with users, interfaces, and ownership. The work is valuable even when a pilot does not expand, because it makes uncertainty visible and shortens the path from an observation to a reproducible engineering task.",
        paragraphs: [
          "For China-based teams working with global partners, this also requires clear data-location decisions and a shared vocabulary for scenario review. Route recordings, vehicle identifiers, and location traces should not be copied between environments casually. A well-structured evidence workflow makes collaboration possible without assuming that every team can access every dataset.",
        ],
      },
    ],
    metrics: [
      {
        value: "68%",
        label: "Less review time in the fictional scenario",
      },
      {
        value: "96%",
        label: "Scenario records with complete context",
      },
      {
        value: "12 weeks",
        label: "Illustrative delivery timeline",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative results from a 12-week program",
      "What an engineering leader can take away",
    ],
  },
  {
    slug: "factory-quality-at-the-edge",
    kind: "case-studies",
    category: "Industrial AI",
    title: "Giving quality inspectors a second pair of eyes.",
    summary:
      "A manufacturing example that combines edge vision, human review, and production context without handing quality decisions to an opaque model.",
    image: "/images/editorial/industrial-ai-operator.jpg",
    imageAlt:
      "Industrial operator reviewing AI-assisted production information",
    fallbackImage: "/images/how-we-help-delivery.jpg",
    sections: [
      {
        title: "The production-line challenge",
        body: "The fictional manufacturer Eastbridge Components operated four inspection stations for a family of metal housings. The defects that mattered were subtle: surface scratches, inconsistent finish, and misalignment near a fastening point. Camera angle and reflected light made a single model score difficult to interpret.",
        paragraphs: [
          "Operators already understood these variations, but that expertise lived in shift conversations. A rejected component could be photographed differently by two inspectors, producing inconsistent labels and a weak training set. The first objective was to standardize observations, not automate rejection.",
        ],
      },
      {
        title: "Make the data match the inspection task",
        body: "We designed a capture protocol around stable lighting, camera position, and product identifiers. The dataset recorded the component variant, inspection station, and the defect category. A sample of normal components from every shift remained in the test set so the team could observe drift instead of evaluating only a clean laboratory subset.",
        paragraphs: [
          "A vision model ran near the inspection station, with a human-facing interface showing the region that triggered a flag. Operators could accept, correct, or escalate the suggestion. Corrections became reviewable labeling tasks; they did not immediately retrain the deployed model.",
        ],
      },
      {
        title: "Integrate with the line without creating a new failure mode",
        body: "The system was designed to degrade safely: a camera outage or unavailable inference service returned the station to the established manual process. A model exception was recorded as a technical issue rather than a product defect. Production controls remained separate from the analytics interface.",
        paragraphs: [
          "The release plan began in shadow mode, followed by assisted review on a single station. Only after false alarms and operator workload were understood did the scenario extend to other stations.",
        ],
        bullets: [
          "Keep production-line controls under the established safety process.",
          "Measure false positives separately for each component family.",
          "Provide a clear manual fallback and a supervisor escalation path.",
          "Review operator corrections before using them as training labels.",
        ],
      },
      {
        title: "An illustrative eight-week assisted pilot",
        body: "The invented evaluation used a fixed set of reviewed components and shift-level observations. The improvement describes a scenario, not a claim about a deployed Twinlink customer.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Before assistance", "After assistance"],
          rows: [
            [
              "Median review time per flagged component",
              "42 seconds",
              "26 seconds",
            ],
            ["Flags requiring supervisor escalation", "18%", "11%"],
            ["Inspection records linked to a batch", "73%", "98%"],
            ["Final acceptance decision", "Human inspector", "Human inspector"],
          ],
        },
      },
      {
        title: "The useful result was shared visibility",
        body: "Faster review mattered, but traceability was the more durable improvement. A supervisor could now distinguish a recurring manufacturing issue from a camera problem or a confusing model suggestion. That changed how the team prioritized corrective action.",
        paragraphs: [
          "The lesson is to include operator effort in the business case. A technically accurate model that creates more work at the station can reduce throughput. Design the human decision, the fallback, and the evidence trail together.",
        ],
      },
    ],
    metrics: [
      {
        value: "38%",
        label: "Shorter review time in the scenario",
      },
      {
        value: "98%",
        label: "Scenario records linked to a batch",
      },
      {
        value: "Human-led",
        label: "Final inspection decisions",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "An illustrative eight-week assisted pilot",
      "The useful result was shared visibility",
    ],
  },
  {
    slug: "maintenance-knowledge-search",
    kind: "case-studies",
    category: "Data platforms",
    title: "Turning maintenance documents into answers people can verify.",
    summary:
      "A retrieval example for a service organization with scattered manuals, inconsistent equipment names, and technicians who need evidence—not fluent guesses.",
    image: "/images/editorial/semantic-search.jpg",
    imageAlt:
      "Diagram comparing traditional, semantic, and language-model search",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "The information existed, but the answer did not",
        body: "The fictional service business Meridian Equipment supported multiple generations of industrial machinery. Manuals, change notices, and internal troubleshooting notes were stored in different systems. A technician searching for a fault code frequently found the right phrase in the wrong equipment revision.",
        paragraphs: [
          "The scenario goal was to reduce document-finding effort while preserving the technician’s judgment. It was not to let an assistant authorize maintenance work. Equipment isolation and safety procedures continued to follow the established operational process.",
        ],
      },
      {
        title: "Structure the corpus around equipment identity",
        body: "We first normalized equipment families, document revisions, and publication status. Superseded documents stayed discoverable for investigation but were excluded from ordinary answers unless explicitly requested. Every indexed passage retained a link to its source and the access rules attached to the document.",
        paragraphs: [
          "The search layer combined exact terms with semantic retrieval. Fault codes and part identifiers benefited from literal matching; descriptions such as “intermittent vibration after warm-up” benefited from semantic matching. The system merged these candidates, reranked them, and presented a small set of inspectable sources.",
        ],
      },
      {
        title: "An assistant that can say there is not enough evidence",
        body: "A response had to identify the relevant equipment revision and cite the passage behind its recommendation. If the sources disagreed or the equipment identity was missing, the assistant asked for clarification instead of composing a complete-looking procedure.",
        paragraphs: [
          "We created a reviewed question set covering ordinary lookups, outdated manuals, ambiguous component names, and permission boundaries. The same set was rerun after ingestion changes, prompt changes, and model upgrades.",
        ],
        bullets: [
          "Test search relevance separately from answer quality.",
          "Preserve document-level authorization during indexing and retrieval.",
          "Return source passages with equipment and revision context.",
          "Include missing and contradictory evidence in the evaluation set.",
        ],
      },
      {
        title: "Illustrative outcomes, with a stable question set",
        body: "These invented measurements compare 240 reviewed questions in the scenario. A supported answer means the cited source answered the question for the correct equipment revision; it does not mean a maintenance action was independently safe.",
        paragraphs: [],
        table: {
          columns: [
            "Measure",
            "Keyword-only workflow",
            "Hybrid retrieval workflow",
          ],
          rows: [
            [
              "Median time to locate a relevant source",
              "6.0 minutes",
              "2.1 minutes",
            ],
            ["Questions with a supported first result", "64%", "88%"],
            [
              "Answers showing a revision reference",
              "Not systematically recorded",
              "100%",
            ],
            ["Assistant authority to execute maintenance", "None", "None"],
          ],
        },
      },
      {
        title: "A reusable pattern for knowledge-heavy operations",
        body: "The architecture is useful wherever information has versions, owners, and consequences: support, field service, compliance operations, or internal engineering. The difficult work is usually source hygiene and evaluation, not the final chat interface.",
        paragraphs: [
          "The scenario handover included ingestion ownership, source-correction procedures, and a weekly review of unanswered questions. That keeps a search service useful after the initial launch rather than turning it into a polished interface over an aging corpus.",
        ],
      },
    ],
    metrics: [
      {
        value: "65%",
        label: "Less source-finding time in the scenario",
      },
      {
        value: "240",
        label: "Illustrative evaluation questions",
      },
      {
        value: "88%",
        label: "Supported first results in the scenario",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative outcomes, with a stable question set",
      "A reusable pattern for knowledge-heavy operations",
    ],
  },
  {
    slug: "controlled-ai-service-desk",
    kind: "case-studies",
    category: "Enterprise AI",
    title:
      "An AI service desk with a clear boundary between advice and action.",
    summary:
      "A business-operations scenario that connects retrieval, permission checks, and human approval to support-ticket triage.",
    image: "/images/editorial/ai-operations-agent.jpg",
    imageAlt: "AI assistant operating in a technical environment",
    fallbackImage: "/images/our-people-hologram.jpg",
    sections: [
      {
        title: "The queue was full of small, repeated decisions",
        body: "The fictional company Northfield Services had a support desk handling account questions, access requests, and operational exceptions. Staff spent much of each shift finding policy, summarizing ticket histories, and assigning the right owner. The organization wanted assistance without granting a model general administrative access.",
        paragraphs: [
          "We divided the workflow into low-risk information tasks and consequential actions. Summarizing a ticket is different from changing a user’s access. Both might appear in the same conversation, but they should not share the same authorization pathway.",
        ],
      },
      {
        title: "Separate reasoning from execution",
        body: "The assistant could retrieve approved support material, suggest a category, and draft a response. Any action request was translated into a structured proposal with an explicit target, the requesting identity, and the policy that allowed it. A conventional authorization service validated the proposal before execution.",
        paragraphs: [
          "For sensitive changes, a staff member reviewed the proposed action. Approval applied only to that action and expired if the request changed. A model’s persuasive explanation did not override the policy check or broaden a credential’s scope.",
        ],
      },
      {
        title: "Design for retries and exceptions",
        body: "Support tools sometimes return partial results or timeout after accepting a request. We attached idempotency keys to executable operations and recorded the outcome in a transaction log. The assistant checked that log before proposing a retry.",
        paragraphs: [
          "When the workflow could not determine whether an action had completed, it escalated to a human with the available evidence. It did not repeat the action simply because the conversational response looked incomplete.",
        ],
        bullets: [
          "Retrieve policy using the current user’s allowed scope.",
          "Validate tool arguments against a schema and independent policy.",
          "Require explicit approval for consequential changes.",
          "Record identity, target, approval, and result in a searchable audit trail.",
        ],
      },
      {
        title: "Illustrative results from the assisted workflow",
        body: "The scenario figures cover a fixed set of ordinary support categories. They are invented outcomes for explaining the design and do not represent Twinlink’s current support volume.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Scenario baseline", "Scenario outcome"],
          rows: [
            ["Median first-triage time", "11 minutes", "6 minutes"],
            ["Tickets returned for incorrect routing", "14%", "7%"],
            ["Executable changes with an audit record", "82%", "100%"],
            [
              "Sensitive access changes without human approval",
              "Not permitted",
              "Not permitted",
            ],
          ],
        },
      },
      {
        title: "Why this pattern is useful for operations leaders",
        body: "The business value comes from removing repeated searching and formatting while keeping control over actions. An assistant can be helpful even when it is not autonomous. In fact, a narrow and auditable workflow often earns wider adoption than a general agent with unclear authority.",
        paragraphs: [
          "A practical handover includes a maintained tool inventory, an approval matrix, and a review of failure cases. The system should be evaluated as an operational service, with owners and rollback paths, rather than as a prompt that only one person understands.",
        ],
      },
    ],
    metrics: [
      {
        value: "45%",
        label: "Faster triage in the fictional scenario",
      },
      {
        value: "100%",
        label: "Scenario action audit coverage",
      },
      {
        value: "Scoped",
        label: "Action-specific approvals",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative results from the assisted workflow",
      "Why this pattern is useful for operations leaders",
    ],
  },
  {
    slug: "reliable-demand-planning",
    kind: "case-studies",
    category: "Business operations",
    title: "A demand-planning process that explains its own uncertainty.",
    summary:
      "A retail-operations example combining conventional forecasting, business rules, and a conversational explanation layer.",
    image: "/images/editorial/data-intelligence.jpg",
    imageAlt: "Connected data flows and analytics on a digital interface",
    fallbackImage: "/images/about-vision-ai.jpg",
    sections: [
      {
        title: "Better predictions were not enough",
        body: "The fictional retailer Willow Distribution planned replenishment across 36 product groups. Forecasts existed, but buyers often overrode them without a recorded reason. Promotions, supplier constraints, and product introductions were discussed in spreadsheets that never reached the evaluation pipeline.",
        paragraphs: [
          "The design objective was not to eliminate overrides. A buyer may know something the data does not. The objective was to make that information visible and compare decisions with the same baseline.",
        ],
      },
      {
        title: "Use the right model for the right task",
        body: "A forecasting pipeline generated demand estimates and prediction intervals from time-series inputs. Business rules applied minimum order quantities, lead times, and available storage capacity. A language model explained the resulting proposal using the structured inputs; it did not invent new demand numbers.",
        paragraphs: [
          "The buyer interface showed the forecast, the operational constraint, and the reason for any override. That created a shared decision record. Forecast evaluation stayed separate from the quality of the generated explanation.",
        ],
      },
      {
        title: "Evaluate at the decision horizon",
        body: "A forecast made one day before a shipment is not comparable to one made six weeks before a purchasing decision. We organized evaluation by lead-time horizon, product family, and promotion status. Stockout and waste measures were reviewed alongside forecast error.",
        paragraphs: [
          "The team also monitored when an explanation cited a factor that was not in the input. Those responses were rejected even if they sounded plausible. An explanation is useful only when it accurately represents the calculation and the available business context.",
        ],
      },
      {
        title: "Illustrative business outcomes",
        body: "The following invented results cover the same planning horizon and product groups. They illustrate why decision quality and traceability belong beside forecast accuracy.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Scenario baseline", "Scenario outcome"],
          rows: [
            [
              "Planning meeting preparation",
              "7 hours per cycle",
              "3 hours per cycle",
            ],
            ["Overrides with a recorded reason", "29%", "94%"],
            ["Weighted forecast error at the selected horizon", "24%", "19%"],
            ["Replenishment proposals reviewed by buyers", "100%", "100%"],
          ],
        },
      },
      {
        title: "A useful operating model for AI-assisted planning",
        body: "The scenario shows a layered approach: predictive models for numerical estimates, deterministic rules for business constraints, and generative models for explanation. Each layer has a different test and a different owner.",
        paragraphs: [
          "That separation makes disagreements easier to resolve. A buyer can challenge an assumption without rejecting the entire system, and an engineer can investigate a model issue without rewriting the purchasing policy. The result is a planning process that can improve through evidence rather than persuasion.",
        ],
      },
    ],
    metrics: [
      {
        value: "57%",
        label: "Less preparation time in the scenario",
      },
      {
        value: "94%",
        label: "Overrides with a recorded rationale",
      },
      {
        value: "36",
        label: "Fictional product groups evaluated",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative business outcomes",
      "A useful operating model for AI-assisted planning",
    ],
  },
  {
    slug: "modernizing-production-without-stopping-it",
    kind: "case-studies",
    category: "Industrial AI",
    title: "Modernizing production one dependable step at a time.",
    summary:
      "A brownfield manufacturing scenario where better telemetry and practical workflow changes come before ambitious automation.",
    image: "/images/editorial/industrial-modernization.jpg",
    imageAlt:
      "Comparison of an AI-enabled factory and traditional industrial operations",
    fallbackImage: "/images/how-we-help-delivery.jpg",
    sections: [
      {
        title: "An operating plant is not a blank canvas",
        body: "The fictional manufacturer Stonebridge Works had equipment from several generations, incomplete maintenance histories, and production targets that left little room for disruption. A proposed modernization program initially focused on a new dashboard, but the operational team could not trust several of the underlying signals.",
        paragraphs: [
          "We started by asking which decisions a better system should support: responding to recurring stoppages, identifying the right maintenance window, and understanding the difference between a machine fault and a material shortage. Each decision required a different set of evidence.",
        ],
      },
      {
        title: "Create a trustworthy baseline",
        body: "The first phase normalized machine identifiers, defined downtime categories, and reconciled shift notes with telemetry. A small set of read-only adapters captured signals without changing machine control. Where source quality was uncertain, the interface showed that uncertainty rather than replacing it with a precise-looking number.",
        paragraphs: [
          "Maintenance and production teams reviewed the baseline together. They found that some apparent machine faults were actually waiting time recorded under a generic code. Correcting that classification changed the proposed investment priorities before any predictive model was deployed.",
        ],
      },
      {
        title: "Pilot within an explicit operational boundary",
        body: "The scenario pilot covered one production cell and one recurring failure pattern. Alert thresholds were tested in shadow mode. Operators could mark an alert as useful, incorrect, or too late, and those categories remained separate in reporting.",
        paragraphs: [
          "No model controlled the machinery. Suggestions were reviewed through the existing maintenance process. The system’s role was to improve timing and context, not bypass the plant’s established safety practices.",
        ],
        bullets: [
          "Keep read-only analytics separate from machine-control networks.",
          "Include shift context and material availability in incident review.",
          "Test how alerts affect operator workload before expanding coverage.",
          "Document the fallback when a signal becomes unavailable.",
        ],
      },
      {
        title: "Illustrative performance of the first cell",
        body: "The invented results represent a single-cell scenario across a consistent observation window. They cannot establish what another plant would achieve.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Scenario baseline", "Scenario outcome"],
          rows: [
            ["Events assigned a specific downtime cause", "48%", "91%"],
            ["Weekly incident reconciliation", "5 hours", "1.5 hours"],
            ["Maintenance alerts judged actionable", "Not available", "76%"],
            ["Machine-control changes made by AI", "None", "None"],
          ],
        },
      },
      {
        title: "The modernization roadmap follows the evidence",
        body: "The next phase would expand only the signals and workflows that proved useful. A clear baseline lets leadership choose between maintenance, process, and equipment investments rather than treating every operational problem as an AI opportunity.",
        paragraphs: [
          "The case illustrates a repeatable principle: better decisions usually require a dependable data path and an accountable process before they require a more advanced model. That sequence makes modernization easier to operate and easier to explain to the people on the floor.",
        ],
      },
    ],
    metrics: [
      {
        value: "91%",
        label: "Scenario events with a specific cause",
      },
      {
        value: "70%",
        label: "Less reconciliation effort in the scenario",
      },
      {
        value: "Read-only",
        label: "Analytics integration boundary",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative performance of the first cell",
      "The modernization roadmap follows the evidence",
    ],
  },
  {
    slug: "vision-guided-cobot-pilot",
    kind: "case-studies",
    category: "Autonomous systems",
    title: "A collaborative robot pilot designed around the operator.",
    summary:
      "A workstation scenario combining vision, repeatable handling, and human-centered task design rather than assuming every motion should be automated.",
    image: "/images/editorial/collaborative-robot.jpg",
    imageAlt:
      "Collaborative robot demonstration with integrated vision systems",
    fallbackImage: "/images/our-people-hologram.jpg",
    sections: [
      {
        title: "The task looked repetitive, but the exceptions mattered",
        body: "The fictional assembly business Linden Devices wanted to assist operators with repetitive component positioning. Part presentation varied, the workstation space was limited, and experienced operators routinely corrected small alignment issues by feel. The team initially underestimated how much of the task depended on context.",
        paragraphs: [
          "We mapped the full sequence: presenting a part, checking its identity, positioning it, verifying alignment, and responding to exceptions. The pilot focused on the steps with repeatable inputs, while ambiguous or damaged components remained with a person.",
        ],
      },
      {
        title: "A vision system with an explicit rejection path",
        body: "The vision pipeline estimated part identity and pose, but only within the conditions covered by the evaluation set. Low confidence did not produce a best guess followed by motion. It produced a request for operator intervention.",
        paragraphs: [
          "The mechanical and safety design remained the responsibility of qualified specialists. Software evaluation was one input into the pilot review, not a substitute for risk assessment, protective measures, or validation of the workstation.",
        ],
      },
      {
        title: "Measure the whole workstation",
        body: "A robot’s motion time alone is an incomplete measure. We counted part presentation, operator corrections, recovery from a rejected observation, and the time required to switch component types. The assisted workflow had to be useful under ordinary variation, not only during a rehearsed demonstration.",
        paragraphs: [
          "Operators helped define the controls and the exception messages. A clear message such as “part identity not confirmed” was more useful than a model-confidence value without a suggested action.",
        ],
        bullets: [
          "Keep unrecognized parts out of the automated motion path.",
          "Evaluate changeovers and recovery time, not just successful cycles.",
          "Review ergonomics and exception handling with operators.",
          "Keep equipment safety validation independent from model accuracy.",
        ],
      },
      {
        title: "Illustrative results under controlled pilot conditions",
        body: "The following figures are invented scenario results. They describe supervised workstation trials and do not imply certification or a real industrial deployment.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Manual scenario", "Assisted scenario"],
          rows: [
            [
              "Median handling cycle, including exceptions",
              "74 seconds",
              "61 seconds",
            ],
            ["Operator corrections per 100 cycles", "17", "9"],
            [
              "Trials with complete exception records",
              "Not systematically recorded",
              "100%",
            ],
            ["Unrecognized components routed to a person", "100%", "100%"],
          ],
        },
      },
      {
        title: "A pilot should end with a decision, not just a demonstration",
        body: "The handover compared the assisted workflow with the current station and documented the conditions under which the pilot was useful. It included reasons not to expand yet, such as an untested component family or a slow changeover.",
        paragraphs: [
          "That gives leadership a basis for deciding what to automate next. The practical goal is a workstation that is easier for people to run, not a demonstration in which the robot completes a carefully prepared sequence.",
        ],
      },
    ],
    metrics: [
      {
        value: "18%",
        label: "Shorter cycle in the fictional scenario",
      },
      {
        value: "47%",
        label: "Fewer corrections in the scenario",
      },
      {
        value: "Supervised",
        label: "Pilot operating conditions",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative results under controlled pilot conditions",
      "A pilot should end with a decision, not just a demonstration",
    ],
  },
  {
    slug: "cross-border-product-operating-model",
    kind: "case-studies",
    category: "Business operations",
    title:
      "Connecting a China-based engineering team with global product decisions.",
    summary:
      "A delivery example showing how decision records, accountable ownership, and clearer discovery can reduce avoidable rework across regions.",
    image: "/images/editorial/engineering-team.jpg",
    imageAlt: "Engineers discussing a software design in an office",
    fallbackImage: "/images/about-culture-office.jpg",
    sections: [
      {
        title: "The delivery problem was mostly a decision problem",
        body: "In this fictional scenario, the product team at Cedar Systems worked with engineers in China and business stakeholders in two overseas regions. Teams shared a backlog, but requirements often arrived as conclusions without the customer context behind them. Engineers discovered conflicting priorities after implementation had started.",
        paragraphs: [
          "The organization did not need another status meeting. It needed a consistent way to explain a decision, record an assumption, and identify who could resolve a trade-off. We treated that operating model as part of product engineering.",
        ],
      },
      {
        title: "Make discovery legible to the whole team",
        body: "Every proposed feature began with a short problem statement, a user journey, and the evidence supporting the priority. Acceptance criteria included observable behavior and operational constraints. Engineers could challenge an assumption before it became a sprint commitment.",
        paragraphs: [
          "The team used a small daily overlap window for unresolved decisions. Routine status moved into a written update organized around outcomes, dependencies, and risks. Important changes were summarized for the people who could not attend live.",
        ],
      },
      {
        title: "Keep ownership with the outcome",
        body: "We assigned an accountable owner to each end-to-end workflow, while technical specialists remained responsible for their components. A feature was not complete merely because its code had merged. Support readiness, measurement, and a clear rollback were included in the release decision.",
        paragraphs: [
          "A lightweight decision log recorded what was chosen, what alternatives were considered, and when the decision should be revisited. This reduced repeated arguments and helped new team members understand the system without reconstructing months of chat.",
        ],
      },
      {
        title: "Illustrative results over two release cycles",
        body: "These invented measures cover the same feature classes before and after the operating-model change. They are intended to explain a measurement approach, not describe Twinlink staffing or customer performance.",
        paragraphs: [],
        table: {
          columns: ["Measure", "Scenario baseline", "Scenario outcome"],
          rows: [
            ["Stories reopened because of ambiguous acceptance", "21%", "10%"],
            [
              "Median unresolved-decision age",
              "6 working days",
              "2 working days",
            ],
            ["Releases with an agreed support owner", "58%", "100%"],
            [
              "Routine weekly status meeting time",
              "4.5 hours per lead",
              "2 hours per lead",
            ],
          ],
        },
      },
      {
        title: "The pattern scales through habits, not bureaucracy",
        body: "A useful operating model makes the next decision easier. It should not ask every contributor to maintain a large reporting system. The scenario team used a few shared artifacts consistently, then removed reports that did not change a decision.",
        paragraphs: [
          "For readers evaluating an engineering partner, ask how discovery, ownership, and handover work in practice. The answers often reveal more about delivery quality than a long list of technologies. A team should be able to show how it learns, not only how it writes code.",
        ],
      },
    ],
    metrics: [
      {
        value: "52%",
        label: "Less acceptance rework in the scenario",
      },
      {
        value: "2 days",
        label: "Scenario decision-resolution median",
      },
      {
        value: "100%",
        label: "Scenario releases with a support owner",
      },
    ],
    label: "Illustrative case study",
    notice:
      "This is a fictional engagement used to explain our delivery approach. Organizations, timelines, and outcome figures are invented scenario details, not verified Twinlink client results.",
    readMinutes: 3,
    takeaways: [
      "Illustrative results over two release cycles",
      "The pattern scales through habits, not bureaucracy",
    ],
  },
  {
    slug: "generative-ai-versus-predictive-ai",
    kind: "blog",
    category: "Enterprise AI",
    title: "Generative AI and predictive AI solve different business problems.",
    summary:
      "How to choose the right approach for forecasting, content, decision support, and automation—and why a hybrid design often works best.",
    image: "/images/editorial/generative-versus-traditional-ai.jpg",
    imageAlt: "Comparison of generative AI and traditional AI",
    fallbackImage: "/images/about-vision-ai.jpg",
    sections: [
      {
        title: "Begin with the output you actually need",
        body: "An organization asking for “an AI solution” has not yet specified a useful engineering problem. Does the workflow need a forecast, a category, a ranked list of options, or a draft that a person can revise? Those outputs require different evaluation methods and different failure controls.",
        paragraphs: [
          "Traditional predictive systems often estimate a defined outcome from structured inputs. Generative systems produce new text, images, or other content in response to context. Both can use modern machine-learning architectures, so the distinction is about the task rather than a simple divide between old and new technology.",
        ],
      },
      {
        title: "Prediction is valuable when the target is well defined",
        body: "Demand forecasting, anomaly detection, and defect classification have measurable targets. A model can be evaluated against observed outcomes using metrics appropriate to the decision. But even here, a better score does not automatically mean a better business result. The forecast horizon, cost of an error, and action taken on the prediction all matter.",
        paragraphs: [
          "A purchasing team may prefer a slightly less accurate forecast that exposes uncertainty and respects ordering constraints. A manufacturing team may value fewer disruptive false alarms more than a marginal improvement in average classification accuracy.",
        ],
      },
      {
        title: "Generation is valuable when expression and context matter",
        body: "Generative models can summarize long records, draft responses, and help users navigate knowledge. Their flexibility is useful, but it makes evaluation more complex. A fluent explanation can cite the wrong source or describe a factor that was not present in the input.",
        paragraphs: [
          "In a business workflow, define acceptable responses, missing-information behavior, and forbidden actions before choosing a model. If a response is used to justify a decision, the evidence behind it should remain accessible to the reader.",
        ],
        table: {
          columns: [
            "Business task",
            "Useful starting point",
            "What to evaluate",
          ],
          rows: [
            [
              "Weekly demand estimate",
              "Time-series or predictive model",
              "Error at the actual purchasing horizon",
            ],
            [
              "Support-ticket categorization",
              "Classification with business rules",
              "Routing errors and exception workload",
            ],
            [
              "Explaining a planning proposal",
              "Generative layer over structured inputs",
              "Faithfulness to the supplied calculation",
            ],
            [
              "Finding an equipment procedure",
              "Search and retrieval with sources",
              "Correct equipment revision and evidence",
            ],
          ],
        },
      },
      {
        title: "A practical hybrid architecture",
        body: "A hybrid design keeps numerical estimates and policy checks outside the language model. The model receives the result of a calculation or a retrieval step and turns it into a useful explanation. Actions pass through conventional authorization and validation before execution.",
        paragraphs: [
          "This creates testable boundaries. A team can investigate forecast quality without changing the assistant’s writing behavior, or improve a response template without altering the policy engine. Clear boundaries also make costs easier to attribute to a specific workflow.",
        ],
      },
      {
        title: "Questions to ask before funding a pilot",
        body: "The most useful pilot has a defined decision, an existing baseline, and a person who will use the output. Specify what happens when the system is uncertain and how a reviewer can correct it. A demonstration that only shows successful examples is not enough to support an operating decision.",
        paragraphs: [],
        bullets: [
          "What action becomes easier or more reliable if the output improves?",
          "Which errors are tolerable, and which need an escalation path?",
          "Can the team build a representative evaluation set from allowed data?",
          "Who owns the workflow after the initial engineering work is complete?",
          "Will the business value survive realistic inference and review costs?",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "A practical hybrid architecture",
      "Questions to ask before funding a pilot",
    ],
  },
  {
    slug: "just-in-time-trust-for-ai-agents",
    kind: "blog",
    category: "AI security",
    title: "AI agents need temporary authority, not permanent trust.",
    summary:
      "A practical guide to identity, least privilege, approval boundaries, and auditability when an assistant can use business tools.",
    image: "/images/editorial/just-in-time-trust.jpg",
    imageAlt:
      "Diagram of just-in-time trust and least-privilege access for agents",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "Tool access changes the risk of an assistant",
        body: "A model that explains a policy can be wrong in a way that a reader notices. A model that changes an account or submits an order can create consequences before anyone reads its explanation. That is why an agent’s authority should be designed independently from the quality of its reasoning.",
        paragraphs: [
          "Think of the model as a proposal generator. It can suggest what should happen, but a policy boundary decides whether the proposed action is permitted for the current user, target, and context. A natural-language instruction should not silently broaden that boundary.",
        ],
      },
      {
        title: "Define identity at every boundary",
        body: "The system should distinguish the person requesting work, the service invoking a tool, and the identity used by the downstream application. Collapsing these into one powerful service account makes it difficult to reason about access and difficult to investigate an incident.",
        paragraphs: [
          "Tool calls should carry structured context: the requester, the allowed operation, the intended resource, and an expiry where appropriate. Credentials remain with the execution service. They should not be copied into prompts or exposed as ordinary conversation context.",
        ],
      },
      {
        title: "Grant only the action that is currently justified",
        body: "Just-in-time access narrows both the duration and scope of authority. A reviewed request to update one account should not become permission to update every account. If an action changes after approval, the system should treat it as a new proposal.",
        paragraphs: [
          "Temporary credentials are useful only if the receiving system enforces their scope. A short-lived token that still grants broad administrative power leaves important risk unresolved. Authorization has to be enforced by the tool boundary, not by a model instruction to “be careful.”",
        ],
      },
      {
        title: "Treat retrieved text as untrusted input",
        body: "An assistant may read a document, ticket, or webpage containing instructions that conflict with the user’s request. That content is evidence to interpret, not a new authority to follow. Tool permissions should remain stable even if the retrieved text asks for a different action.",
        paragraphs: [
          "Evaluate the workflow with adversarial documents, malformed tool arguments, expired approvals, and ambiguous targets. A security test should exercise the execution boundary, not merely inspect whether the model produces reassuring language.",
        ],
        bullets: [
          "Allowlist tools and validate their arguments using explicit schemas.",
          "Require independent authorization for each consequential operation.",
          "Use action-specific approval, bounded credentials, and expiry.",
          "Keep retries idempotent and inspect prior execution results.",
          "Record requester, approval, resource, tool call, and outcome.",
        ],
      },
      {
        title: "Make the audit trail useful to an operator",
        body: "Logs are valuable when they answer a question. Who requested this change? Which policy allowed it? What did the tool actually return? Was the operation retried? A transcript alone often cannot answer these reliably.",
        paragraphs: [
          "An operations team should be able to pause a workflow, revoke access, and inspect incomplete actions without editing the model prompt. Those controls make an agent a manageable service. They also let a business start with a narrow workflow and expand only when the evidence supports it.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "Treat retrieved text as untrusted input",
      "Make the audit trail useful to an operator",
    ],
  },
  {
    slug: "semantic-search-before-another-chatbot",
    kind: "blog",
    category: "Data platforms",
    title: "Fix the search before building another chatbot.",
    summary:
      "How hybrid retrieval, source quality, and revision-aware indexing make business knowledge useful—and why a chat interface is the final layer.",
    image: "/images/editorial/semantic-search.jpg",
    imageAlt:
      "Diagram comparing traditional, semantic, and language-model search",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "The real problem is often document identity",
        body: "A knowledge assistant can look impressive while retrieving the wrong version of a procedure. Before selecting a model, define which sources are authoritative, which are superseded, and which users may read them. Search quality begins with these decisions.",
        paragraphs: [
          "For a China-based organization serving global teams, language and regional terminology add another layer. A product identifier may remain constant while a component name differs between teams. Preserve exact identifiers and build a deliberate mapping of accepted terms instead of expecting embeddings to solve every ambiguity.",
        ],
      },
      {
        title: "Combine literal and semantic signals",
        body: "Literal matching is strong for codes, names, and exact phrases. Semantic retrieval is useful when a user describes a concept differently from the source. A hybrid pipeline combines both, then reranks candidates using the actual question and source context.",
        paragraphs: [
          "Chunking should respect the document’s meaning. A troubleshooting step separated from its warning or equipment revision can become misleading. Keep enough context to interpret the passage, and retain a stable link back to the original source.",
        ],
      },
      {
        title: "Evaluate retrieval before evaluating generated answers",
        body: "Build a question set with a known relevant source or a clear “not answerable” label. Check whether the correct material appears in the candidate list before measuring how well a model writes about it. This separates source-finding failures from generation failures.",
        paragraphs: [
          "Include permission boundaries and outdated material. A result can be topically relevant but still wrong for the user or equipment revision. Those cases are especially important because the answer may sound correct.",
        ],
      },
      {
        title: "Design the answer around evidence",
        body: "A useful answer identifies what it knows, shows the supporting passage, and preserves important qualifiers. If the available material is incomplete, the response should ask for the missing context or explain the limit. The goal is not to make every query produce a confident paragraph.",
        paragraphs: [
          "Let users open the source in a familiar system. A citation that points only to an internal chunk identifier is difficult to verify. Make correction easy as well: a user should be able to report an outdated source without becoming an AI engineer.",
        ],
      },
      {
        title: "A practical launch checklist",
        body: "A small corpus with clear ownership is a better first release than an indiscriminate index of everything the company has ever stored. Expand when ingestion, permissions, evaluation, and correction workflows are working together.",
        paragraphs: [],
        bullets: [
          "Identify authoritative sources and the owner of each collection.",
          "Preserve revision, equipment, region, and permission metadata.",
          "Evaluate exact-match and semantic queries separately.",
          "Show sources and retain a clear no-answer path.",
          "Monitor failed retrieval and document corrections after launch.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "Design the answer around evidence",
      "A practical launch checklist",
    ],
  },
  {
    slug: "industrial-ai-beyond-the-demo",
    kind: "blog",
    category: "Industrial AI",
    title: "Industrial AI has to work on the difficult shift.",
    summary:
      "What changes when a model leaves the demo and becomes part of an operator’s routine: lighting, latency, exceptions, maintenance, and trust.",
    image: "/images/editorial/industrial-modernization.jpg",
    imageAlt:
      "Comparison of an AI-enabled factory and traditional industrial operations",
    fallbackImage: "/images/how-we-help-delivery.jpg",
    sections: [
      {
        title: "The demonstration is a controlled environment",
        body: "A factory demo typically uses clean parts, consistent lighting, and a prepared task. A production line includes changeovers, worn fixtures, network outages, unfamiliar operators, and pressure to recover quickly. A model’s usefulness depends on how the workflow handles these ordinary variations.",
        paragraphs: [
          "Begin by naming the operational decision: flag a suspected defect, prioritize an inspection, or suggest a maintenance review. Avoid assigning authority through an attractive interface. The people responsible for the process should understand exactly what the system may and may not do.",
        ],
      },
      {
        title: "Evaluate the full decision path",
        body: "Measure capture quality, inference latency, false alarms, and the effort required to respond. A precise model can still produce a poor workflow if every alert interrupts an operator or if a delayed result arrives after the relevant component has moved on.",
        paragraphs: [
          "A representative test set should cover product variants and shifts. Keep failure categories separate. A blurred image, an unfamiliar part, and a valid defect should not all appear as a single “low confidence” statistic.",
        ],
      },
      {
        title: "Fallback is part of the product",
        body: "The system needs a clear behavior when the camera, network, or inference service fails. Often the right response is to return to an established manual procedure and record the technical exception. The fallback should be rehearsed and visible, not hidden in a maintenance document.",
        paragraphs: [
          "For systems near physical equipment, separate analytics from control. Safety-related design and validation require qualified domain expertise. A software evaluation score does not replace that process.",
        ],
      },
      {
        title: "Ownership extends beyond the first model",
        body: "Someone must own camera calibration, source changes, labeling quality, evaluation runs, and incident review. These responsibilities should be explicit before a pilot expands. Otherwise small changes accumulate until the deployed system no longer resembles the one that was tested.",
        paragraphs: [
          "Operator feedback is valuable, but it should enter a review workflow. Automatically treating every correction as ground truth can amplify inconsistency or accidental mistakes. Label review and release review serve different purposes.",
        ],
      },
      {
        title: "Choose expansion criteria that operators recognize",
        body: "Ask whether the pilot reduced a real burden, whether alerts arrived in time, and whether recovery was straightforward. Include the reasons to pause as well as the reasons to continue. A useful pilot leaves the organization better able to decide, even when it does not lead to more automation.",
        paragraphs: [],
        bullets: [
          "Observe at least the important shift and product variations.",
          "Measure review effort and recovery time alongside model performance.",
          "Provide a simple, tested manual fallback.",
          "Assign ownership for data capture, corrections, and releases.",
          "Expand by demonstrated workflow value rather than visual impact.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "Ownership extends beyond the first model",
      "Choose expansion criteria that operators recognize",
    ],
  },
  {
    slug: "buying-ai-tools-on-total-cost",
    kind: "blog",
    category: "Business operations",
    title: "Free or paid AI tools? Start with the cost of the workflow.",
    summary:
      "A business buyer’s guide to evaluating image-generation and productivity tools beyond the price on the subscription page.",
    image: "/images/editorial/ai-image-tools.jpg",
    imageAlt: "Comparison of free and paid AI image-generation tools",
    fallbackImage: "/images/our-people-hologram.jpg",
    sections: [
      {
        title: "A subscription price is not a business case",
        body: "A free tool may be useful for exploration, while a paid tool may provide controls that matter to a team. Neither label tells you whether the workflow is valuable. Count the time spent preparing inputs, reviewing outputs, correcting mistakes, and moving assets between systems.",
        paragraphs: [
          "For image-generation tools, distinguish ideation from publishable production. A concept image can help a team discuss direction, but final assets may require consistent dimensions, accessible descriptions, brand review, and documented usage rights.",
        ],
      },
      {
        title: "Evaluate a repeatable set of tasks",
        body: "Choose several representative tasks and run the same brief through each candidate tool. Record what a reviewer had to change, how long the complete task took, and whether the result met the intended use. Do not compare a polished sample from one tool with a single first attempt from another.",
        paragraphs: [
          "Include awkward cases: a requested layout with text, a series that needs visual consistency, and an export that must fit a specific format. These often reveal the gap between an attractive image and a useful asset.",
        ],
      },
      {
        title: "Model the full monthly cost",
        body: "The following is an invented budgeting example for explaining a calculation, not a comparison of actual vendor pricing. Suppose a team needs 80 approved assets a month. Tool A costs nothing but requires 18 minutes of review per asset. Tool B costs a hypothetical 300 currency units per month and requires 10 minutes of review.",
        paragraphs: [
          "At a hypothetical internal review cost of 1 currency unit per minute, Tool A’s review cost is 1,440 units and Tool B’s combined subscription-plus-review cost is 1,100 units. That does not make Tool B universally better; it shows why the decision changes when human effort is included.",
        ],
        table: {
          columns: ["Illustrative input", "Tool A", "Tool B"],
          rows: [
            ["Monthly subscription", "0 units", "300 units"],
            ["Approved assets", "80", "80"],
            ["Review minutes per asset", "18", "10"],
            ["Total modeled monthly cost", "1,440 units", "1,100 units"],
          ],
        },
      },
      {
        title: "Check controls before scaling use",
        body: "A procurement review should examine data handling, account administration, export options, service limits, and the terms governing the intended output. Confirm these against current vendor documentation rather than relying on a comparison graphic or a remembered feature list.",
        paragraphs: [
          "Teams also need a simple policy for sensitive inputs. A tool can be suitable for public creative work and unsuitable for customer records. Treat those as separate use cases, with different approval requirements.",
        ],
      },
      {
        title: "Buy a workflow improvement",
        body: "The decision should identify an owner, a baseline, and a review date. A short pilot can establish whether a subscription saves effort or merely changes where effort appears. Make it easy to stop using a tool that does not meet the agreed target.",
        paragraphs: [],
        bullets: [
          "Measure complete task time, not generation time alone.",
          "Compare the same briefs and approval criteria.",
          "Include human review and rework in the cost model.",
          "Verify current terms and controls for the intended use.",
          "Review the decision after a realistic period of team use.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "Check controls before scaling use",
      "Buy a workflow improvement",
    ],
  },
  {
    slug: "ai-detectors-and-editorial-quality",
    kind: "blog",
    category: "Enterprise AI",
    title: "AI detectors cannot replace editorial judgment.",
    summary:
      "A practical approach to reviewing business content for accuracy, originality, useful evidence, and a voice readers can trust.",
    image: "/images/editorial/ai-content-detection.jpg",
    imageAlt: "Illustration of an AI-content detector and a concerned writer",
    fallbackImage: "/images/about-culture-office.jpg",
    sections: [
      {
        title: "Detection and quality are different questions",
        body: "A detector attempts to estimate how text was produced. An editor asks whether the text is accurate, useful, and appropriate for the reader. These questions overlap less than many teams assume. A human-written paragraph can be misleading; an assisted draft can be accurate after careful review.",
        paragraphs: [
          "A detector score should not be treated as proof of authorship or as a substitute for evidence. Language, editing style, and the type of material can affect a classifier’s behavior. The consequences of a false accusation can be serious, especially in academic or employment settings.",
        ],
      },
      {
        title: "Review claims before reviewing style",
        body: "Mark statements that depend on evidence: customer outcomes, numerical results, dates, certifications, and statements about a company’s current operations. Check each against a source that the reviewer can inspect. If a figure is invented for a teaching example, label it as such in the article.",
        paragraphs: [
          "A polished tone does not make a claim more reliable. In company publishing, an unverified customer result is particularly risky because a reader may use it to evaluate a supplier. Keep fictional scenarios distinct from verified case studies.",
        ],
      },
      {
        title: "Use assisted drafting where it helps",
        body: "AI can help organize notes, suggest an outline, or explain a concept at different levels of detail. The author still owns the factual assertions and the final interpretation. A useful workflow preserves the source material and makes meaningful edits visible to reviewers.",
        paragraphs: [
          "For internal material, check whether the selected tool is approved for the inputs. An editorial assistant should not receive confidential customer records simply because the output will eventually be public.",
        ],
      },
      {
        title: "An editorial checklist that improves the article",
        body: "Review an article from the reader’s perspective. Does it explain the problem? Does it distinguish an example from a general rule? Can a reader apply the advice? Is a claimed result connected to a measurement method? These questions improve usefulness regardless of how the first draft was produced.",
        paragraphs: [],
        bullets: [
          "Verify named clients, numbers, dates, and company-status claims.",
          "Label hypothetical calculations and fictional outcomes clearly.",
          "Explain the boundary conditions of technical advice.",
          "Check quotations and citations against the original material.",
          "Remove repetition and unsupported certainty instead of chasing a detector score.",
        ],
      },
      {
        title: "Build trust through accountable publishing",
        body: "An organization should know who approved an article and how corrections are handled. That ownership matters more than an assurance that no assistance was used. Readers benefit from clear examples, inspectable evidence, and a willingness to correct mistakes.",
        paragraphs: [
          "For Twinlink’s public resource library, the useful standard is straightforward: publish practical technical perspectives, identify illustrative engagements, and distinguish proposed programs from confirmed events. That gives readers a fair basis for learning about the approach without mistaking an example for current operational history.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "An editorial checklist that improves the article",
      "Build trust through accountable publishing",
    ],
  },
  {
    slug: "the-engineering-skills-ai-does-not-replace",
    supportingImages: [
      {
        image: "/images/editorial/collaborative-software-engineering.jpg",
        fallbackImage: "/images/hero-team-office.jpg",
        imageAlt: "Software engineers collaborating around digital displays",
      },
    ],
    kind: "blog",
    category: "People & delivery",
    title: "The engineering skills that make AI useful.",
    summary:
      "Why data scientists and software teams still need evaluation, system design, domain understanding, and clear communication alongside generative AI tools.",
    image: "/images/editorial/generative-ai-learning.jpg",
    imageAlt:
      "Editorial graphic about generative AI learning for data scientists",
    fallbackImage: "/images/about-vision-ai.jpg",
    sections: [
      {
        title: "Generating output is only one part of engineering",
        body: "AI tools can draft code, summarize material, and accelerate exploration. The difficult work still includes deciding what should be built, recognizing an incorrect assumption, and understanding how a system behaves when something fails. A team becomes stronger when assistance improves those activities rather than concealing them.",
        paragraphs: [
          "A data scientist evaluating a language-model workflow needs more than prompt fluency. They need a representative evaluation set, an understanding of data permissions, and a way to relate model behavior to a business decision.",
        ],
      },
      {
        title: "Learn the boundary between a model and a system",
        body: "A model is one component in a service that includes data ingestion, application logic, access control, monitoring, and human actions. Most production failures are easier to understand when these layers are considered separately. A good generated answer does not prove that retrieval or authorization worked correctly.",
        paragraphs: [
          "Software engineers should practice designing these boundaries. Data scientists should practice measuring the right output at the right decision horizon. Product partners should help define what usefulness means to the person doing the work.",
        ],
      },
      {
        title: "Build evaluation habits early",
        body: "Start with a small set of ordinary and difficult cases. Record the expected behavior and why it matters. Include requests that should fail, questions with incomplete evidence, and examples outside the system’s intended scope.",
        paragraphs: [
          "When a prompt, model, or source changes, rerun the set. Treat evaluation results as engineering evidence, not as a contest to make a dashboard green. A failure that reveals an important assumption can be more valuable than a small increase in an aggregate score.",
        ],
      },
      {
        title: "Communication is a technical skill",
        body: "A clear explanation tells another person what changed, what remains uncertain, and what action comes next. That is essential for distributed work and especially useful for teams connecting China-based engineering with global product stakeholders.",
        paragraphs: [
          "Practice writing decision records and explaining trade-offs without relying on jargon. A teammate should be able to challenge a choice, reproduce an observation, or continue the work from the evidence you provide.",
        ],
      },
      {
        title: "A useful learning path",
        body: "A practical learning plan combines tool familiarity with small end-to-end projects. Build something narrow enough to evaluate, then add the operational responsibilities that a real service would need.",
        paragraphs: [],
        bullets: [
          "Implement a retrieval workflow with source links and a no-answer path.",
          "Compare numerical predictions with a simple baseline.",
          "Add permission checks and observable failure behavior.",
          "Write a decision record describing the design trade-offs.",
          "Ask a user to complete a real task and review where the workflow creates effort.",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: ["Communication is a technical skill", "A useful learning path"],
  },
  {
    slug: "operating-model-for-ai-investment",
    supportingImages: [
      {
        image: "/images/editorial/enterprise-ai-network.jpg",
        fallbackImage: "/images/about-vision-ai.jpg",
        imageAlt: "AI network connecting industrial and business systems",
      },
    ],
    kind: "blog",
    category: "Business operations",
    title: "From AI ambition to an operating plan.",
    summary:
      "How business leaders can organize an AI portfolio around useful decisions, accountable owners, and measurable delivery instead of disconnected demonstrations.",
    image: "/images/editorial/ai-business-strategy.jpg",
    imageAlt: "Person approaching an illuminated AI gateway",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "A portfolio starts with business decisions",
        body: "An AI roadmap is more useful when it names the decisions and workflows the company wants to improve. “Deploy agents” describes a technology preference. “Reduce the time required to reconcile supplier exceptions” describes a business problem that can be measured.",
        paragraphs: [
          "Collect candidate workflows with their current volume, effort, failure cost, and data availability. Keep these estimates explicit and reviewable. A rough but transparent baseline is better than a polished savings forecast built on assumptions no one has examined.",
        ],
      },
      {
        title: "Use a small set of investment gates",
        body: "The first gate asks whether the problem is important and whether the relevant data can be used. The second asks whether a narrow prototype beats the current baseline. The third asks whether the organization can operate the workflow with appropriate controls and ownership.",
        paragraphs: [
          "A project should be able to stop at any gate with a useful finding. Discovering that source quality is too weak, or that human review erases the expected savings, is a valid outcome. It prevents a larger investment based on the wrong premise.",
        ],
      },
      {
        title: "Separate the model budget from the operating budget",
        body: "The complete cost includes integration, review, monitoring, incident handling, and maintaining the evaluation set. Model inference may be only one part. A program that budgets for a demo but not for those responsibilities is unlikely to remain useful after launch.",
        paragraphs: [
          "Define the service owner and the change process early. If the workflow depends on another team’s data or policy, include that team in the operating agreement. A launch checklist cannot solve an unresolved ownership problem.",
        ],
      },
      {
        title: "Report learning as well as outcomes",
        body: "A portfolio review should show which assumptions were tested, which workflows improved, and which projects were paused. Numerical outcomes should identify their baseline, observation window, and scope. Comparisons across unrelated workflows can be misleading.",
        paragraphs: [
          "Use a mixture of business and engineering measures: task completion, review effort, error handling, latency, cost, and the proportion of cases that need escalation. None of these alone captures the complete value of a service.",
        ],
      },
      {
        title: "Questions a leadership team can use immediately",
        body: "The goal is a portfolio that learns and a business that can operate what it funds. The following questions make the next investment conversation more concrete.",
        paragraphs: [],
        bullets: [
          "Which decision or task is the project trying to improve?",
          "What is the current baseline, and who verified it?",
          "Which inputs are allowed, current, and sufficiently reliable?",
          "How will failures be detected and handled?",
          "Who owns the workflow and its operating cost after launch?",
          "What evidence would justify expansion, redesign, or stopping?",
        ],
      },
    ],
    label: "Engineering & business perspective",
    author: "Twinlink Editorial",
    readMinutes: 3,
    takeaways: [
      "Report learning as well as outcomes",
      "Questions a leadership team can use immediately",
    ],
  },
  {
    slug: "industrial-ai-practice-lab",
    kind: "events",
    category: "Workshop",
    title: "Industrial AI practice lab: from camera feed to operator decision.",
    summary:
      "A detailed workshop guide for teams evaluating inspection, maintenance, and production-support systems.",
    image: "/images/editorial/industrial-ai-operator.jpg",
    imageAlt:
      "Industrial operator reviewing AI-assisted production information",
    fallbackImage: "/images/how-we-help-delivery.jpg",
    sections: [
      {
        title: "What participants will work through",
        body: "This proposed half-day program follows an inspection workflow from image capture to a human decision. The goal is to help participants identify the operational work that sits around a model: source quality, exception handling, feedback, and release evidence.",
        paragraphs: [
          "The session uses fictional component records and a prepared test set. It does not require live plant data or access to production machinery. The program is intended for engineering leads, manufacturing operations partners, and practitioners evaluating a narrow industrial AI use case.",
        ],
      },
      {
        title: "Module one: define the decision and the boundary",
        body: "Participants map a quality-inspection task and decide which output would actually help an operator. The exercise distinguishes a technical exception from a suspected defect and identifies which decisions stay with a person.",
        paragraphs: [
          "Small groups then create an operating boundary: component types, lighting conditions, camera assumptions, and the fallback when the capture fails. Each group explains what the pilot will not establish.",
        ],
      },
      {
        title: "Module two: design an evaluation that includes difficult cases",
        body: "The program introduces ordinary variation and asks teams to choose the cases a demo might overlook. Participants review how false alarms affect operator workload and why a fixed test set should retain shift and product context.",
        paragraphs: [
          "An example result table is used to compare model quality with workflow usefulness. The numbers are fictional teaching inputs, so the discussion can focus on the measurement method rather than imply a real factory result.",
        ],
      },
      {
        title: "Module three: review a release decision",
        body: "Groups assemble a compact pilot evidence pack: the workflow change, evaluation results, unresolved exceptions, manual fallback, and owner. Another group acts as an operational reviewer and challenges the assumptions.",
        paragraphs: [
          "The closing exercise asks whether to expand, pause, or redesign the pilot. There is no preferred answer; the quality of the evidence and the clarity of the boundary are what matter.",
        ],
        bullets: [
          "A one-page inspection workflow and operating boundary.",
          "An evaluation checklist covering variation and recovery.",
          "A release-review template with named responsibilities.",
          "A list of unresolved assumptions to test before expansion.",
        ],
      },
      {
        title: "Participation and program status",
        body: "Dates and facilitators have not been confirmed. Express interest with a short description of your role and the workflow you want to explore. The form prepares an email; it does not create a booking or collect payment.",
        paragraphs: [
          "Bring only non-sensitive examples. Do not send production records, equipment credentials, or confidential photographs with an interest email. The materials are designed to be useful even to teams that are still deciding whether an AI pilot is appropriate.",
        ],
      },
    ],
    label: "Program guide · dates to be announced",
    notice:
      "This is a proposed learning program. Dates, speakers, and attendance are not confirmed. Expressing interest does not create a booking.",
    readMinutes: 3,
    takeaways: [
      "Module three: review a release decision",
      "Participation and program status",
    ],
  },
  {
    slug: "secure-agents-design-roundtable",
    kind: "events",
    category: "Roundtable",
    title: "Secure agents design roundtable: who is allowed to do what?",
    summary:
      "A structured discussion of tool boundaries, temporary authority, approval, and operational ownership for enterprise AI workflows.",
    image: "/images/editorial/just-in-time-trust.jpg",
    imageAlt:
      "Diagram of just-in-time trust and least-privilege access for agents",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "The question behind the program",
        body: "When an assistant can use a business tool, the design conversation shifts from answer quality to authority. This proposed roundtable explores how organizations can retain control over a workflow while still benefiting from automation.",
        paragraphs: [
          "The intended audience includes software architects, security partners, product owners, and operations leads. Participants do not need to share customer data or internal credentials. The discussion uses fictional service-desk and purchasing scenarios.",
        ],
      },
      {
        title: "Session one: map the identities and the action",
        body: "The first exercise distinguishes the requester, the assistant service, and the downstream application identity. Groups review a tool request and identify the target, permitted operation, and evidence required to proceed.",
        paragraphs: [
          "The facilitator’s guide introduces a changed request after approval. Participants decide whether the existing approval still applies and document the reasoning. This makes the difference between conversational intent and enforceable authorization concrete.",
        ],
      },
      {
        title: "Session two: investigate the difficult execution",
        body: "A tool accepts an operation but returns a timeout. Another source includes instructions that conflict with the original user request. A third action points to an ambiguous account. Groups work through the recovery path and decide what the audit record must show.",
        paragraphs: [
          "The exercise emphasizes idempotency, independent policy checks, and human escalation. It does not assume that a better prompt can solve an execution-boundary problem.",
        ],
      },
      {
        title: "Session three: define an operating agreement",
        body: "Participants create an ownership map for tool inventory, approvals, incident handling, and access revocation. A workflow is not ready merely because the model can call an API successfully.",
        paragraphs: [
          "The discussion closes with expansion criteria: what evidence would justify allowing another operation, and what failure would require a pause?",
        ],
        bullets: [
          "An identity and authority map for one narrow workflow.",
          "An approval checklist for consequential actions.",
          "A recovery plan for ambiguous or incomplete execution.",
          "A draft audit schema and operational ownership list.",
        ],
      },
      {
        title: "Participation and program status",
        body: "This program is proposed, with dates and speakers to be announced. Expressing interest helps identify relevant discussion topics but does not reserve a place. Any confirmed schedule would be published separately.",
        paragraphs: [
          "In your interest email, describe the type of workflow you are evaluating and the questions you want the discussion to answer. Leave out sensitive architecture diagrams and access details; those are not needed to plan a useful conversation.",
        ],
      },
    ],
    label: "Program guide · dates to be announced",
    notice:
      "This is a proposed learning program. Dates, speakers, and attendance are not confirmed. Expressing interest does not create a booking.",
    readMinutes: 3,
    takeaways: [
      "Session three: define an operating agreement",
      "Participation and program status",
    ],
  },
  {
    slug: "technical-communication-studio",
    kind: "events",
    category: "People & delivery",
    title: "Technical communication studio: make the decision understandable.",
    summary:
      "A practical session on presenting engineering trade-offs, leading cross-border discussions, and writing decisions people can act on.",
    image: "/images/editorial/confident-speaking.jpg",
    imageAlt: "Four illustrated techniques for confident public speaking",
    fallbackImage: "/images/our-people-handshake.jpg",
    sections: [
      {
        title: "Why communication belongs in an engineering program",
        body: "A technically correct proposal can still fail if stakeholders cannot see the problem, the alternatives, or the next decision. This proposed studio helps practitioners make those elements clear without turning an engineering discussion into a sales presentation.",
        paragraphs: [
          "The program is useful for engineers moving into leadership, product partners working across regions, and teams connecting China-based delivery with overseas stakeholders. The exercises use fictional project briefs.",
        ],
      },
      {
        title: "Exercise one: explain a trade-off in two minutes",
        body: "Participants prepare a short explanation of a choice between two implementation approaches. They state the constraint, describe the options, and recommend a next step. Reviewers listen for missing assumptions rather than score speaking style alone.",
        paragraphs: [
          "A pause before speaking can help organize the first sentence. A clear ending can signal the decision being requested. These are communication techniques, not guarantees about confidence or a person’s abilities.",
        ],
      },
      {
        title: "Exercise two: turn a meeting into a decision record",
        body: "Groups receive a fictional meeting transcript with competing priorities. They produce a compact record of the problem, the chosen action, the owner, and the evidence that would trigger a review.",
        paragraphs: [
          "The exercise highlights what asynchronous collaborators need. Someone reading the record in another time zone should understand the decision without having to attend the original discussion.",
        ],
      },
      {
        title: "Exercise three: ask a useful question",
        body: "Participants practice asking for the information that would change a recommendation. The goal is to distinguish a genuine constraint from a preference and to avoid presenting uncertainty as a lack of competence.",
        paragraphs: [
          "Feedback is specific and constructive: which sentence clarified the issue, which assumption was still hidden, and which next action became easier to identify.",
        ],
        bullets: [
          "A two-minute explanation of an engineering trade-off.",
          "A reusable decision-record template.",
          "A handoff checklist for distributed collaboration.",
          "A personal practice plan based on observed feedback.",
        ],
      },
      {
        title: "Participation and program status",
        body: "The studio is a proposed program with no confirmed schedule or facilitator roster. Express interest by email and describe the communication task you want to improve. Participation details would be shared only after the program is confirmed.",
        paragraphs: [
          "No confidential project material is needed. A fictional or anonymized example is enough to practice explaining a decision clearly. The program focuses on professional communication rather than making claims about psychological or medical outcomes.",
        ],
      },
    ],
    label: "Program guide · dates to be announced",
    notice:
      "This is a proposed learning program. Dates, speakers, and attendance are not confirmed. Expressing interest does not create a booking.",
    readMinutes: 3,
    takeaways: [
      "Exercise three: ask a useful question",
      "Participation and program status",
    ],
  },
  {
    slug: "ai-business-value-clinic",
    kind: "events",
    category: "Business operations",
    title: "AI business-value clinic: build a decision-ready pilot plan.",
    summary:
      "A working session for turning an ambitious AI idea into a measured workflow, a realistic cost model, and an accountable operating plan.",
    image: "/images/editorial/ai-business-strategy.jpg",
    imageAlt: "Person approaching an illuminated AI gateway",
    fallbackImage: "/images/how-we-help-architecture.jpg",
    sections: [
      {
        title: "A program for the decision before the project",
        body: "This proposed clinic is intended for business leaders and product owners who need to decide whether an AI pilot is worth funding. Participants work on a narrow fictional workflow so the plan can be evaluated without disclosing company data.",
        paragraphs: [
          "The program combines business discovery with engineering constraints. A useful plan names the user, the current task, the expected improvement, and the responsibilities that remain after the demonstration.",
        ],
      },
      {
        title: "Part one: write a baseline that can be challenged",
        body: "Groups estimate task volume, handling effort, review cost, and the consequences of an error. They identify which estimates are supported and which are assumptions. The exercise deliberately avoids claiming a precise return on investment from incomplete information.",
        paragraphs: [
          "Participants then select a measure that would matter to an operational owner, such as completed work with acceptable review effort. A faster response is not necessarily a faster completed task.",
        ],
      },
      {
        title: "Part two: choose the minimum useful experiment",
        body: "The pilot plan states the data boundary, a representative evaluation set, and the behavior expected when the system cannot help. Groups compare a predictive approach, a generative approach, and a simpler process change where appropriate.",
        paragraphs: [
          "The experiment is designed to answer a decision. It does not need to demonstrate every feature in a future platform. Participants record what would justify expansion and what would justify stopping.",
        ],
      },
      {
        title: "Part three: price the operating responsibilities",
        body: "A fictional budgeting worksheet includes inference, integration, review, monitoring, and maintenance of the evaluation set. Participants assign an owner to each cost and discuss the dependencies on other teams.",
        paragraphs: [
          "The final review asks whether the organization can operate the workflow with the proposed staffing and controls. This is often the missing question in a presentation focused only on model capability.",
        ],
        bullets: [
          "A one-page pilot charter with a clear business decision.",
          "A transparent baseline and assumption register.",
          "A complete-cost worksheet using fictional inputs.",
          "A go, revise, or stop review with explicit evidence requirements.",
        ],
      },
      {
        title: "Participation and program status",
        body: "This clinic is a proposed learning program. Dates and presenters are not confirmed, and an interest email is not a registration. Share the type of business workflow you are considering so the eventual program can address useful questions.",
        paragraphs: [
          "Use only non-sensitive descriptions. Financial records, customer datasets, and internal credentials are not required. The session is about creating a sound decision process, not promising a predetermined business outcome.",
        ],
      },
    ],
    label: "Program guide · dates to be announced",
    notice:
      "This is a proposed learning program. Dates, speakers, and attendance are not confirmed. Expressing interest does not create a booking.",
    readMinutes: 3,
    takeaways: [
      "Part three: price the operating responsibilities",
      "Participation and program status",
    ],
  },
];
export function resourceHref(item: Resource) {
  return `/${item.kind}/${item.slug}`;
}
export function chinaDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}
