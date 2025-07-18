import { posts } from "#site/content";

import { LuBadgeCheck } from "react-icons/lu";
import { PiArrowLeft, PiShareNetworkDuotone } from "react-icons/pi";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/shared/mdx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { siteItems } from "@/lib/constants";
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
    return {};
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

  return (
    <article
      id={`${post.slug}`}
      className="flex h-auto w-full grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg items-center justify-between">
        <Link
          href={`/post`}
          scroll={true}
          aria-label={`Go back to /post`}
          className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
        >
          <PiArrowLeft className="size-4" />
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

      <div className="flex w-full max-w-lg flex-col">
        <div className="mb-4 sm:mb-6 space-y-1">
          <h1 className="text-xl font-bold sm:text-2xl">{post.title}</h1>
          <p className="text-sm font-medium text-muted-foreground md:text-base">
            {formatDate(post.date, "mid")}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden rounded sm:mb-6">
          <Image
            src={post.image}
            alt={`${post.title} cover image.`}
            fill
            className="object-cover"
          />
        </div>

        {/* Profile */}
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

        {/* MDX Wrapper */}
        <Mdx code={post.body} />
      </div>
    </article>
  );
}
