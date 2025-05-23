import { ArrowRight } from "lucide-react";

import * as React from "react";
import * as runtime from "react/jsx-runtime";

import Image from "next/image";

import Code from "@/components/shared/code";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn, extractCode } from "@/lib/utils";

type ComponentsProps = React.HTMLAttributes<HTMLElement>;

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export const globalComponents = {
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1 className={cn("mb-4 mt-6 text-2xl font-bold", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentsProps) => (
    <h2 className={cn("mb-4 mt-6 text-xl font-bold", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3 className={cn("mb-4 mt-6 text-base font-bold", className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentsProps) => (
    <h4
      className={cn("mb-4 mt-6 text-base font-semibold", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentsProps) => (
    <h5
      className={cn("mb-4 mt-5 text-base font-semibold", className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentsProps) => (
    <h6 className={cn("mb-4 mt-5 text-sm font-medium", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentsProps) => (
    <p
      className={cn(
        "mb-4 text-sm text-muted-foreground md:text-base",
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
      target={props.target || "_self"}
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
        "mb-4 border-l-2 border-primary px-4 py-1 text-sm font-medium italic text-muted-foreground md:text-base [&>p]:mb-0",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: ComponentsProps) => (
    <code
      className={cn("font-mono text-sm text-foreground", className)}
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
      <div className="w-full max-w-lg rounded-[12px] border border-dashed p-1 sm:rounded-[16px] sm:border-2 sm:p-2">
        <Code
          code={rawCode.trim()}
          lang={lang}
          lineNumber
          lineShine
          {...props}
        />
      </div>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-4 list-none [&_li]:text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-4 list-decimal pl-5 [&_li]:pl-2 [&_li]:text-muted-foreground [&_svg]:hidden",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <div className="mt-2 flex items-start gap-2">
      <ArrowRight size={12} className="mt-[5px] !text-foreground" />
      <li
        className={cn("text-sm [&>p]:mb-0 [&>p]:text-sm", className)}
        {...props}
      />
    </div>
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("italic text-muted-foreground", className)} {...props} />
  ),
  u: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <u
      className={cn("text-muted-foreground underline", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-6 border-muted", className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border">
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
      className={cn("h-fit py-2 text-muted-foreground", className)}
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
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <div className="mb-4 aspect-auto max-w-lg overflow-hidden rounded-[16px] border border-dashed p-1 sm:rounded-[20px] sm:border-2 sm:p-2">
      <img
        className={cn(
          "h-full w-full rounded-[12px] border shadow-sm",
          className,
        )}
        alt={alt}
        {...props}
      />
    </div>
  ),
  Image,
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
  [key: string]: any;
}

export function Mdx({ code, components, ...props }: MDXProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component
        components={{ ...globalComponents, ...components }}
        {...props}
      />
    </div>
  );
}
