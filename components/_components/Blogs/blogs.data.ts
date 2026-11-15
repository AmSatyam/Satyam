/**
 * Posts live in the frontend as data rather than in a CMS: there are few of
 * them, they change rarely, and keeping them here means the whole index is
 * statically rendered with no fetch on the critical path.
 *
 * `body` is deliberately empty for now. The shape is already final, so writing
 * a post later is a data edit and never a component change.
 */

export type Topic = {
  id: string;
  label: string;
};

/**
 * A paragraph, a heading or a list — the three things a post actually needs.
 * Rendered by BlogBody; anything richer should become a new block type here
 * rather than raw HTML in the data.
 */
export type BlogBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

export type Blog = {
  slug: string;
  title: string;
  /** Matches a `Topic.id`, which is what the filter chips switch on. */
  topic: string;
  /** ISO date — formatted for display at render time, never stored formatted. */
  date: string;
  author: string;
  readingTime: string;
  excerpt: string;
  /** Surfaced in the Popular Reads rail beside the index and every article. */
  popular?: boolean;
  body: BlogBlock[];
};

export const TOPICS: Topic[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "engineering", label: "Engineering" },
  { id: "frontend", label: "Frontend" },
];

export const BLOGS: Blog[] = [
  {
    slug: "harnessing-knowledge-into-llms-part-2",
    title: "Recipe for Harnessing Knowledge into LLMs — Part 2",
    topic: "ai",
    date: "2025-02-15",
    author: "Satyam",
    readingTime: "8 min read",
    excerpt:
      "Retrieval-Augmented Generation gives a model a library card instead of asking it to memorise the library. Where RAG fits next to fine-tuning, and when it does not.",
    popular: true,
    body: [],
  },
  {
    slug: "harnessing-knowledge-into-llms",
    title: "Recipe for Harnessing Knowledge into LLMs",
    topic: "ai",
    date: "2025-01-28",
    author: "Satyam",
    readingTime: "7 min read",
    excerpt:
      "Prompting, fine-tuning and retrieval are three answers to one question: where should the knowledge live? Part one maps the trade-offs.",
    popular: true,
    body: [],
  },
  {
    slug: "shipping-a-3d-hero-without-wrecking-performance",
    title: "Shipping a 3D Hero Without Wrecking Performance",
    topic: "frontend",
    date: "2025-03-09",
    author: "Satyam",
    readingTime: "6 min read",
    excerpt:
      "Procedural geometry, a lightformer studio instead of an HDR download, and a CSS fallback that holds the same box — what it costs to put WebGL above the fold.",
    body: [],
  },
  {
    slug: "two-status-tracks-on-one-bug",
    title: "Two Status Tracks on One Bug",
    topic: "engineering",
    date: "2025-04-02",
    author: "Satyam",
    readingTime: "5 min read",
    excerpt:
      "Most trackers give a bug a single status, so QA and engineering end up fighting over it. Giving each side its own column removed a whole class of argument.",
    body: [],
  },
];

const byNewest = (a: Blog, b: Blog) => b.date.localeCompare(a.date);

export const getBlogs = (topic = "all"): Blog[] =>
  BLOGS.filter((blog) => topic === "all" || blog.topic === topic).sort(byNewest);

export const getBlog = (slug: string): Blog | undefined =>
  BLOGS.find((blog) => blog.slug === slug);

export const getPopularReads = (excludeSlug?: string): Blog[] =>
  BLOGS.filter((blog) => blog.popular && blog.slug !== excludeSlug);

export const getTopicLabel = (id: string): string =>
  TOPICS.find((topic) => topic.id === id)?.label ?? id;

/** Short form — "15 Feb 25" — kept locale-fixed so SSR and client agree. */
export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
