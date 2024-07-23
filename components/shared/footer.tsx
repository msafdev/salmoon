"use client";

import { useInView } from "framer-motion";
import { Dot } from "lucide-react";

import { useRef } from "react";

import { Licorice } from "next/font/google";
import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";

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
        <div className="flex w-full flex-col items-center justify-between gap-x-4 gap-y-3 text-primary-foreground dark:text-primary md:flex-row">
          <span className={`text-3xl ${licorice.className}`}>Salman</span>
          <div className="flex flex-wrap items-center justify-center gap-x-3 text-sm text-primary-foreground/80 dark:text-primary/80">
            <Link
              className="anim hover:text-primary-foreground dark:hover:text-primary"
              href="https://twitter.com/sal__moon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X.com"
            >
              x.com
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground dark:hover:text-primary"
              href="https://papermark.io/view/cly0hd4dm00023b7qo9s5rn5i"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Curriculum Vitae"
            >
              cv
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground dark:hover:text-primary"
              href="https://instagram.com/msalman_af"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              insta
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground dark:hover:text-primary"
              href="https://linkedin.com/in/muhammadsalmoon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Free Reusable Components"
            >
              linkedin
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col-reverse items-center gap-x-8 gap-y-12 md:flex-row md:items-end">
          <p className="font-mono text-sm text-primary-foreground/60 dark:text-primary/60 md:text-left">
            &copy; 2024 msaf. All rights reserved.
            <br />
            Icons by{" "}
            <Link
              href={"https://icons8.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Icons8"
              className="hover:text-foreground"
            >
              Icons8
            </Link>
          </p>

          <div className="flex flex-col gap-y-3 md:ml-auto">
            <h2 className="text-center font-mono font-semibold uppercase text-primary-foreground dark:text-primary md:text-right">
              Actions
            </h2>
            <div className="flex flex-col items-center gap-y-1 text-center font-mono text-sm text-muted-foreground md:items-end md:text-right">
              <button
                className="anim w-fit hover:text-primary-foreground dark:hover:text-primary"
                onClick={scrollToTop}
              >
                Back to top
              </button>
              <button
                className="anim w-fit hover:text-primary-foreground dark:hover:text-primary"
                onClick={() => {
                  copyToClipboard("salmanalfarisi261002@gmail.com");
                  toast({
                    title: "Copied to clipboard",
                    description: "😉 please use it wisely!",
                    duration: 2000,
                  });
                }}
              >
                Copy my email
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <h2 className="text-center font-mono font-semibold uppercase text-primary-foreground dark:text-primary md:text-right">
              Misc
            </h2>
            <div className="flex flex-col gap-y-1 text-center font-mono text-sm text-muted-foreground md:text-right">
              <Link
                href={"/secret"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Secret
              </Link>
              <Link
                href={"/credits"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Credits
              </Link>
              <Link
                href={"/guestbook"}
                className="anim hover:text-primary-foreground dark:hover:text-primary"
              >
                Guestbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
