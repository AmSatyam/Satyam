import Link from "next/link";
import Typography from "@/components/utils/Typography";
import { formatDate, getTopicLabel, type Blog } from "./blogs.data";

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => (
  <Link
    href={`/blogs/${blog.slug}`}
    className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform duration-500 ease-out-depth hover:-translate-y-1 sm:p-7">
    <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
      {getTopicLabel(blog.topic)}
    </span>

    <Typography
      as="h3"
      variant="title"
      className="mt-4 text-content transition-colors duration-300 group-hover:text-accent">
      {blog.title}
    </Typography>

    <Typography variant="caption" className="mt-3 text-content-muted">
      {blog.excerpt}
    </Typography>

    <span className="mt-6 flex items-center gap-3 pt-4 font-mono text-[10px] tracking-[0.18em] text-content-subtle uppercase">
      {formatDate(blog.date)}
      <span aria-hidden>·</span>
      {blog.readingTime}
      <span
        aria-hidden
        className="ml-auto h-px w-6 bg-content-subtle transition-all duration-500 group-hover:w-10 group-hover:bg-accent"
      />
    </span>
  </Link>
);

export default BlogCard;
