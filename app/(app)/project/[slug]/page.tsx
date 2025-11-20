import { projects } from "#site/content";

import {
  PiArrowLeftBold,
  PiRssDuotone,
  PiShareNetworkDuotone,
} from "react-icons/pi";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXToC, Mdx } from "@/components/shared/mdx";
import { Svg } from "@/components/shared/svg";
import TableOfContents from "@/components/shared/toc";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { projectItems } from "@/lib/assets";
import { siteItems } from "@/lib/config";
import { formatDate } from "@/lib/functions";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

function getProject(slug: string) {
  return projects.find((project) => project.slugAsParams === slug);
}

function getProjectAsset(slug: string) {
  return projectItems.find((project) => project.slug === slug);
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  return projects
    .filter((project) => project.published)
    .map((project) => ({ slug: project.slugAsParams }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProject(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project write-up is not ready yet.",
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", project.title);

  return {
    title: project.title,
    description: project.description,
    authors: { name: siteItems.name },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `/project/${project.slugAsParams}`,
      images: [
        {
          url: `/api/og/post?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [`/api/og/post?${ogSearchParams.toString()}`],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  const projectAsset = getProjectAsset(params.slug);

  if (!project || !project.published || !projectAsset) {
    notFound();
  }

  const tableOfContents = MDXToC({ code: project.body });

  const shareUrl = `https://salmoon.vercel.app/project/${project.slugAsParams}`;

  return (
    <article
      id={project.slug}
      className="relative flex h-auto w-full grow px-4"
    >
      <TableOfContents toc={tableOfContents} />

      <div className="mx-auto w-full max-w-lg space-y-10 md:max-w-md md:space-y-12 lg:max-w-lg lg:space-y-16">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/archive"
            scroll
            aria-label="Go back to archive"
            className="anim text-muted-foreground hover:text-foreground flex items-center gap-x-2"
          >
            <PiArrowLeftBold className="size-4" />
            <p className="text-sm font-medium">Go back</p>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground h-9 w-9"
          >
            <Link
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                project.title,
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              scroll
              aria-label={`Share ${project.title}`}
            >
              <PiShareNetworkDuotone className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-4 space-y-2 sm:mb-6">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Case study
            </p>
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-base font-medium">
              {project.description}
            </p>
          </div>

          {project.stack && project.stack.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
              {project.stack.map((item, index) => (
                <Badge
                  key={index}
                  className="flex h-6 items-center gap-2 border px-2 font-medium [&>svg]:size-3"
                  variant="secondary"
                >
                  <Svg name={item} />
                  {item}
                </Badge>
              ))}
            </div>
          )}

          <div className="relative mb-3 aspect-video w-full overflow-hidden rounded">
            <Image
              src={projectAsset.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 640px, 80vw"
              className="object-cover"
              priority
            />
          </div>

          {(projectAsset.demo || projectAsset.github) && (
            <div className="mb-1 flex items-center gap-3.5">
              {projectAsset.demo && (
                <Button
                  variant="secondary"
                  asChild
                  size="sm"
                  className="flex w-full basis-1/2 items-center font-medium"
                >
                  <Link
                    href={projectAsset.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    <PiRssDuotone className="!size-3.5 shrink-0" />
                    Demo
                  </Link>
                </Button>
              )}
              {projectAsset.github && (
                <Button
                  variant="secondary"
                  asChild
                  size="sm"
                  className="flex w-full basis-1/2 items-center font-medium"
                >
                  <Link
                    href={projectAsset.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    <Svg name="github" className="size-3.5 shrink-0" />
                    Github
                  </Link>
                </Button>
              )}
            </div>
          )}

          <Mdx code={project.body} />
        </div>
      </div>
    </article>
  );
}
