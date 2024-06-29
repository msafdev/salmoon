import { MoveLeft, Share2 } from "lucide-react";

import Link from "next/link";

import Code from "@/components/shared/code";
import LabCard from "@/components/shared/lab-card";
import Paragraph from "@/components/shared/paragraph";

import { Button } from "@/components/ui/button";

import { COMPONENTS } from "@/lib/data";
import { getFilePathAndConfig } from "@/lib/functions";

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
        <h2 className="text-center text-xl font-semibold text-accent-foreground">
          Component Not Found
        </h2>
      </section>
    );
  }

  const { code, twConfig } = await getFilePathAndConfig(item);

  return (
    <section
      id={`lab-${item?.slug}`}
      className="flex h-auto w-full grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-xl flex-col gap-y-10 md:gap-y-12 lg:gap-y-16">
        {/* Header */}
        <div className="flex w-full max-w-xl items-center justify-between">
          <Link
            href={`/lab`}
            scroll={true}
            aria-label={`Go back to /lab`}
            className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
          >
            <MoveLeft className="h-5 w-5" />
            <p className="text-xs font-medium md:text-sm">back to lab</p>
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
        <div className="flex w-full max-w-xl flex-col gap-y-5">
          <Paragraph title={`${item?.name}`} />
          <LabCard gridClass="default-card" className="min-h-72">
            <item.child />
          </LabCard>
        </div>

        {twConfig && (
          <div className="flex w-full max-w-xl flex-col gap-y-5">
            <Paragraph title="Tailwind Setup" />
            <div className="h-fit w-full max-w-xl rounded-xl border p-2">
              <Code code={twConfig} lang="json" />
            </div>
          </div>
        )}

        {/* Code */}
        <div className="flex w-full max-w-xl flex-col gap-y-5">
          <Paragraph title="Code" />
          <div className="h-fit w-full max-w-xl rounded-xl border p-2">
            <Code code={code} />
          </div>
        </div>
      </div>
    </section>
  );
}
