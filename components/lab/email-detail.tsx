"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Link, Mail, User } from "lucide-react";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";

const EmailDetail = () => {
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [bounds, setBounds] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const email = "salman@msafdev.com";
  const [name, site] = email.split("@");
  const [domain, tld] = site.split(".");

  const calculateBounds = useCallback(() => {
    if (activeValue && containerRef.current) {
      const container = containerRef.current;
      const spans = Array.from(container.querySelectorAll("span"));

      spans.forEach((span) => span.classList.remove("active"));

      const filterSpans = (attr: string) =>
        spans.filter((span) => span.getAttribute("data-user") === attr);

      const selected =
        activeValue === "name"
          ? filterSpans("name")
          : activeValue === "email"
            ? spans.filter((span) =>
                ["name", "@", "domain", `.${tld}`].includes(
                  span.getAttribute("data-user") ?? "",
                ),
              )
            : activeValue === "instagram"
              ? filterSpans("domain")
              : activeValue === "site"
                ? spans.filter((span) =>
                    ["domain", `.${tld}`].includes(
                      span.getAttribute("data-user") ?? "",
                    ),
                  )
                : [];

      selected.forEach((span) => span.classList.add("active"));

      if (selected.length > 0) {
        const totalWidth = selected.reduce(
          (acc, span) => acc + span.getBoundingClientRect().width,
          0,
        );

        setBounds({
          width: totalWidth,
          left:
            selected[0].getBoundingClientRect().left -
            container.getBoundingClientRect().left,
        });
      }
    }
  }, [activeValue, tld]);

  useEffect(() => {
    calculateBounds();
    const handleResize = () => calculateBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeValue, calculateBounds]);

  const handleMouseEnter = (value: string) => setActiveValue(value);
  const handleMouseLeave = () => {
    setActiveValue(null);

    const spans = containerRef.current?.querySelectorAll("span");
    if (spans) {
      spans.forEach((span) => span.classList.remove("active"));
    }
  };

  return (
    <div
      className="relative flex h-auto w-full flex-col items-center justify-center self-stretch"
      ref={containerRef}
    >
      <h2 className="detail-text my-auto text-xl font-semibold">
        <motion.span className="name" data-user="name">
          {name}
        </motion.span>
        <motion.span className="@" data-user="@">
          @
        </motion.span>
        <motion.span className="domain" data-user="domain">
          {domain}
        </motion.span>
        <motion.span className=".tld" data-user={`.${tld}`}>
          .{tld}
        </motion.span>
      </h2>

      <AnimatePresence>
        {activeValue && (
          <motion.div
            id="detail-border"
            className="detail-border left-0 mt-2 h-4 rounded-b-md border-2 border-t-0 border-dashed"
            initial={{ opacity: 0, left: "auto", width: 0 }}
            style={{ position: "absolute" }}
            animate={{ opacity: 1, left: bounds.left, width: bounds.width }}
            exit={{ opacity: 0, left: "auto", width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              key={activeValue}
              className="translate-y-full text-center text-xs font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeValue}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center">
        {[
          { value: "name", Icon: User },
          { value: "email", Icon: Mail },
          { value: "instagram", Icon: Link },
          { value: "site", Icon: Globe },
        ].map(({ value, Icon }) => (
          <Button
            key={value}
            variant="ghost"
            size="icon"
            className="size-8"
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMouseEnter(value)}
          >
            <Icon size={16} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmailDetail;
