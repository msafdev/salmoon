"use client";

import {
  PiCloudArrowUpDuotone,
  PiDot,
  PiExclamationMarkDuotone,
  PiFileAudioDuotone,
  PiFileDocDuotone,
  PiFileImageDuotone,
  PiFilePdfDuotone,
  PiFileTxtDuotone,
  PiFileVideoDuotone,
  PiFileXlsDuotone,
  PiFileZipDuotone,
  PiFilesDuotone,
  PiXBold,
} from "react-icons/pi";

import { Button } from "@/components/ui/button";

import { getBytes, getIcon, useFile } from "@/hooks/use-file";
import { cn } from "@/lib/utils";

export const MultipleFiles = () => {
  const maxFiles = 3;

  const maxSizeMB = 100;
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
    clearFiles,
    getInputProps,
  } = useFile({
    maxFiles,
    maxSize,
  });

  return (
    <div className="w-full max-w-sm">
      <div className="relative hidden aspect-video w-full sm:block">
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
            "cursor-pointer select-none has-disabled:pointer-events-none has-disabled:opacity-40",
            "border-border bg-input/10 hover:bg-accent/40 relative flex flex-col items-center justify-center overflow-hidden rounded border p-4 transition-colors",
            "has-[input:focus]:border-ring has-[input:focus]:ring-ring/40 data-[dragging=true]:bg-accent/40 has-[img]:border-none has-[input:focus]:ring-[3px]",
          )}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload multiple file"
          />
          <div className="flex flex-col items-center justify-center text-center">
            <PiFilesDuotone className="mb-2 size-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Multiple file input</p>
              <div className="flex items-center gap-1">
                <p className="text-muted-foreground text-xs">
                  Max {maxFiles} files
                </p>
                <PiDot
                  size={14}
                  className="text-muted-foreground inline-flex shrink-0"
                />
                <p className="text-muted-foreground text-xs">
                  Up to {maxSizeMB}MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between sm:hidden">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Upload files</p>
          <p className="text-muted-foreground text-xs">Max {maxFiles} files</p>
        </div>

        <Button variant="outline" size="icon" onClick={openFileDialog}>
          <PiCloudArrowUpDuotone className="opacity-60" aria-hidden="true" />
        </Button>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive mt-2 flex items-center gap-1 text-xs font-medium"
          role="alert"
        >
          <PiExclamationMarkDuotone className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => {
            const iconType = getIcon(file);

            const Icon = {
              word: PiFileDocDuotone,
              excel: PiFileXlsDuotone,
              pdf: PiFilePdfDuotone,
              archive: PiFileZipDuotone,
              image: PiFileImageDuotone,
              video: PiFileVideoDuotone,
              audio: PiFileAudioDuotone,
              default: PiFileTxtDuotone,
            }[iconType];

            return (
              <div
                key={file.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Icon className="size-4 shrink-0 sm:size-5" />
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="truncate text-xs font-medium">
                      {file instanceof File ? file.name : "Unknown"}
                    </p>
                    <p className="text-muted-foreground text-[10px] leading-3">
                      {getBytes(file instanceof File ? file.size : 0)}
                    </p>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground/80 hover:text-foreground size-8 shrink-0 hover:bg-transparent"
                  onClick={() => removeFile(file.id)}
                  aria-label="Remove file"
                >
                  <PiXBold className="size-4" aria-hidden="true" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {files.length > 1 && (
        <div className="mt-4">
          <Button size="sm" variant="outline" onClick={clearFiles}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
