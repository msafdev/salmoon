import clsx from "clsx";
import { Children, type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  itemClassName?: string;
}

const DEFAULT_SECTION_CLASS = "flex h-auto w-full grow flex-col";
const DEFAULT_ITEM_CLASS = "flex w-full max-w-lg flex-col items-center";

const SectionWrapper = ({
  id,
  children,
  className,
  itemClassName,
}: SectionWrapperProps) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length <= 1) {
    return (
      <section id={id} className={clsx(DEFAULT_SECTION_CLASS, className)}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={clsx(DEFAULT_SECTION_CLASS, className)}>
      {childrenArray.map((child, index) => (
        <div key={index} className={clsx(DEFAULT_ITEM_CLASS, itemClassName)}>
          {child}
        </div>
      ))}
    </section>
  );
};

export default SectionWrapper;
