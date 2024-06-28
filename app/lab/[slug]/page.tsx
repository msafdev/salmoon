import Link from "next/link";

import fs from "fs";
import path from "path";
import { promisify } from "util";

import { COMPONENTS } from "@/lib/data";

import { Button } from "@/components/ui/button";
import Paragraph from "@/components/shared/paragraph";
import LabCard from "@/components/shared/lab-card";
import Code from "@/components/shared/code";

import { MoveLeft, Share2 } from "lucide-react";

async function readFilePath(filePath: string) {
  const readFile = promisify(fs.readFile);
  const fileContent = await readFile(
    path.join(process.cwd(), filePath),
    "utf8"
  );

  return fileContent.trim();
}

export async function generateStaticParams() {
  const componentSlugs = COMPONENTS.map((component) => ({
    slug: component.slug,
  }));

  return componentSlugs;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { slug: string } }) {
  const item = COMPONENTS.find((component) => component.slug === params.slug);

  if (!item) {
    return (
      <section className="pad-x flex h-auto w-full grow flex-col items-center justify-center">
        <h1 className="text-center text-xl font-semibold text-accent-foreground">
          Component Not Found
        </h1>
      </section>
    );
  }

  const filePath = `./components/lab/${item?.slug.replace(/\s+/g, "")}.tsx`;

  const code = await readFilePath(filePath)
    .catch(() => {
      return `// ${item?.name} component not found`;
    })
    .then((data) => data);

  const twConfig = JSON.stringify(item?.twConfig, null, 2);

  return (
    <section
      id={`lab-${item?.slug}`}
      className="flex flex-col h-auto grow w-full items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex flex-col w-full max-w-xl gap-y-10 md:gap-y-12 lg:gap-y-16">
        {/* Header */}
        <div className="flex items-center w-full justify-between max-w-xl">
          <Link
            href={`/lab`}
            scroll={true}
            aria-label={`Go back to /lab`}
            className="flex items-center gap-x-2 text-muted-foreground hover:text-foreground anim"
          >
            <MoveLeft className="h-5 w-5" />
            <p className="text-xs md:text-sm font-medium">back to lab</p>
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
              scroll={true}
              aria-label={`Go back to /lab`}
            >
              <Share2 className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full max-w-xl gap-y-4 sm:gap-y-6">
          <Paragraph title={`${item?.name}`} />
          <LabCard button={false} gridClass="detail-card">
            <item.child />
          </LabCard>
        </div>

        {twConfig && (
          <div className="flex flex-col w-full max-w-xl gap-y-4 sm:gap-y-6">
            <Paragraph title="Tailwind Setup" />
            <div className="w-full h-fit max-w-xl p-2 border rounded-xl">
              <Code code={twConfig} />
            </div>
          </div>
        )}

        {/* Code */}
        <div className="flex flex-col w-full max-w-xl gap-y-4 sm:gap-y-6">
          <Paragraph title="Code" />
          <div className="w-full h-fit max-w-xl p-2 border rounded-xl">
            <Code code={code} />
          </div>
        </div>
      </div>
    </section>
  );
}
