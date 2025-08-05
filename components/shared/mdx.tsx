import { PiArrowRightBold } from "react-icons/pi";

import * as React from "react";
import * as runtime from "react/jsx-runtime";

import Image, { ImageProps } from "next/image";

import { Toc } from "@stefanprobst/rehype-extract-toc";

import Code from "@/components/shared/code";
import ActivityWidget from "@/components/shared/widgets/activity-widget";
import RepoWidget from "@/components/shared/widgets/repo-widget";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { extractCode } from "@/lib/functions";
import { cn } from "@/lib/utils";
import "@/styles/mdx.css";

type ComponentsProps = React.HTMLAttributes<HTMLElement>;

type GithubProps = React.HTMLAttributes<HTMLElement> & {
  repo: string;
};

type ActivityProps = React.HTMLAttributes<HTMLElement> & {
  user: string;
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return {
    Component: fn({ ...runtime }).default,
    TableOfContents: fn({ ...runtime }).toc as Toc,
  };
};

export const globalComponents = {
  RepoWidget: ({ className, repo, ...props }: GithubProps) => (
    <RepoWidget className={cn("mb-4", className)} repo={repo} {...props} />
  ),
  ActivityWidget: ({ className, user, ...props }: ActivityProps) => (
    <ActivityWidget className={cn("mb-4", className)} user={user} {...props} />
  ),
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1 className={cn("mt-6 mb-4 text-2xl font-bold", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentsProps) => (
    <h2 className={cn("mt-6 mb-4 text-xl font-bold", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3 className={cn("mt-6 mb-4 text-base font-bold", className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentsProps) => (
    <h4
      className={cn("mt-6 mb-4 text-base font-semibold", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentsProps) => (
    <h5
      className={cn("mt-5 mb-4 text-base font-semibold", className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentsProps) => (
    <h6 className={cn("mt-5 mb-4 text-sm font-medium", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentsProps) => (
    <p
      className={cn(
        "text-muted-foreground mb-4 text-sm md:text-base",
        className,
      )}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("text-primary hover:underline", className)}
      href={href}
      target="_blank"
      rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={typeof children === "string" ? children : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote
      className={cn(
        "mdx mb-4 border-s-2 border-zinc-500 bg-linear-to-r from-zinc-500/20 to-transparent px-4 py-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400 [&>p]:mb-0",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: ComponentsProps) => (
    <code
      className={cn(
        "border-border bg-muted text-foreground rounded-md border px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ className, children, ...props }: ComponentsProps) => {
    const codeElement = Array.isArray(children) ? children[0] : children;

    const rawCode = extractCode((codeElement as any)?.props?.children);

    const lang = (props as any)?.["data-language"];

    return (
      <div className="mb-4 h-fit w-full max-w-lg rounded border-2 border-dashed p-1 sm:p-2">
        <Code code={rawCode} lang={lang} lineNumber lineShine {...props} />
      </div>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("[&_li]:text-muted-foreground my-4 list-none", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "[&_li]:text-muted-foreground my-4 list-decimal pl-5 [&_li]:pl-2 [&_svg]:hidden",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mt-2 flex items-start gap-2">
      <PiArrowRightBold
        size={12}
        className="text-foreground! mt-[5px] shrink-0"
      />
      <span
        className={cn("text-sm [&>p]:mb-0 [&>p]:text-sm", className)}
        {...props}
      />
    </li>
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("text-muted-foreground italic", className)} {...props} />
  ),
  u: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <u
      className={cn("text-muted-foreground underline", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded border">
      <Table className={cn("", className)} {...props} />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableHeader className={cn("bg-muted", className)} {...props} />
  ),
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableBody className={cn("", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow className={cn("", className)} {...props} />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <TableHead
      className={cn("text-muted-foreground h-fit py-2", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableCell
      className={cn("py-2.5 text-xs font-medium", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt = "",
    width = 800,
    height = 600,
    ...props
  }: Omit<ImageProps, "src"> & { src: string }) => (
    <div className="relative mb-4 aspect-auto max-w-lg overflow-hidden rounded border-2 border-dashed p-1 sm:p-2">
      <Image
        className={cn("h-auto w-full rounded border shadow-xs", className)}
        alt={alt}
        fill
        loading="lazy"
        {...props}
      />
    </div>
  ),
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
  [key: string]: any;
}

export function Mdx({ code, components, ...props }: MDXProps) {
  const { Component } = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component
        components={{ ...globalComponents, ...components }}
        {...props}
      />
    </div>
  );
}

export function MDXToC({ code }: { code: string }) {
  const { TableOfContents } = useMDXComponent(code);

  return TableOfContents;
}
