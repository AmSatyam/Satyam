import Typography from "@/components/utils/Typography";
import type { BlogBlock } from "./blogs.data";

type BlogBodyProps = {
  blocks: BlogBlock[];
};

/**
 * Renders the stored blocks. An empty body is a real state here rather than a
 * bug — posts are filed before they are written — so it gets a composed
 * placeholder instead of a blank column.
 */
const BlogBody = ({ blocks }: BlogBodyProps) => {
  if (blocks.length === 0) {
    return (
      <div className="glass mt-10 rounded-2xl px-7 py-9 sm:px-9 sm:py-11">
        <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
          In progress
        </span>
        <Typography variant="body" className="mt-4 text-content-muted">
          This one is still being written. The outline is set and the draft is
          in the editor — check back shortly, or take one of the popular reads
          in the meantime.
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, index) => {
        if (block.kind === "heading") {
          return (
            <Typography
              key={index}
              as="h2"
              variant="title"
              className="pt-4 text-content">
              {block.text}
            </Typography>
          );
        }

        if (block.kind === "list") {
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 h-px w-4 shrink-0 bg-accent"
                  />
                  <Typography variant="body" className="text-content-muted">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <Typography key={index} variant="body" className="text-content-muted">
            {block.text}
          </Typography>
        );
      })}
    </div>
  );
};

export default BlogBody;
