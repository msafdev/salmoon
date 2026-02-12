"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface PixelProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  gridSize?: number;
}

// Cache generated pixelated previews by image src + grid size
const pixelPreviewCache = new Map<string, string>();

export function Pixel({
  src,
  alt,
  width = 600,
  height = 600,
  className,
  gridSize = 64,
}: PixelProps) {
  if (src && !src.startsWith("/")) {
    throw new Error(
      'Pixel: "src" must be a path served from the Next.js "/public" directory (it should start with "/").',
    );
  }

  const [isLoading, setIsLoading] = useState(true);
  const [pixelatedDataUrl, setPixelatedDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!src) {
      setPixelatedDataUrl("");
      setIsLoading(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cacheKey = `${src}-${gridSize}`;
    const cached = pixelPreviewCache.get(cacheKey);

    // Reuse cached pixelated preview if available
    if (cached) {
      setPixelatedDataUrl(cached);
      setIsLoading(true);
      return;
    }

    let isCancelled = false;
    const img = new window.Image();

    img.decoding = "async";
    img.crossOrigin = "anonymous";
    img.src = src;

    setIsLoading(true);
    setPixelatedDataUrl("");

    img.onload = () => {
      if (isCancelled) return;

      canvas.width = gridSize;
      canvas.height = gridSize;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, gridSize, gridSize);
      ctx.drawImage(img, 0, 0, gridSize, gridSize);

      const dataUrl = canvas.toDataURL();
      pixelPreviewCache.set(cacheKey, dataUrl);
      setPixelatedDataUrl(dataUrl);
    };

    img.onerror = () => {
      if (isCancelled) return;
      setPixelatedDataUrl("");
    };

    return () => {
      isCancelled = true;
    };
  }, [src, gridSize]);

  return (
    <div className={cn("relative overflow-hidden rounded", className)}>
      <canvas ref={canvasRef} className="hidden" />

      {pixelatedDataUrl && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isLoading ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={pixelatedDataUrl || "/placeholder.svg"}
            alt={`${alt} (loading)`}
            className="h-full w-full object-cover"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
      )}

      <div
        className={cn(
          "transition-opacity duration-1000",
          !isLoading ? "opacity-100" : "opacity-0",
        )}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
