"use client";

import {
  PiProhibitDuotone,
  PiUserCircleDuotone,
  PiXCircleFill,
} from "react-icons/pi";

import { useFile } from "@/hooks/use-file";
import { cn } from "@/lib/utils";

export const AvatarFile = () => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  const {
    files,
    isDragging,
    errors,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    removeFile,
    getInputProps,
  } = useFile({
    maxFiles: 1,
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="relative aspect-square w-full max-w-16">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        aria-label="Upload file"
        className={cn(
          "h-full w-full cursor-pointer select-none",
          "has-disabled:pointer-events-none has-disabled:opacity-40",
          "border-border bg-input/10 hover:bg-accent/40 data-[dragging=true]:bg-accent/40 rounded border p-4 transition-colors",
          "relative flex flex-col items-center justify-center overflow-hidden",
          "has-[input:focus]:border-ring has-[input:focus]:ring-ring/40 has-[img]:border-none has-[input:focus]:ring-[3px]",
          errors.length > 0 && "border-destructive",
        )}
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
        />

        {previewUrl ? (
          <div className="absolute inset-0 size-full">
            <img
              src={previewUrl}
              alt={files[0]?.name || "Uploaded image"}
              className="size-full object-cover"
            />
          </div>
        ) : errors.length > 0 ? (
          <PiProhibitDuotone className="size-8 text-red-600" />
        ) : (
          <PiUserCircleDuotone className="text-foreground/60 size-8" />
        )}
      </div>

      {previewUrl && (
        <button
          type="button"
          className="bg-background absolute -top-1.5 -right-1.5 size-5 cursor-pointer rounded-full"
          onClick={() => removeFile(files[0]?.id)}
          aria-label="Remove image"
        >
          <PiXCircleFill className="text-destructive size-5 shrink-0" />
        </button>
      )}
    </div>
  );
};
