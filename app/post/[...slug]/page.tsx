import { posts } from "#site/content";
import { MoveLeft, Share2 } from "lucide-react";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/shared/mdx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { siteItems } from "@/lib/constants";

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
    authors: { name: siteItems.author },
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
      className="flex h-auto w-full grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg items-center justify-between px-4">
        <Link
          href={`/post`}
          scroll={true}
          aria-label={`Go back to /post`}
          className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
        >
          <MoveLeft className="h-5 w-5" />
          <p className="text-sm font-medium md:text-base">back to blog</p>
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
            <Share2 className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-lg flex-col">
        <h1 className="mb-6 text-3xl font-bold">{post.title}</h1>

        {/* Cover Image */}
        <div className="mb-6 aspect-video h-auto w-full rounded-[12px] border-2 border-dashed p-1 sm:rounded-[16px] sm:p-2">
          <div className="relative h-full w-full overflow-hidden rounded-[8px] shadow-sm">
            <Image src={post.image} alt={`${post.title} cover image.`} fill className="object-cover" />
          </div>
        </div>

        {/* Profile */}
        <div className="mb-1 flex items-center gap-3">
          <Avatar className="rounded-md border">
            <AvatarImage src="https://github.com/msafdev.png" alt="@msafdev" />
            <AvatarFallback className="rounded-md text-muted-foreground">
              MS
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{post.author}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {post.author_email}
            </p>
          </div>
        </div>

        {/* MDX Wrapper */}
        <Mdx code={post.body} />
      </div>
    </article>
  );
}
