"use client";

import {
  PiExclamationMarkDuotone,
  PiImageDuotone,
  PiTrashDuotone,
} from "react-icons/pi";

import { useFile } from "@/hooks/use-file";
import { cn } from "@/lib/utils";

export const BasicFile = () => {
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
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="relative aspect-video w-full max-w-sm">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className={cn(
          "h-full min-h-36 w-full cursor-pointer select-none",
          "has-disabled:pointer-events-none has-disabled:opacity-40",
          "border-border bg-input/10 hover:bg-accent/40 relative flex flex-col items-center justify-center overflow-hidden rounded border p-4 transition-colors",
          "has-[input:focus]:border-ring has-[input:focus]:ring-ring/40 data-[dragging=true]:bg-accent/40 has-[img]:border-none has-[input:focus]:ring-[3px]",
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
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <PiImageDuotone className="mb-2 size-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Basic file input</p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <button
          type="button"
          className="text-foreground mt-2 flex items-center gap-1 text-xs font-medium"
          onClick={() => removeFile(files[0]?.id)}
          aria-label="Remove image"
        >
          <PiTrashDuotone className="size-3 shrink-0" />
          <span>Remove image</span>
        </button>
      )}

      {errors.length > 0 && (
        <div
          className="text-destructive mt-2 flex items-center gap-1 text-xs font-medium"
          role="alert"
        >
          <PiExclamationMarkDuotone className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
};
