"use client";

import React from "react";

type SkeumorphicVariant = "button" | "icon" | "image";

interface SkeumorphicProps {
  variant?: SkeumorphicVariant;
  children?: React.ReactNode;
  src?: string; 
  alt?: string; 
  onClick?: () => void;
  className?: string;
}

const Skeumorphic: React.FC<SkeumorphicProps> = ({
  variant = "button",
  children,
  src,
  alt = "Skeumorphic Image",
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`skeumorph-wrapper ${className}`}
      role={variant === "icon" ? "img" : "button"}
      onClick={onClick}
    >
      <div className="skeumorph-border">
        <div
          className={`skeumorph-content font-semibold ${
            variant === "icon"
              ? "p-2"
              : variant === "button"
                ? "px-3 py-1.5"
                : "p-0"
          }`}
        >
          {variant === "image" && src ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Skeumorphic;
