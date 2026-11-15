import type { Metadata } from "next";
import SubPageNav from "@/components/_components/Shared/SubPageNav";
import PageHeading from "@/components/_components/Shared/PageHeading";
import ProjectCard from "@/components/_components/Work/ProjectCard";
import LockChip from "@/components/_components/Work/LockChip";
import { PROJECTS } from "@/components/_components/Work/projects.data";

export const metadata: Metadata = {
  title: "Projects — Satyam",
  description:
    "Deployed products, documented screen by screen. Each one is access-locked; the case study carries the mechanics and the screens.",
};

const ProjectsPage = () => (
  <main
    data-theme-surface
    className="ambient-field relative isolate min-h-screen bg-surface text-content">
    <SubPageNav />

    <div className="mx-auto w-full max-w-[1800px] px-6 pt-10 pb-24 sm:px-8 md:px-16 md:pt-16 md:pb-32 2xl:px-26">
      <PageHeading
        overline="Projects"
        title="Built, shipped, locked"
        lede="These are products in use rather than portfolio pieces, so the deployments stay behind a request. What is open is the whole case study: every screen, how it works, and how access is handled."
        aside={<LockChip label={`${PROJECTS.length} under request`} />}
      />

      <ul className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 xl:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} priority={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default ProjectsPage;
