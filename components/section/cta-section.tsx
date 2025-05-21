import Link from "next/link";

import Paragraph from "@/components/shared/paragraph";

const ActionSection = () => {
  return (
    <div className="flex w-full max-w-lg">
      <Paragraph title="Connect">
        <p>
          Leave a mark{" "}
          <Link
            href="/guestbook"
            aria-label="Leave a mark on /guestbook"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            <span className="sr-only">Leave a mark on /guestbook</span>
            here
          </Link>
          , view my code on{" "}
          <Link
            href={"https://github.com/msafdev"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="anim underline underline-offset-2 hover:text-foreground active:text-foreground"
          >
            <span className="sr-only">My GitHub</span>
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
            <span className="sr-only">My Read.cv</span>
            Read.cv
          </Link>
          .
        </p>
      </Paragraph>
    </div>
  );
};

export default ActionSection;
