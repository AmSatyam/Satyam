import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Typography from "@/components/utils/Typography";
import SubPageNav from "@/components/_components/Shared/SubPageNav";
import PageHeading from "@/components/_components/Shared/PageHeading";
import AccessPanel from "@/components/_components/Work/AccessPanel";
import DocChapters from "@/components/_components/Work/DocChapters";
import LockChip from "@/components/_components/Work/LockChip";
import ProjectShowcase from "@/components/_components/Work/ProjectShowcase";
import {
  PROJECTS,
  getProject,
} from "@/components/_components/Work/projects.data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found — Satyam" };

  return {
    title: `${project.name} — Satyam`,
    description: project.tagline,
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main
      data-theme-surface
      className="ambient-field relative isolate min-h-screen bg-surface text-content">
      <SubPageNav />

      <div className="mx-auto w-full max-w-[1800px] px-6 pt-10 pb-24 sm:px-8 md:px-16 md:pt-16 md:pb-32 2xl:px-26">
        <PageHeading
          overline={project.tagline}
          title={project.name}
          lede={project.summary}
          aside={<LockChip />}
        />

        {/* ------------------------------------------------- The facts row */}
        <dl className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4">
          {project.facts.map((fact) => (
            <div key={fact.label} className="panel-flat rounded-xl px-5 py-5">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-content-subtle uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-content tabular-nums">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="font-mono text-[10px] tracking-[0.18em] text-content-subtle uppercase">
            {project.role} · {project.year}
          </span>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] text-content-subtle">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------------------------------------- Why it is locked */}
        <div className="mt-14 md:mt-16">
          <AccessPanel project={project} />
        </div>

        {/* ----------------------------------------------------- The screens */}
        <section aria-label="Screens" className="mt-24 md:mt-32">
          <Typography variant="overline" className="text-content-subtle">
            The screens
          </Typography>
          <span aria-hidden className="mt-4 block h-1 w-10 bg-accent" />

          <Typography variant="body" className="mt-8 max-w-2xl text-content-muted">
            Open any screen to walk the product full size — arrow keys move
            through the whole tour, Escape closes it.
          </Typography>

          <div className="mt-14">
            <ProjectShowcase project={project} />
          </div>
        </section>

        {/* --------------------------------------------- The documentation */}
        <section aria-label="Documentation" className="mt-24 md:mt-32">
          <Typography variant="overline" className="text-content-subtle">
            Documentation
          </Typography>
          <span aria-hidden className="mt-4 block h-1 w-10 bg-accent" />

          <div className="mt-14">
            <DocChapters chapters={project.chapters} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectPage;
