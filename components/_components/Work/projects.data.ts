/**
 * Projects are real, deployed products holding real data, so the work is shown
 * rather than handed over: every project here is access-locked, and the case
 * study carries the screens and the documentation instead of a live URL.
 *
 * Adding a project is a data edit — the index, the detail route, the preview
 * lightbox and the access panel all read from this file.
 */

export type ShotGroup = "product" | "auth" | "marketing";

export type Shot = {
  id: string;
  /** Path under /public. */
  src: string;
  /** Intrinsic size, so the grid reserves the right box before the image lands. */
  width: number;
  height: number;
  title: string;
  caption: string;
  /** Describes the screen for anyone who cannot see it. */
  alt: string;
  group: ShotGroup;
};

export type DocBlock = {
  heading: string;
  body: string;
  points?: string[];
};

export type DocChapter = {
  id: string;
  label: string;
  blocks: DocBlock[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  /** Shown as a chip on the card. */
  status: string;
  stack: string[];
  /** Small facts rendered as a stat row on the detail page. */
  facts: { label: string; value: string }[];
  cover: Shot;
  shots: Shot[];
  chapters: DocChapter[];
  access: {
    /** Never the real host — the card renders this masked behind a lock. */
    maskedUrl: string;
    reason: string;
    grants: string[];
    contactEmail: string;
  };
};

export const SHOT_GROUPS: { id: ShotGroup; label: string }[] = [
  { id: "product", label: "The product" },
  { id: "auth", label: "Access" },
  { id: "marketing", label: "The pitch" },
];

const BUG_BOARD_SHOTS: Shot[] = [
  {
    id: "board-light",
    src: "/1.png",
    width: 1850,
    height: 926,
    title: "The board",
    caption:
      "Every bug across every project in one table — severity, priority, both status tracks and the assigned developer on a single row.",
    alt: "Bug Board table listing bugs with project, module, severity, priority, tester and developer columns.",
    group: "product",
  },
  {
    id: "hand-off",
    src: "/2.png",
    width: 1850,
    height: 926,
    title: "Hand-off",
    caption:
      "Share with a developer: pick the project and the person, optionally limit it to bugs still open, and the link reopens the board already scoped to them.",
    alt: "Share with a developer dialog showing a project selector, developer selector, the bugs in the hand-off and a share link.",
    group: "product",
  },
  {
    id: "filters",
    src: "/3.png",
    width: 1837,
    height: 329,
    title: "Stacked filters",
    caption:
      "Filters stack rather than replace each other, and the summary tiles above recount as the set narrows.",
    alt: "A row of filter dropdowns for project, tester status, developer status, severity, priority, developer, tester, module, sprint, environment and date range.",
    group: "product",
  },
  {
    id: "project-switcher",
    src: "/4.png",
    width: 369,
    height: 323,
    title: "Project switcher",
    caption:
      "Scope the whole board to one product, with the open and unassigned counts carried in the menu itself.",
    alt: "Project switcher dropdown listing All projects, Atlas Web App, Billing Platform, Search and Notifications, and Integrations Hub with open bug counts.",
    group: "product",
  },
  {
    id: "board-dark",
    src: "/9.png",
    width: 1731,
    height: 917,
    title: "The board, dark",
    caption:
      "The same table in dark mode — the theme is a first-class surface, not an inverted afterthought.",
    alt: "The Bug Board table rendered in a dark theme.",
    group: "product",
  },
  {
    id: "sign-in",
    src: "/10.png",
    width: 749,
    height: 432,
    title: "Sign in",
    caption:
      "The board is gated. There is no public read path — an unauthenticated visitor gets the form and nothing else.",
    alt: "Bug Board sign-in card with username and password fields and a sign-in button.",
    group: "auth",
  },
  {
    id: "landing-hero",
    src: "/5.png",
    width: 1844,
    height: 927,
    title: "Landing",
    caption:
      "The pitch in one line: the same bug, two status tracks, so nobody has to ask where it actually stands.",
    alt: "Nexora marketing landing page with the headline 'The bug board built for both sides of the fix'.",
    group: "marketing",
  },
  {
    id: "features",
    src: "/6.png",
    width: 1844,
    height: 927,
    title: "Features",
    caption:
      "The two mechanisms the product is built on — dual status tracks, and evidence that travels with the report.",
    alt: "Features section showing a dual status track diagram and an evidence list of attachments.",
    group: "marketing",
  },
  {
    id: "product-tour",
    src: "/7.png",
    width: 1844,
    height: 927,
    title: "Triage",
    caption:
      "How a bug moves through the board, from filed to handed off to settled from the record.",
    alt: "Product section describing triage, with a filters panel showing six active filters narrowing twenty-six bugs to seven.",
    group: "marketing",
  },
  {
    id: "benefits",
    src: "/8.png",
    width: 1844,
    height: 927,
    title: "Why teams use it",
    caption:
      "Each claim points at something concrete in the product rather than at a promise.",
    alt: "Benefits section with five cards covering structured fields, dual status tracks, attachments, bulk actions and the audit trail.",
    group: "marketing",
  },
];

const BUG_BOARD: Project = {
  slug: "bug-board",
  name: "Bug Board",
  tagline: "Bug tracking built around QA, not bolted onto it",
  summary:
    "A bug tracker for teams where testing and engineering are different people. Every bug carries two status tracks — one owned by the tester, one by the developer — so the board never has to pretend that 'fixed' and 'verified' are the same claim.",
  year: "2025",
  role: "Design and full stack",
  status: "Live · access locked",
  stack: [
    "Next.js (App Router)",
    "TypeScript",
    "Tailwind CSS",
    "Server Actions",
    "RBAC",
    "REST APIs",
  ],
  facts: [
    { label: "Status tracks", value: "2" },
    { label: "Projects on one board", value: "4" },
    { label: "Filter dimensions", value: "11" },
    { label: "Screens documented", value: "10" },
  ],
  cover: BUG_BOARD_SHOTS[0],
  shots: BUG_BOARD_SHOTS,
  chapters: [
    {
      id: "overview",
      label: "Overview",
      blocks: [
        {
          heading: "The problem it solves",
          body: "Most trackers give a bug one status field, so QA and engineering end up fighting over it: a developer marks it fixed, a tester has not verified it, and the board now says something neither of them agrees with. Bug Board gives each side its own column and shows both at once.",
        },
        {
          heading: "What a bug carries",
          body: "A report is only useful if it carries proof, a clear owner and a history nobody can quietly rewrite. Every bug is structured around those three things.",
          points: [
            "Structured fields — project, module and component, severity, priority, environment and sprint",
            "Evidence — screenshots, screen recordings, PDFs, archives and logs attached to the bug itself",
            "A tester track and a developer track, each owned by the person doing that half of the work",
            "An activity trail written server-side, so who reopened it and when is a record, not a claim",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      label: "How it works",
      blocks: [
        {
          heading: "1 · File",
          body: "A tester files against a project and a module, sets severity and priority, and attaches what they saw. The report lands on the board with its tester track at Open and its developer track at Backlog.",
        },
        {
          heading: "2 · Triage",
          body: "The board holds every bug across every project. Search spans id, title, module, component, sprint, people and labels; filters stack across eleven dimensions until the table holds only what is worth the morning; and the summary tiles above recount as the set narrows.",
          points: [
            "Sort by severity, priority, either status, attachment count or age",
            "Workflow order, not alphabetical — critical first, blocked first",
            "Bulk actions move a sprint's worth of bugs, or a departing developer's whole queue, in one go",
          ],
        },
        {
          heading: "3 · Hand off",
          body: "'Share with developer' builds a link scoped to one project and one developer, optionally limited to bugs still open. The developer opens it and sees the bugs they own and nothing else — no account tour, no inbox of other people's work.",
        },
        {
          heading: "4 · Settle",
          body: "The developer moves their own track to Fixed; the tester verifies it or reopens it on theirs. Because the two tracks are separate, the board records a disagreement instead of hiding one.",
        },
      ],
    },
    {
      id: "authentication",
      label: "Authentication",
      blocks: [
        {
          heading: "Nothing is readable signed out",
          body: "The board sits behind a username and password sign-in. There is no public read path and no shareable anonymous view of the table — an unauthenticated request gets the sign-in form.",
        },
        {
          heading: "Identity travels with the change",
          body: "The signed-in account is shown in the header with a sign-out control, and every status change, reassignment and reopen is attributed to it by the server that applied the change rather than by the client that requested it.",
        },
        {
          heading: "Scoped hand-off links",
          body: "A share link does not bypass the gate. It encodes the project and developer scope, so following it still requires an account — it only decides what that account lands on.",
          points: [
            "Scope is per project and per developer, so one link cannot widen into the whole board",
            "'Only bugs that are still open' keeps a closed sprint out of a hand-off",
            "The same hand-off can leave as a copied summary or a CSV export instead of a link",
          ],
        },
      ],
    },
  ],
  access: {
    maskedUrl: "https://•••••••••••••.••••",
    reason:
      "It is a full product running against real project data, so the host and the credentials are handed out per request rather than published on a portfolio.",
    grants: [
      "A walkthrough of the live board, screen-shared or recorded",
      "A read-only demo account on seeded data",
      "The deployed URL and credentials, for a scheduled review",
    ],
    contactEmail: "satyamsaurav2001@gmail.com",
  },
};

export const PROJECTS: Project[] = [BUG_BOARD];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);

export const getShotsByGroup = (project: Project, group: ShotGroup): Shot[] =>
  project.shots.filter((shot) => shot.group === group);
