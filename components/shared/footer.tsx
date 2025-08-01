"use client";

import { useInView } from "motion/react";
import { toast } from "sonner";

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

import { copyToClipboard } from "@/lib/functions";

const Footer = () => {
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
      className="bg-primary dark:bg-primary-foreground relative flex w-full flex-col px-4 py-12 md:px-8 lg:px-16"
    >
      <div
        className={`mx-auto flex w-full max-w-3xl flex-col items-center gap-y-12 pt-8 pb-20 transition-all duration-500 ease-in-out ${
          isInView
            ? "blur-0 scale-100 opacity-100"
            : "scale-90 opacity-0 blur-md"
        }`}
      >
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          <div className="text-primary-foreground dark:text-primary flex w-full flex-col items-center md:items-start">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              className="mb-2"
            />

            <p className="text-primary-foreground/60 dark:text-foreground/60 mb-4 max-w-64 text-center text-xs leading-relaxed font-medium text-balance md:max-w-full md:text-left">
              Helps create a better web experience for everyone.
            </p>

            <div className="text-primary-foreground/80 dark:text-primary/80 flex flex-row items-center gap-x-6 gap-y-2 text-sm md:flex-col md:items-start">
              <button
                className="anim hover:text-primary-foreground dark:hover:text-primary cursor-pointer"
                aria-label="Back on top"
                onClick={scrollToTop}
              >
                <PiArrowUpBold className="mr-1 inline-block size-3 self-center" />
                top
              </button>
              <button
                className="anim hover:text-primary-foreground dark:hover:text-primary cursor-pointer"
                aria-label="Copy my email"
                onClick={() => {
                  copyToClipboard("salmanalfarisi261002@gmail.com");
                  toast("Copied email to clipboard", {
                    duration: 2000,
                    icon: <PiAtDuotone size={20} />,
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
              <h2 className="text-primary-foreground dark:text-primary text-center text-sm font-semibold md:text-left">
                Resources
              </h2>
              <div className="text-primary-foreground/60 dark:text-foreground/60 flex flex-col gap-y-2 text-center text-sm font-medium md:gap-y-1 md:text-left">
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
              <h2 className="text-primary-foreground dark:text-primary text-center text-sm font-semibold md:text-left">
                Website
              </h2>
              <div className="text-primary-foreground/60 dark:text-foreground/60 flex flex-col gap-y-2 text-center text-sm font-medium md:gap-y-1 md:text-left">
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

          <div className="text-primary-foreground dark:text-primary flex w-full flex-col items-center md:ml-auto md:w-fit md:items-start">
            <p className="mb-2 font-semibold">Stay Connected</p>

            <p className="text-primary-foreground/60 dark:text-foreground/60 mb-4 max-w-64 text-center text-xs leading-relaxed font-medium text-balance md:max-w-48 md:text-left">
              Leave a message or subscribe to my newsletter.
            </p>

            <div className="text-primary-foreground/80 dark:text-primary/80 flex flex-row items-center gap-x-6 text-sm md:flex-col md:items-start">
              <Button
                size={"sm"}
                variant={"ghost"}
                className="group/button h-fit w-fit px-0 py-1 text-white underline decoration-transparent hover:bg-transparent hover:text-white hover:decoration-white"
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
                className="group/button h-fit w-fit px-0 py-1 text-white underline decoration-transparent hover:bg-transparent hover:text-white hover:decoration-white"
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

          <p className="text-primary-foreground/60 dark:text-foreground/60 text-center text-sm leading-relaxed font-medium md:col-span-full md:pt-8">
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
