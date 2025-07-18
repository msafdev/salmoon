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
        className={cn(
          "h-full w-full",
          "has-disabled:pointer-events-none has-disabled:opacity-40",
          "rounded-xl border-2 border-dashed border-border p-4",
          "relative flex flex-col items-center justify-center overflow-hidden transition-colors hover:bg-accent/40",
          "has-[img]:border-none has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/40 data-[dragging=true]:bg-accent",
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
          <PiUserCircleDuotone className="size-8 text-foreground/60" />
        )}
      </div>

      {previewUrl && (
        <button
          type="button"
          className="absolute -right-1.5 -top-1.5 size-5 rounded-full bg-background"
          onClick={() => removeFile(files[0]?.id)}
          aria-label="Remove image"
        >
          <PiXCircleFill className="size-5 shrink-0 text-destructive" />
        </button>
      )}
    </div>
  );
};
