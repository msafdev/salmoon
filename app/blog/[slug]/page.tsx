import { baseUrl } from "@/app/sitemap";
import { MoveLeft, Share2 } from "lucide-react";
import { BundledLanguage } from "shiki";

import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/components/shared/blog-card";
import Code from "@/components/shared/code";

import { Button } from "@/components/ui/button";

import { getPost, getPosts } from "@/lib/gql";
import { Post } from "@/lib/types";

const extractLanguage = (codeString: string) => {
  const match = codeString.match(/^\/\/(\w+)/m);
  const lang = match ? match[1] : "plaintext";
  const code = match
    ? codeString.slice(match[0].length).trimStart()
    : codeString;
  return { lang, code };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPost({ slug: params.slug });
  if (!posts) {
    return null;
  }

  const title = posts.postsConnection?.edges[0].node.title;
  const content = posts.postsConnection?.edges[0].node.content;
  const excerpt = posts.postsConnection?.edges[0].node.excerpt;
  const updatedAt = posts.postsConnection?.edges[0].node.updatedAt;
  const slug = posts.postsConnection?.edges[0].node.slug;

  const ogImage = `${baseUrl}/og`;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      content,
      type: "article",
      updatedAt,
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      content,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getPost({ slug: params.slug });

  const post = posts?.postsConnection?.edges[0].node;

  const renderInlineStyles = (children: any[]) => {
    return children.map((child: any, index: number) => {
      let element = child.text;
      if (child.bold) {
        element = (
          <span key={index} className="font-semibold text-foreground">
            {element}
          </span>
        );
      }
      if (child.italic) {
        element = (
          <em key={index} className="text-foreground/80">
            {element}
          </em>
        );
      }
      if (child.underline) {
        element = (
          <u key={index} className="text-muted-foreground">
            {element}
          </u>
        );
      }
      if (child.code) {
        element = (
          <code key={index} className="text-foreground/80">
            {element}
          </code>
        );
      }
      if (child.href) {
        element = (
          <a
            key={index}
            className="font-medium text-primary hover:underline"
            href={child.href}
            target={child.openInNewTab ? "_blank" : "_self"}
          >
            {child.children[0].text}
          </a>
        );
      }
      return element;
    });
  };

  const renderChildren = (children: any[]) => {
    return children.map((child: any, index: number) => {
      switch (child.type) {
        case "heading-one":
          return (
            <h1 className="my-6 text-2xl font-bold" key={index}>
              {child.children[0].text}
            </h1>
          );
        case "heading-two":
          return (
            <h2 className="my-5 text-xl font-semibold" key={index}>
              {child.children[0].text}
            </h2>
          );
        case "heading-three":
          return (
            <h3 className="my-4 text-lg font-semibold" key={index}>
              {child.children[0].text}
            </h3>
          );
        case "heading-four":
          return (
            <h4 className="my-4 text-lg font-medium" key={index}>
              {child.children[0].text}
            </h4>
          );
        case "heading-five":
          return (
            <h5 className="my-4 text-base font-medium" key={index}>
              {child.children[0].text}
            </h5>
          );
        case "paragraph":
          return (
            <p
              className="mb-4 text-sm text-muted-foreground md:text-base"
              key={index}
            >
              {renderInlineStyles(child.children)}
            </p>
          );
        case "block-quote":
          return (
            <blockquote
              className="mb-4 border-l-2 border-primary bg-accent px-4 py-2 text-xs font-medium text-accent-foreground md:text-sm"
              key={index}
            >
              {child.children[0].text}
            </blockquote>
          );
        case "code-block":
          const { lang, code } = extractLanguage(child.children[0].text);
          return (
            <div
              key={index}
              className="mb-4 h-fit w-full max-w-xl rounded-xl border p-2"
            >
              <Code code={code} lang={lang as BundledLanguage} />
            </div>
          );
        case "image":
          return (
            <div key={index} className="mb-4 aspect-auto max-w-xl">
              <Image
                src={child.src || ""}
                alt={child.title || "alt text"}
                title={child.title || ""}
                width={child.width}
                height={child.height}
                className="object-cover"
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <section
      id={`${post?.slug}`}
      className="flex h-auto w-full grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      {/* Header */}
      <div className="flex w-full max-w-xl items-center justify-between">
        <Link
          href={`/blog`}
          scroll={true}
          aria-label={`Go back to /blog`}
          className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
        >
          <MoveLeft className="h-5 w-5" />
          <p className="text-xs font-medium md:text-sm">back to blog</p>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-9 w-9 text-muted-foreground"
        >
          <Link
            href={`https://x.com/intent/tweet?text=${post?.title}&url=https://salmoon.vercel.app/blog/${post?.slug}`}
            target="_blank"
            scroll={true}
            aria-label={`Go to /blog/${post?.slug}`}
          >
            <Share2 className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-xl flex-col">
        <h1 className="mb-6 text-2xl font-semibold">{post?.title}</h1>

        <pre className="mb-4 w-full max-w-xl whitespace-pre-wrap text-wrap text-xs text-muted-foreground md:text-sm">
          {post?.excerpt}
        </pre>

        {post?.content.raw.children &&
          renderChildren(post.content.raw.children)}
      </div>

      {post?.updatedAt && (
        <div className="flex w-full max-w-xl items-center justify-end">
          <p className="text-sm text-foreground">
            Last updated on {formatDate(post.updatedAt)}
          </p>
        </div>
      )}
    </section>
  );
}
