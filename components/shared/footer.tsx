"use client";

import { useInView } from "framer-motion";

import { useRef } from "react";

import { Licorice } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Magnetic } from "@/components/motion/magnetic";

import { copyToClipboard } from "@/lib/utils";

const licorice = Licorice({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

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
      className="flex w-full flex-col bg-primary px-4 py-12 dark:bg-primary-foreground md:px-8 lg:px-16"
    >
      <div
        className={`mx-auto flex w-full max-w-3xl flex-col items-center gap-y-12 pb-20 pt-8 transition-all duration-500 ease-in-out ${
          isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="flex w-full flex-col items-center justify-between gap-4 text-primary-foreground dark:text-primary md:flex-row">
          <span className={`text-3xl ${licorice.className}`}>Salman</span>
          <div className="flex flex-wrap items-center justify-center gap-y-3 text-sm text-primary-foreground/80 dark:text-primary/80">
            <button
              className="anim px-3 hover:text-primary-foreground dark:hover:text-primary"
              aria-label="Back on top"
              onClick={scrollToTop}
            >
              top
            </button>
            <button
              className="anim px-3 hover:text-primary-foreground dark:hover:text-primary"
              aria-label="Copy my email"
              onClick={() => {
                copyToClipboard("salmanalfarisi261002@gmail.com");
                toast({
                  title: "Copied to clipboard",
                  description: "😉 please use it wisely!",
                  duration: 2000,
                });
              }}
            >
              email
            </button>
            <Magnetic
              intensity={0.2}
              springOptions={{ bounce: 0.1 }}
              actionArea="global"
              range={100}
            >
              <Button
                size={"sm"}
                variant={"ghost"}
                className="pr-0 text-white hover:bg-transparent hover:text-white"
              >
                <Link href={"/guestbook"} aria-label="My Guestbook">
                  <span className="sr-only">Leave a mark on /guestbook</span>
                  guestbook
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="flex w-full flex-col-reverse items-center gap-x-8 gap-y-12 md:flex-row md:items-end">
          <p className="text-center text-sm font-medium text-primary-foreground/60 dark:text-foreground/60 md:text-left">
            &copy; 2024 msaf. All rights reserved.
            <br />
            Icons by{" "}
            <Link
              href={"https://icons8.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Icons8"
              className="anim hover:text-primary-foreground dark:hover:text-primary"
            >
              Icons8
            </Link>
          </p>

          <div className="flex flex-col gap-y-3 md:ml-auto">
            <h2 className="text-center font-mono font-semibold uppercase text-primary-foreground dark:text-primary md:text-right">
              Resources
            </h2>
            <div className="flex flex-col items-center gap-y-2 text-center text-sm font-medium text-primary-foreground/60 dark:text-foreground/60 md:items-end md:text-right">
              <Link
                href={"/material"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Starter Kit
              </Link>
              <Link
                href={"/material"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Notion
              </Link>
              <Link
                href={"/material"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Analytics
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <h2 className="text-center font-mono font-semibold uppercase text-primary-foreground dark:text-primary md:text-right">
              Site
            </h2>
            <div className="flex flex-col gap-y-2 text-center text-sm font-medium text-primary-foreground/60 dark:text-foreground/60 md:text-right">
              <Link
                href={"/bucket-list"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Bucket List
              </Link>
              <Link
                href={"/material"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Material
              </Link>
              <Link
                href={"/personal"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Personal
              </Link>
              <Link
                href={"/attribution"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Attribution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
