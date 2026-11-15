import type { Metadata } from "next";
import SubPageNav from "@/components/_components/Shared/SubPageNav";
import PageHeading from "@/components/_components/Shared/PageHeading";
import BlogsIndex from "@/components/_components/Blogs/BlogsIndex";
import { BLOGS, TOPICS } from "@/components/_components/Blogs/blogs.data";

export const metadata: Metadata = {
  title: "Writing — Satyam",
  description:
    "Notes on building for the web: retrieval and LLMs, frontend performance, and the engineering practices in between.",
};

type BlogsPageProps = {
  searchParams: Promise<{ topic?: string }>;
};

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  const { topic } = await searchParams;

  // Never trust the query string to name a real topic.
  const initialTopic = TOPICS.some((entry) => entry.id === topic)
    ? (topic as string)
    : "all";

  return (
    <main
      data-theme-surface
      className="ambient-field relative isolate min-h-screen bg-surface text-content">
      <SubPageNav />

      <div className="mx-auto w-full max-w-[1800px] px-6 pt-10 pb-24 sm:px-8 md:px-16 md:pt-16 md:pb-32 2xl:px-26">
        <PageHeading
          overline="Writing"
          title="Notes from the build"
          lede="Working notes on retrieval and language models, on what a 3D hero actually costs, and on the practices that keep a product shippable."
          aside={
            <span className="font-mono text-[10px] tracking-[0.22em] text-content-subtle uppercase 2xl:text-[11px]">
              {BLOGS.length} {BLOGS.length === 1 ? "piece" : "pieces"}
            </span>
          }
        />

        <div className="mt-16 md:mt-20">
          <BlogsIndex initialTopic={initialTopic} />
        </div>
      </div>
    </main>
  );
};

export default BlogsPage;
