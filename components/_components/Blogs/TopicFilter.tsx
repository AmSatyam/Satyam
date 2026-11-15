"use client";

import { motion, useReducedMotion } from "framer-motion";
import Typography from "@/components/utils/Typography";
import { TOPICS } from "./blogs.data";
import { topicChipClass } from "./topicChip";

type TopicFilterProps = {
  active: string;
  onSelect: (topic: string) => void;
};

/**
 * The selected chip is a single element that travels between positions via a
 * shared layoutId, so switching topics reads as one object moving rather than
 * as two chips swapping colour.
 */
const TopicFilter = ({ active, onSelect }: TopicFilterProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section aria-label="Filter by topic">
      <Typography as="h2" variant="title" className="text-content">
        Topics
      </Typography>

      <div className="mt-5 flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const selected = topic.id === active;

          return (
            <button
              key={topic.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(topic.id)}
              className={topicChipClass(selected)}>
              {selected && (
                <motion.span
                  aria-hidden
                  layoutId="topic-chip"
                  className="absolute inset-0 rounded-full bg-invert"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              )}
              <span className="relative">{topic.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TopicFilter;
