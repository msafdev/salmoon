"use client";

import { useRef } from "react";

import Link from "next/link";
import { Licorice } from "next/font/google";

import { useInView } from "framer-motion";

import { Dot } from "lucide-react";

const licorice = Licorice({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <footer
      ref={ref}
      className={`flex flex-col w-full px-4 md:px-8 lg:px-16 py-12 bg-primary`}
    >
      <div
        className={`max-w-3xl flex flex-col items-center py-8 mx-auto w-full gap-y-12 transition-all duration-500 ease-in-out ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-x-4 gap-y-3 justify-between text-primary-foreground w-full">
          <span className={`text-3xl ${licorice.className}`}>Salman</span>
          <div className="flex flex-wrap justify-center items-center text-primary-foreground/80 text-sm gap-x-3">
            <Link
              className="anim hover:text-primary-foreground"
              href=""
              aria-label="Twitter / X.com"
            >
              x.com
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground"
              href=""
              aria-label="Dribbble"
            >
              dribbble
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground"
              href=""
              aria-label="Instagram"
            >
              insta
            </Link>
            <Dot size={12} />
            <Link
              className="anim hover:text-primary-foreground"
              href=""
              aria-label="Free Reusable Components"
            >
              free components
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex md:flex-row flex-col-reverse w-full gap-x-8 gap-y-6 items-center md:items-end">
          <p className="text-primary-foreground/60 text-sm md:text-center font-mono">
            &copy; 2024 msaf. All rights reserved.
          </p>

          <div className="flex flex-col gap-y-3 md:ml-auto">
            <h2 className="text-primary-foreground font-semibold text-center md:text-right font-mono uppercase">
              Actions
            </h2>
            <div className="flex flex-col gap-y-1 text-primary-foreground/80 text-sm font-mono text-center md:text-right">
              <p>Back to top</p>
              <p>Copy my email</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <h2 className="text-primary-foreground font-semibold text-center md:text-right font-mono uppercase">
              Credits
            </h2>
            <div className="flex flex-col gap-y-1 text-primary-foreground/80 text-sm font-mono text-center md:text-right">
              <p>Darius Dan</p>
              <p>Transhumans</p>
              <p>Prinvia Prichariel</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
