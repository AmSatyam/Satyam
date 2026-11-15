"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Typography from "@/components/utils/Typography";
import BlogCard from "./BlogCard";
import PopularReads from "./PopularReads";
import TopicFilter from "./TopicFilter";
import { getBlogs, getTopicLabel } from "./blogs.data";

type BlogsIndexProps = {
  /** Seeded from ?topic= so a filtered index stays linkable. */
  initialTopic: string;
};

/**
 * Filtering is local state rather than a navigation: the whole corpus is
 * already on the client, so a round trip would only add latency. The initial
 * value still comes from the URL, so a shared link opens pre-filtered.
 */
const BlogsIndex = ({ initialTopic }: BlogsIndexProps) => {
  const [topic, setTopic] = useState(initialTopic);
  const reduceMotion = Boolean(useReducedMotion());

  const blogs = useMemo(() => getBlogs(topic), [topic]);

  const onSelect = (next: string) => {
    setTopic(next);

    // Keep the address bar in step without a navigation or a re-render.
    const url = next === "all" ? "/blogs" : `/blogs?topic=${next}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="lg:col-start-2 lg:row-start-1">
        <TopicFilter active={topic} onSelect={onSelect} />
      </div>

      <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul
            key={topic}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {blogs.map((blog) => (
              <li key={blog.slug} className="h-full">
                <BlogCard blog={blog} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {blogs.length === 0 && (
          <Typography variant="body" className="text-content-subtle">
            Nothing filed under {getTopicLabel(topic)} yet.
          </Typography>
        )}
      </div>

      <div className="lg:col-start-2 lg:row-start-2">
        <PopularReads />
      </div>
    </div>
  );
};

export default BlogsIndex;
