import { posts } from "#site/content";

import { LuBadgeCheck } from "react-icons/lu";
import { PiArrowLeftBold, PiShareNetworkDuotone } from "react-icons/pi";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXToC, Mdx } from "@/components/shared/mdx";
import TableOfContents from "@/components/shared/toc";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { siteItems } from "@/lib/config";
import { formatDate } from "@/lib/functions";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post you're looking for does not exist.",
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteItems.name },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og/post?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og/post?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  const tableOfContents = MDXToC({ code: post.body });

  return (
    <article id={post.slug} className="relative flex h-auto w-full grow px-4">
      <TableOfContents toc={tableOfContents} />

      <div className="mx-auto w-full max-w-lg space-y-10 md:max-w-md md:space-y-12 lg:max-w-lg lg:space-y-16">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/post`}
            scroll={true}
            aria-label={`Go back to /post`}
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
              href={`https://x.com/intent/tweet?text=${post?.title}&url=https://salmoon.vercel.app/${post?.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              scroll={true}
              aria-label={`Tweet about ${post?.title}`}
            >
              <PiShareNetworkDuotone className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-4 space-y-1 sm:mb-6">
            <h1 className="text-xl font-bold sm:text-2xl">{post.title}</h1>
            <p className="text-sm font-medium text-muted-foreground md:text-base">
              {formatDate(post.date, "mid")}
            </p>
          </div>

          <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden rounded sm:mb-6">
            <Image
              src={post.image}
              alt={`${post.title} cover image.`}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-1 flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-11 rounded-full border">
                <AvatarImage
                  src="https://github.com/msafdev.png"
                  alt="@msafdev"
                />
                <AvatarFallback className="rounded-md text-muted-foreground">
                  MS
                </AvatarFallback>
              </Avatar>

              <LuBadgeCheck
                size={20}
                className="absolute -bottom-1 -right-1 fill-green-500 text-background"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-foreground">
                {siteItems.name}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {siteItems.role}
              </p>
            </div>
          </div>

          <Mdx code={post.body} />
        </div>
      </div>
    </article>
  );
}
