import { PiArrowLeftBold, PiShareNetworkDuotone } from "react-icons/pi";

import Link from "next/link";

import LabCard from "@/components/shared/cards/lab-card";
import Code from "@/components/shared/code";
import Paragraph from "@/components/shared/paragraph";

import { Button } from "@/components/ui/button";

import { COMPONENTS } from "@/lib/data";
import { getFilePathAndConfig } from "@/lib/server";

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

  const { code, twConfig, uiLibrary, cssClass } =
    await getFilePathAndConfig(item);

  return (
    <section
      id={`lab-${item?.slug}`}
      className="flex h-auto w-full grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg flex-col gap-y-10 md:gap-y-12 lg:gap-y-16">
        <div className="flex w-full max-w-lg items-center justify-between">
          <Link
            href={`/lab`}
            scroll={true}
            aria-label={`Go back to /lab`}
            className="anim flex items-center gap-x-2 text-muted-foreground hover:text-foreground"
          >
            <PiArrowLeftBold className="h-5 w-5" />
            <p className="text-sm font-medium md:text-base">Go back</p>
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
              rel="noopener noreferrer"
              scroll={true}
              aria-label={`Share /lab/${item?.slug}`}
            >
              <PiShareNetworkDuotone className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="w-full space-y-4">
          <Paragraph title={`${item?.name}`} />
          <LabCard gridClass="default-card" className="min-h-72">
            <item.child />
          </LabCard>
        </div>

        {uiLibrary && (
          <div className="w-full space-y-4">
            <Paragraph title="Library setup" />
            <div className="h-fit w-full max-w-lg rounded-[12px] border border-dashed p-1 sm:rounded-[16px] sm:border-2 sm:p-2">
              <Code code={uiLibrary} lang="bash" />
            </div>
          </div>
        )}

        {cssClass && (
          <div className="w-full space-y-4">
            <Paragraph title="CSS setup" />
            <div className="h-fit w-full max-w-lg rounded-[12px] border border-dashed p-1 sm:rounded-[16px] sm:border-2 sm:p-2">
              <Code code={cssClass} lang="css" />
            </div>
          </div>
        )}

        {twConfig && (
          <div className="w-full space-y-4">
            <Paragraph title="Tailwind setup" />
            <div className="h-fit w-full max-w-lg rounded-[12px] border border-dashed p-1 sm:rounded-[16px] sm:border-2 sm:p-2">
              <Code code={twConfig} lang="json" />
            </div>
          </div>
        )}

        <div className="w-full space-y-4">
          <Paragraph title="Code" />
          <div className="h-fit w-full max-w-lg rounded-[12px] border border-dashed p-1 sm:rounded-[16px] sm:border-2 sm:p-2">
            <Code code={code} lang="tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
