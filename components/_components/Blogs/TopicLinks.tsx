import Link from "next/link";
import Typography from "@/components/utils/Typography";
import { TOPICS } from "./blogs.data";
import { topicChipClass } from "./topicChip";

type TopicLinksProps = {
  /** The topic of the article being read, highlighted in the rail. */
  active: string;
};

/**
 * The static counterpart to TopicFilter. On an article there is nothing to
 * filter, so each chip is a link back to the index already narrowed to it.
 */
const TopicLinks = ({ active }: TopicLinksProps) => (
  <section aria-label="Browse topics">
    <Typography as="h2" variant="title" className="text-content">
      Topics
    </Typography>

    <div className="mt-5 flex flex-wrap gap-2">
      {TOPICS.map((topic) => {
        const selected = topic.id === active;

        return (
          <Link
            key={topic.id}
            href={topic.id === "all" ? "/blogs" : `/blogs?topic=${topic.id}`}
            className={topicChipClass(selected)}>
            {selected && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-invert"
              />
            )}
            <span className="relative">{topic.label}</span>
          </Link>
        );
      })}
    </div>
  </section>
);

export default TopicLinks;
