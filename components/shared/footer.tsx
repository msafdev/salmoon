"use client";

import { useInView } from "motion/react";

import {
  PiArrowUpBold,
  PiAtBold,
  PiAtDuotone,
  PiHeartFill,
} from "react-icons/pi";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Magnetic } from "@/components/motion/magnetic";

import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/functions";

const Footer = () => {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={ref}
      className="relative flex w-full flex-col bg-primary px-4 py-12 dark:bg-primary-foreground md:px-8 lg:px-16"
    >
      <div
        className={`mx-auto flex w-full max-w-3xl flex-col items-center gap-y-12 pb-20 pt-8 transition-all duration-500 ease-in-out ${
          isInView
            ? "scale-100 opacity-100 blur-0"
            : "scale-90 opacity-0 blur-md"
        }`}
      >
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          <div className="flex w-full flex-col items-center text-primary-foreground dark:text-primary md:items-start">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              className="mb-2"
            />

            <p className="mb-4 max-w-64 text-balance text-center text-xs font-medium leading-relaxed text-primary-foreground/60 dark:text-foreground/60 md:max-w-full md:text-left">
              Helps create a better web experience for everyone.
            </p>

            <div className="flex flex-row items-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80 dark:text-primary/80 md:flex-col md:items-start">
              <button
                className="anim hover:text-primary-foreground dark:hover:text-primary"
                aria-label="Back on top"
                onClick={scrollToTop}
              >
                <PiArrowUpBold className="mr-1 inline-block size-3 self-center" />
                top
              </button>
              <button
                className="anim hover:text-primary-foreground dark:hover:text-primary"
                aria-label="Copy my email"
                onClick={() => {
                  copyToClipboard("salmanalfarisi261002@gmail.com");
                  toast({
                    title: "Copied to clipboard",
                    description: "Please use it wisely",
                    duration: 2000,
                    icon: PiAtDuotone,
                    color: "default",
                  });
                }}
              >
                <PiAtBold className="mr-1 inline-block size-3 self-center" />
                email
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-x-12 gap-y-12 md:flex-row">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-center text-sm font-semibold text-primary-foreground dark:text-primary md:text-left">
                Resources
              </h2>
              <div className="flex flex-col gap-y-2 text-center text-sm font-medium text-primary-foreground/60 dark:text-foreground/60 md:gap-y-1 md:text-left">
                <Link
                  href={"/"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                  prefetch={false}
                >
                  Notion
                </Link>
                <Link
                  href={"/api/feed.xml"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                  prefetch={false}
                >
                  RSS
                </Link>
                <Link
                  href={"/"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                  prefetch={false}
                >
                  Starter Kit
                </Link>
                <Link
                  href={"/"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                  prefetch={false}
                >
                  Link
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="text-center text-sm font-semibold text-primary-foreground dark:text-primary md:text-left">
                Website
              </h2>
              <div className="flex flex-col gap-y-2 text-center text-sm font-medium text-primary-foreground/60 dark:text-foreground/60 md:gap-y-1 md:text-left">
                <Link
                  href={"/learn"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                >
                  Learn
                </Link>
                <Link
                  href={"/bucket-list"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                >
                  Bucket List
                </Link>
                <Link
                  href={"/personal"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                >
                  Personal
                </Link>
                <Link
                  href={"/mentorship"}
                  className="anim hover:text-primary-foreground dark:hover:text-primary"
                >
                  Mentorship
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center text-primary-foreground dark:text-primary md:ml-auto md:w-fit md:items-start">
            <h4 className="mb-2 font-semibold">Stay Connected</h4>

            <p className="mb-4 max-w-64 text-balance text-center text-xs font-medium leading-relaxed text-primary-foreground/60 dark:text-foreground/60 md:max-w-48 md:text-left">
              Leave a message or subscribe to my newsletter.
            </p>

            <div className="flex flex-row items-center gap-x-6 text-sm text-primary-foreground/80 dark:text-primary/80 md:flex-col md:items-start">
              <Button
                size={"sm"}
                variant={"ghost"}
                className="group/button h-fit w-fit px-0 py-2 text-white underline decoration-transparent hover:bg-transparent hover:text-white hover:decoration-white"
                asChild
              >
                <Link href={"/guestbook"} aria-label="My Guestbook">
                  <span className="sr-only">Leave a mark on /guestbook</span>
                  guestbook
                </Link>
              </Button>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="group/button h-fit w-fit px-0 py-2 text-white underline decoration-transparent hover:bg-transparent hover:text-white hover:decoration-white"
                asChild
              >
                <Link
                  href={"https://msafdev.substack.com"}
                  aria-label="My Substack newsletter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">My Substack newsletter</span>
                  newsletter
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-center text-sm font-medium leading-relaxed text-primary-foreground/60 dark:text-foreground/60 md:col-span-full md:pt-8">
            Icons by{" "}
            <Link
              href={"https://icons8.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Icons8"
              className="anim hover:text-primary-foreground dark:hover:text-primary"
              prefetch={false}
            >
              Icons8
            </Link>
            <br />
            &copy; 2024 msaf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
