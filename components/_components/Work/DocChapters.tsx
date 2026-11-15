import Typography from "@/components/utils/Typography";
import type { DocChapter } from "./projects.data";

type DocChaptersProps = {
  chapters: DocChapter[];
};

/**
 * The written half of the case study. Everything that cannot be shown in a
 * screenshot — why it works this way, and what the product guarantees — lives
 * here, keyed off the same data the screens come from.
 */
const DocChapters = ({ chapters }: DocChaptersProps) => (
  <div className="space-y-16">
    {chapters.map((chapter) => (
      <section
        key={chapter.id}
        id={chapter.id}
        aria-label={chapter.label}
        className="scroll-mt-24">
        <div className="flex items-baseline gap-4">
          <Typography as="h3" variant="title" className="text-content">
            {chapter.label}
          </Typography>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {chapter.blocks.map((block) => (
            <div key={block.heading} className="panel-flat rounded-2xl p-6 sm:p-7">
              <Typography
                as="h4"
                variant="caption"
                className="font-mono tracking-[0.18em] text-accent uppercase">
                {block.heading}
              </Typography>

              <Typography variant="caption" className="mt-4 text-content-muted">
                {block.body}
              </Typography>

              {block.points && (
                <ul className="mt-5 space-y-3">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                      />
                      <span className="text-sm leading-6 text-content-muted">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

export default DocChapters;
