"use client";

import React, { useState, useEffect } from "react";
import { MousePointer2, MousePointerClick } from "lucide-react";

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState(false);
  const [insideViewport, setInsideViewport] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setInsideViewport(true);
    };

    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setInsideViewport(false);
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseout", handleMouseOut);

    // Optional: Add event listeners for hover effects
    const addHoverListeners = (elements: NodeListOf<Element>) => {
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const removeHoverListeners = (elements: NodeListOf<Element>) => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };

    const linkElements = document.querySelectorAll("a");
    addHoverListeners(linkElements);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseout", handleMouseOut);

      removeHoverListeners(linkElements);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${click ? "click" : ""} ${
        hover ? "hover" : ""
      } ${insideViewport ? "" : "hidden"}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {click ? (
        <MousePointerClick className="cursor-icon text-green-500 fill-green-400" />
      ) : (
        <MousePointer2 className="cursor-icon text-green-500 fill-green-400" />
      )}
    </div>
  );
};

export default Cursor;
