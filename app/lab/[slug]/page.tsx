import {
  PiArrowLeftBold,
  PiCodeBlockDuotone,
  PiGithubLogoDuotone,
  PiGridFourDuotone,
  PiShareNetworkDuotone,
  PiStarDuotone,
} from "react-icons/pi";

import { Metadata } from "next";
import Link from "next/link";

import LabCard from "@/components/shared/cards/lab-card";
import Code from "@/components/shared/code";
import Paragraph from "@/components/shared/paragraph";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CodeWrapper from "@/components/motion/code-wrapper";

import { COMPONENTS } from "@/lib/data";
import { getFilePathAndConfig } from "@/lib/server";

interface LabPageProps {
  params: {
    slug: string;
  };
}

function getComponentBySlug(slug: string) {
  return COMPONENTS.find((component) => component.slug === slug);
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const item = getComponentBySlug(params.slug);

  if (!item) {
    return {
      title: "Component Not Found",
      description: "The component you're looking for does not exist.",
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", item.name);

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      type: "article",
      url: `/lab/${item.slug}`,
      images: [
        {
          url: `/api/og/lab?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.name,
      description: item.description,
      images: [`/api/og/lab?${ogSearchParams.toString()}`],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const item = COMPONENTS.find((component) => component.slug === params.slug);

  if (!item) {
    return (
      <section className="pad-x flex h-auto w-full grow flex-col items-center justify-center">
        <h2 className="text-center text-lg font-semibold text-accent-foreground">
          Component Not Found
        </h2>
      </section>
    );
  }

  const { code, twConfig, uiLibrary, cssClass, exampleCodes, customHook } =
    await getFilePathAndConfig(item);

  return (
    <section
      id={`lab-${item?.slug}`}
      className="flex h-auto w-full grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full max-w-lg space-y-10 md:space-y-12 lg:space-y-16">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/lab`}
            scroll={true}
            aria-label={`Go back to /lab`}
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
              href={`https://x.com/intent/tweet?text=${item?.name}&url=https://salmoon.vercel.app/lab/${item?.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              scroll={true}
              aria-label={`Share /lab/${item?.slug}`}
            >
              <PiShareNetworkDuotone className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="w-full space-y-10 md:space-y-12 lg:space-y-16">
          <Paragraph title={item.name}>
            <p>{item.description}</p>
            <div className="flex flex-col gap-y-3">
              <Link
                href={`https://github.com/msafdev/salmoon/tree/main/components/lab/${item.slug}.tsx`}
                target="_blank"
                rel="noopener noreferrer"
                className="anim inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-foreground"
                aria-label="Star the repository"
              >
                <PiStarDuotone />
                Star
              </Link>
              <Link
                href={`https://github.com/msafdev/salmoon/tree/main/lib/utils.ts`}
                target="_blank"
                rel="noopener noreferrer"
                className="anim inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-foreground"
                aria-label="Util files"
              >
                <PiGithubLogoDuotone />
                Utils
              </Link>
            </div>
          </Paragraph>

          {item.example.map((example, index) => (
            <div className="w-full space-y-2" key={index}>
              <Tabs defaultValue="preview">
                <TabsList className="gap-x-8 bg-transparent p-0">
                  <TabsTrigger
                    className="gap-2 px-0 data-[state=active]:shadow-none"
                    value="preview"
                  >
                    <PiGridFourDuotone />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    className="gap-2 px-0 data-[state=active]:shadow-none"
                    value="code"
                  >
                    <PiCodeBlockDuotone />
                    Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <LabCard
                    gridClass={item.gridClass}
                    className="min-h-72"
                    name={example.name}
                  >
                    <example.child />
                  </LabCard>
                </TabsContent>
                <TabsContent value="code">
                  <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
                    <Code code={exampleCodes[index].code} lang="tsx" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>

        {uiLibrary && (
          <div className="w-full space-y-4">
            <Paragraph title="Library setup" />
            <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
              <Code code={uiLibrary} lang="bash" />
            </div>
          </div>
        )}

        {cssClass && (
          <div className="w-full space-y-4">
            <Paragraph title="CSS styling" />
            <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
              <Code code={cssClass} lang="css" />
            </div>
          </div>
        )}

        {twConfig && (
          <div className="w-full space-y-4">
            <Paragraph title="Tailwind config" />
            <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
              <CodeWrapper>
                <Code code={twConfig} lang="json" />
              </CodeWrapper>
            </div>
          </div>
        )}

        {customHook && (
          <div className="w-full space-y-4">
            <Paragraph title="Required hook" />
            <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
              <CodeWrapper>
                <Code code={customHook} lang="ts" />
              </CodeWrapper>
            </div>
          </div>
        )}

        {item.primitive && (
          <div className="w-full space-y-4">
            <Paragraph title="Code" />
            <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
              <CodeWrapper>
                <Code code={code} lang="tsx" />
              </CodeWrapper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
