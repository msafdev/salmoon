"use client";

import { XIcon } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
  motion,
} from "motion/react";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import Image, { StaticImageData } from "next/image";

import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export type MorphDialogContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  measurementsReady: boolean;
  setMeasurementsReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const MorphDialogContext = React.createContext<MorphDialogContextType | null>(
  null,
);

export function useMorphDialog() {
  const context = useContext(MorphDialogContext);
  if (!context) {
    throw new Error("useMorphDialog must be used within a MorphDialogProvider");
  }
  return context;
}

export type MorphDialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphDialogProvider({
  children,
  transition,
}: MorphDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const [measurementsReady, setMeasurementsReady] = useState(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
      measurementsReady,
      setMeasurementsReady,
    }),
    [isOpen, uniqueId, measurementsReady],
  );

  return (
    <MorphDialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphDialogContext.Provider>
  );
}

export type MorphDialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphDialog({ children, transition }: MorphDialogProps) {
  return (
    <MorphDialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphDialogProvider>
  );
}

export type MorphDialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLButtonElement>;
};

function MorphDialogTrigger({
  children,
  className,
  style,
  triggerRef,
}: MorphDialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useMorphDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );

  return (
    <motion.button
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
      aria-label={`Open dialog ${uniqueId}`}
    >
      {children}
    </motion.button>
  );
}

export type MorphDialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphDialogContent({
  children,
  className,
  style,
}: MorphDialogContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphDialog();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");

      const timer = setTimeout(() => {
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements && focusableElements.length > 0) {
          setFirstFocusableElement(focusableElements[0] as HTMLElement);
          setLastFocusableElement(
            focusableElements[focusableElements.length - 1] as HTMLElement,
          );
          (focusableElements[0] as HTMLElement).focus();
        }
      }, 10);

      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("overflow-hidden", className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type MorphDialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphDialogContainer({ children }: MorphDialogContainerProps) {
  const { isOpen, uniqueId } = useMorphDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="backdrop-blur-xs fixed inset-0 h-full w-full bg-white/40 dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export type MorphDialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphDialogTitle({
  children,
  className,
  style,
}: MorphDialogTitleProps) {
  const { uniqueId } = useMorphDialog();

  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.div>
  );
}

export type MorphDialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphDialogSubtitle({
  children,
  className,
  style,
}: MorphDialogSubtitleProps) {
  const { uniqueId } = useMorphDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export type MorphDialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphDialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: MorphDialogDescriptionProps) {
  const { uniqueId } = useMorphDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type MorphDialogImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function MorphDialogImage({
  src,
  alt,
  className,
  style,
}: MorphDialogImageProps) {
  const { uniqueId } = useMorphDialog();
  const [_, setImageLoaded] = useState(false);

  return (
    <motion.div
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={{
        ...style,
        aspectRatio: "1/1",
        minWidth: "1px",
        minHeight: "1px",
        position: "relative",
        overflow: "hidden",
      }}
      onLoad={() => setImageLoaded(true)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export type MorphDialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphDialogClose({
  children,
  className,
  variants,
}: MorphDialogCloseProps) {
  const { setIsOpen, uniqueId } = useMorphDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn("absolute right-6 top-6", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

export {
  MorphDialog,
  MorphDialogTrigger,
  MorphDialogContainer,
  MorphDialogContent,
  MorphDialogClose,
  MorphDialogTitle,
  MorphDialogSubtitle,
  MorphDialogDescription,
  MorphDialogImage,
};
