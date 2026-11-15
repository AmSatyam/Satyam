import Link from "next/link";
import Typography from "@/components/utils/Typography";
import { getPopularReads, formatDate } from "./blogs.data";

type PopularReadsProps = {
  /** The post currently being read — never listed as something else to read. */
  excludeSlug?: string;
};

const PopularReads = ({ excludeSlug }: PopularReadsProps) => {
  const reads = getPopularReads(excludeSlug);

  if (reads.length === 0) return null;

  return (
    <section aria-label="Popular reads">
      <Typography as="h2" variant="title" className="text-content">
        Popular Reads
      </Typography>

      <ul className="mt-5 space-y-3">
        {reads.map((blog) => (
          <li key={blog.slug}>
            <Link
              href={`/blogs/${blog.slug}`}
              className="panel-flat group block rounded-xl px-5 py-4 transition-transform duration-500 ease-out-depth hover:-translate-y-0.5">
              <span className="block text-base leading-snug font-medium text-content transition-colors duration-300 group-hover:text-accent">
                {blog.title}
              </span>
              <span className="mt-2 block font-mono text-[10px] tracking-[0.18em] text-content-subtle uppercase">
                {formatDate(blog.date)} · {blog.readingTime}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularReads;
