import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Typography from "@/components/utils/Typography";
import SubPageNav from "@/components/_components/Shared/SubPageNav";
import BlogBody from "@/components/_components/Blogs/BlogBody";
import PopularReads from "@/components/_components/Blogs/PopularReads";
import ShareButton from "@/components/_components/Blogs/ShareButton";
import TopicLinks from "@/components/_components/Blogs/TopicLinks";
import {
  BLOGS,
  formatDate,
  getBlog,
  getTopicLabel,
} from "@/components/_components/Blogs/blogs.data";

type ArticleProps = {
  params: Promise<{ slug: string }>;
};

/** The corpus is static, so every post is prerendered at build time. */
export const generateStaticParams = () =>
  BLOGS.map((blog) => ({ slug: blog.slug }));

export const generateMetadata = async ({
  params,
}: ArticleProps): Promise<Metadata> => {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) return { title: "Not found — Satyam" };

  return {
    title: `${blog.title} — Satyam`,
    description: blog.excerpt,
  };
};

const ArticlePage = async ({ params }: ArticleProps) => {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) notFound();

  return (
    <main
      data-theme-surface
      className="ambient-field relative isolate min-h-screen bg-surface text-content">
      <SubPageNav />

      <div className="mx-auto w-full max-w-[1800px] px-6 pt-10 pb-24 sm:px-8 md:px-16 md:pt-16 md:pb-32 2xl:px-26">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_19rem]">
          {/* ------------------------------------------------ The article */}
          <article className="max-w-3xl lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="flex items-start gap-5">
              <Typography
                as="h1"
                variant="h2"
                className="text-content [text-shadow:var(--display-shadow)]">
                {blog.title}
              </Typography>
              <ShareButton title={blog.title} />
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-accent">{getTopicLabel(blog.topic)}</span>
              <span aria-hidden className="text-content/25">
                |
              </span>
              <span className="text-content-subtle">
                {formatDate(blog.date)}
              </span>
              <span aria-hidden className="text-content/25">
                ·
              </span>
              <span className="text-content-subtle">{blog.readingTime}</span>
            </p>

            <p className="mt-3 text-sm text-content-subtle">
              Written by {blog.author}
            </p>

            <span aria-hidden className="mt-8 block h-px w-24 bg-line-strong" />

            <Typography
              variant="body"
              className="mt-8 text-content-muted italic">
              {blog.excerpt}
            </Typography>

            <BlogBody blocks={blog.body} />
          </article>

          {/* --------------------------------------------------- The rail */}
          <div className="lg:col-start-2 lg:row-start-1">
            <TopicLinks active={blog.topic} />
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <PopularReads excludeSlug={blog.slug} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
