"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type FileIconType =
  | "word"
  | "excel"
  | "pdf"
  | "archive"
  | "image"
  | "video"
  | "audio"
  | "default";

export function getIcon(file: File): FileIconType {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  if (fileType.includes("pdf") || fileName.endsWith(".pdf")) return "pdf";
  if (
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  )
    return "word";
  if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  )
    return "excel";
  if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip")
  )
    return "archive";
  if (fileType.startsWith("video/")) return "video";
  if (fileType.startsWith("audio/")) return "audio";
  if (fileType.startsWith("image/")) return "image";

  return "default";
}

export function getBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export interface FileWithPreview extends File {
  id: string;
  preview?: string;
}

export interface UseFileOptions {
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  onError?: (error: string) => void;
  onFileAdd?: (file: FileWithPreview) => void;
  onFileRemove?: (fileId: string) => void;
}

export interface UseFileReturn {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
  inputRef: React.RefObject<HTMLInputElement>;
  // Event handlers
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Actions
  openFileDialog: () => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  // Props getters
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
}

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const validateFileType = (file: File, accept: string): boolean => {
  if (!accept) return true;

  const acceptTypes = accept
    .split(",")
    .map((type) => type.trim().toLowerCase());
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  return acceptTypes.some((acceptType) => {
    if (acceptType.startsWith(".")) {
      return fileName.endsWith(acceptType);
    }
    if (acceptType.includes("*")) {
      const [mainType] = acceptType.split("/");
      return fileType.startsWith(`${mainType}/`);
    }
    return fileType === acceptType;
  });
};

const createFileWithPreview = (file: File): FileWithPreview => {
  const fileWithPreview = Object.assign(file, {
    id: generateId(),
    preview: file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined,
  }) as FileWithPreview;

  return fileWithPreview;
};

export function useFile(options: UseFileOptions = {}): UseFileReturn {
  const {
    maxFiles = 1,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept = "",
    onFilesChange,
    onError,
    onFileAdd,
    onFileRemove,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const addError = useCallback(
    (error: string) => {
      setErrors((prev) => [...prev, error]);
      onError?.(error);
    },
    [onError],
  );

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file size
      if (file.size > maxSize) {
        return `File size must be less than ${getBytes(maxSize)}`;
      }

      // Check file type
      if (accept && !validateFileType(file, accept)) {
        return `File type not supported. Accepted: ${accept}`;
      }

      return null;
    },
    [maxSize, accept],
  );

  const addFiles = useCallback(
    (newFiles: File[]) => {
      clearErrors();

      // Check max files limit
      if (files.length + newFiles.length > maxFiles) {
        addError(
          `Maximum ${maxFiles} file${maxFiles !== 1 ? "s" : ""} allowed`,
        );
        return;
      }

      const validFiles: FileWithPreview[] = [];

      for (const file of newFiles) {
        const validationError = validateFile(file);
        if (validationError) {
          addError(validationError);
          return;
        }
        validFiles.push(createFileWithPreview(file));
      }

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...validFiles];
        onFilesChange?.(updatedFiles);
        validFiles.forEach((file) => onFileAdd?.(file));
        return updatedFiles;
      });
    },
    [
      files.length,
      maxFiles,
      validateFile,
      clearErrors,
      addError,
      onFilesChange,
      onFileAdd,
    ],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((f) => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        const updatedFiles = prevFiles.filter((f) => f.id !== fileId);
        onFilesChange?.(updatedFiles);
        onFileRemove?.(fileId);
        return updatedFiles;
      });
      clearErrors();
    },
    [onFilesChange, onFileRemove, clearErrors],
  );

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    clearErrors();
    onFilesChange?.([]);
  }, [files, clearErrors, onFilesChange]);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        addFiles(droppedFiles);
      }
    },
    [addFiles],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      if (selectedFiles.length > 0) {
        addFiles(selectedFiles);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [addFiles],
  );

  const getInputProps = useCallback(
    () => ({
      ref: inputRef,
      type: "file" as const,
      multiple: maxFiles > 1,
      accept,
      onChange: handleInputChange,
      style: { display: "none" },
    }),
    [maxFiles, accept, handleInputChange],
  );

  const getRootProps = useCallback(
    () => ({
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }),
    [handleDragEnter, handleDragLeave, handleDragOver, handleDrop],
  );

  return {
    files,
    isDragging,
    errors,
    inputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleInputChange,
    openFileDialog,
    removeFile,
    clearFiles,
    getInputProps,
    getRootProps,
  };
}
