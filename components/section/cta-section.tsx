import Link from "next/link";

import Paragraph from "@/components/shared/paragraph";

const ActionSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-y-4">
      <Paragraph title="Connect">
        <p>
          See more of my work on{" "}
          <Link
            href={"https://twitter.com/msafdev"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            X
          </Link>
          , view my code on{" "}
          <Link
            href={"https://github.com/msafdev"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            Github
          </Link>
          , or check out how I'm doing on{" "}
          <Link
            href={"https://read.cv/msafdev"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read.cv"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            Read.cv
          </Link>{" "}
          and{" "}
          <Link
            href={"https://www.papermark.io/view/cm605w61700036su48609mo7h"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Papermark"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            Papermark
          </Link>
          .
        </p>
      </Paragraph>
    </div>
  );
};

export default ActionSection;
