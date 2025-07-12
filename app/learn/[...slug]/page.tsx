import { learns } from "#site/content";
import { getPrevAndNext } from "@/velite/learn";

import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiChecksDuotone,
  PiShareNetworkDuotone,
} from "react-icons/pi";

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXToC, Mdx } from "@/components/shared/mdx";
import TableOfContents from "@/components/shared/toc";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { siteItems } from "@/lib/constants";

interface LearnPageProps {
  params: {
    slug: string[];
  };
}

async function getLearnFromParams(params: LearnPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const learn = learns.find((l) => l.slugAsParams === slug);

  return learn;
}

export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const learn = await getLearnFromParams(params);

  if (!learn) return {};

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", learn.title);

  return {
    title: learn.title,
    description: learn.description,
    authors: { name: siteItems.name },
    openGraph: {
      title: learn.title,
      description: learn.description,
      type: "article",
      url: learn.slug,
      images: [
        {
          url: `/api/og/post?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: learn.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: learn.title,
      description: learn.description,
      images: [`/api/og/post?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  LearnPageProps["params"][]
> {
  return learns.map((learn) => ({
    slug: learn.slugAsParams.split("/"),
  }));
}

export default async function LearnPage({ params }: LearnPageProps) {
  const learn = await getLearnFromParams(params);

  if (!learn || !learn.published) notFound();

  const tableOfContents = MDXToC({ code: learn.body });

  const { prev, next } = getPrevAndNext(learns, learn);

  return (
    <article id={learn.slug} className="relative flex h-auto w-full grow px-4">
      <TableOfContents toc={tableOfContents} />

      <div className="flex w-full flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24">
        <div className="flex w-full max-w-sm items-center justify-between lg:max-w-md xl:max-w-lg">
          <Link
            href="/learn"
            scroll
            aria-label={`Go back to /learn`}
            className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
          >
            <PiArrowLeftBold className="size-4" />
            <p className="text-sm font-medium">Go back</p>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-9 w-9 text-muted-foreground"
          >
            <Link
              href={`https://x.com/intent/tweet?text=${learn?.title}&url=https://salmoon.vercel.app/${learn?.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              scroll
              aria-label={`Tweet about ${learn?.title}`}
            >
              <PiShareNetworkDuotone className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex w-full max-w-sm flex-col lg:max-w-md xl:max-w-lg">
          <div className="mb-6 flex flex-col gap-y-0.5 sm:gap-y-1">
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
              {learn.title}
            </h1>
            <p className="text-sm font-medium text-muted-foreground sm:text-base md:text-lg">
              Chapter {learn.chapter}
            </p>
          </div>

          <div className="mb-1 flex items-center gap-3">
            <Avatar className="rounded-md border">
              <AvatarImage
                src="https://github.com/msafdev.png"
                alt="@msafdev"
              />
              <AvatarFallback className="rounded-md text-muted-foreground">
                MS
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-foreground">
                {siteItems.name}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {siteItems.role}
              </p>
            </div>
          </div>

          <Mdx code={learn.body} />
        </div>

        {next || prev ? (
          <div className="flex w-full max-w-sm items-center justify-between lg:max-w-md xl:max-w-lg">
            {prev && (
              <Button
                className="flex items-center border-2 border-dashed"
                variant={"outline"}
              >
                <Link href={`/learn/${prev.slugAsParams}`}>
                  <PiArrowLeftBold className="mr-2 inline" size={16} />{" "}
                  {prev.title}
                </Link>
              </Button>
            )}
            {next && (
              <Button
                className="ml-auto flex items-center border-2 border-dashed"
                variant={"outline"}
              >
                <Link href={`/learn/${next.slugAsParams}`}>
                  {next.title}{" "}
                  <PiArrowRightBold className="ml-2 inline" size={16} />
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="h-24 w-0.5 bg-gradient-to-b from-transparent to-green-500/20 md:h-36" />
            <div className="rounded-full bg-green-500/20 p-4">
              <PiChecksDuotone size={24} className="text-green-500" />
            </div>
            <h3 className="mt-4 text-center text-xs font-medium md:mt-6">
              You have finished everything in this course
            </h3>
          </div>
        )}
      </div>
    </article>
  );
}
