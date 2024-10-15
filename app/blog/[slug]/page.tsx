import { baseUrl } from "@/app/sitemap";
import { MoveLeft, Share2 } from "lucide-react";
import { BundledLanguage } from "shiki";

import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/components/shared/cards/blog-card";
import Code from "@/components/shared/code";

import { Button } from "@/components/ui/button";

import { getPost } from "@/lib/gql";

export const dynamic = "force-dynamic";

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
  const updatedAt = posts.postsConnection?.edges[0].node.updatedAt;
  const slug = posts.postsConnection?.edges[0].node.slug;
  const ogImage = `${baseUrl}/og/blog/?title=${title}`;
  const keywords = [
    "salmoon",
    "salman",
    "msafdev",
    "blog",
    "design",
    "portfolio",
    "article",
    "website developer",
    "design engineer",
  ];

  return {
    title: `Msafdev | ${title}`,
    description: `Read more about "${title}" on my blog.`,
    keywords,
    publishedAt: updatedAt,
    applicationName: "Msafdev",
    openGraph: {
      title: `Msafdev | ${title}`,
      description: `Read more about "${title}" on my blog.`,
      type: "article",
      publishedAt: updatedAt,
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Msafdev | ${title}`,
      description: `Read more about "${title}" on my blog.`,
      images: [ogImage],
    },
    icons: {
      icon: `/favicon.ico`,
    },
    verification: {
      google: "o2JC_24yWCXt25B4cLk_3kF-RTSQDBNab7JNqh33cHU",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getPost({ slug: params.slug });

  const post = posts?.postsConnection?.edges[0].node;

  const extractLanguage = (codeString: string) => {
    const match = codeString.match(/^\/\/(\w+)/m);
    const lang = match ? match[1] : "tsx";
    const code = match
      ? codeString.slice(match[0].length).trimStart()
      : codeString;
    return { lang, code };
  };

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
          <code key={index} className="text-sm text-foreground/80">
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
            aria-label={child.children[0].text}
            rel={child.openInNewTab ? "noopener noreferrer" : ""}
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
              className="mb-4 border-l-2 border-primary px-4 py-1 text-xs font-medium italic text-muted-foreground md:text-sm"
              key={index}
            >
              {child.children[0].text}
            </blockquote>
          );
        case "code-block":
          const { code, lang } = extractLanguage(child.children[0].text);
          return (
            <div
              key={index}
              className="mb-4 h-fit w-full max-w-sm rounded-xl border p-2"
            >
              <Code code={code} lang={lang as BundledLanguage} />
            </div>
          );
        case "image":
          return (
            <div
              key={index}
              className="mb-4 aspect-auto max-w-sm rounded-xl border p-2"
            >
              <Image
                src={child.src || ""}
                alt={child.title || "alt text"}
                title={child.title || ""}
                width={child.width}
                height={child.height}
                className="rounded-lg object-cover"
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
      <div className="flex w-full max-w-sm items-center justify-between">
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
            href={`https://x.com/intent/tweet?text=${post?.title}&url=https://msaf.tech/blog/${post?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            scroll={true}
            aria-label={`Go to /blog/${post?.slug}`}
          >
            <Share2 className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-sm flex-col">
        <h1 className="mb-6 text-2xl font-semibold">{post?.title}</h1>

        <pre className="mb-4 w-full max-w-sm whitespace-pre-wrap text-wrap text-xs text-muted-foreground md:text-sm">
          {post?.excerpt}
        </pre>

        {post?.content.json.children &&
          renderChildren(post.content.json.children)}
      </div>

      {post?.updatedAt && (
        <div className="flex w-full max-w-sm items-center justify-end">
          <p className="text-sm text-foreground">
            Last updated on {formatDate(post.updatedAt)}
          </p>
        </div>
      )}
    </section>
  );
}
