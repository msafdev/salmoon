import { swifts } from "#site/content";

import { LuBadgeCheck } from "react-icons/lu";
import {
  PiArrowLeftBold,
  PiCodeBlockDuotone,
  PiGridFourDuotone,
  PiShareNetworkDuotone,
} from "react-icons/pi";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Code from "@/components/shared/code";
import { MDXToC, Mdx } from "@/components/shared/mdx";
import Paragraph from "@/components/shared/paragraph";
import TableOfContents from "@/components/shared/toc";

import { TextHighlighter } from "@/components/shared/highlighter";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { siteItems } from "@/lib/config";
import { formatDate } from "@/lib/functions";

interface SwiftPageProps {
  params: {
    slug: string[];
  };
}

async function getSwiftFromParams(params: SwiftPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const swift = swifts.find((swift) => swift.slugAsParams === slug);

  return swift;
}

export async function generateMetadata({
  params,
}: SwiftPageProps): Promise<Metadata> {
  const swift = await getSwiftFromParams(params);

  if (!swift) {
    return {
      title: "Component Not Found",
      description: "The component you're looking for does not exist.",
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", swift.title);

  return {
    title: swift.title,
    description: swift.description,
    authors: { name: siteItems.name },
    openGraph: {
      title: swift.title,
      description: swift.description,
      type: "article",
      url: swift.slug,
      images: [
        {
          url: `/api/og/post?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: swift.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: swift.title,
      description: swift.description,
      images: [`/api/og/post?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  SwiftPageProps["params"][]
> {
  return swifts.map((swift) => ({ slug: swift.slugAsParams.split("/") }));
}

export default async function SwiftPage({ params }: SwiftPageProps) {
  const swift = await getSwiftFromParams(params);

  if (!swift || !swift.published) {
    notFound();
  }

  const tableOfContents = [
    { depth: 2, value: "Overview" },
    ...MDXToC({ code: swift.body }),
    ...(swift.components?.map((component) => ({
      depth: 2,
      value: component.name,
    })) || []),
  ];

  return (
    <article id={swift.slug} className="relative flex h-auto w-full grow px-4">
      <TableOfContents toc={tableOfContents} />

      <div className="mx-auto w-full max-w-lg space-y-10 md:max-w-md md:space-y-12 lg:max-w-lg lg:space-y-16">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/swift`}
            scroll={true}
            aria-label={`Go back to /swift`}
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
              href={`https://x.com/intent/tweet?text=${swift?.title}&url=https://salmoon.vercel.app/${swift?.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              scroll={true}
              aria-label={`Tweet about ${swift?.title}`}
            >
              <PiShareNetworkDuotone className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-4 space-y-1 sm:mb-6">
            <h1 className="text-xl font-bold sm:text-2xl">{swift.title}</h1>
            <p className="text-muted-foreground text-sm font-medium md:text-base">
              {formatDate(swift.date, "mid")}
            </p>
          </div>

          <div className="relative mb-4 aspect-[4/3] h-auto w-full overflow-hidden rounded sm:mb-6">
            <Image
              src={swift.image}
              alt={`${swift.title} cover image.`}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-10 flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-11 rounded-full border">
                <AvatarImage
                  src="https://github.com/msafdev.png"
                  alt="@msafdev"
                />
                <AvatarFallback className="text-muted-foreground rounded-md">
                  MS
                </AvatarFallback>
              </Avatar>

              <LuBadgeCheck
                size={20}
                className="text-background absolute -right-1 -bottom-1 fill-green-500"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-foreground text-sm font-semibold">
                {siteItems.name}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                {siteItems.role}
              </p>
            </div>
          </div>

          <TextHighlighter slug={swift.slug} className="w-full space-y-10 md:space-y-12 lg:space-y-16">
            <Paragraph title="Overview">
              <Mdx code={swift.body} />
            </Paragraph>

            {swift.components &&
              swift.components.map((component, index) => (
                <div className="w-full space-y-4" key={index}>
                  <Paragraph title={component.name} />
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
                      {component.implementation && (
                        <TabsTrigger
                          className="gap-2 px-0 data-[state=active]:shadow-none"
                          value="implementation"
                        >
                          <PiCodeBlockDuotone />
                          Implementation
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <TabsContent value="preview">
                      <div className="bg-muted relative aspect-video w-full overflow-hidden rounded border-2 border-dashed">
                        <Image
                          src={component.image}
                          alt={component.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="code">
                      <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
                        <Code code={component.code} lang="swift" />
                      </div>
                    </TabsContent>
                    {component.implementation && (
                      <TabsContent value="implementation">
                        <div className="h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
                          <Code code={component.implementation} lang="swift" />
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              ))}
          </TextHighlighter>
        </div>
      </div>
    </article>
  );
}
