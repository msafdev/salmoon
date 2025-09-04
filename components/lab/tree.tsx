"use client";

import { AnimatePresence, Variants, motion } from "motion/react";

import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiFileDuotone,
  PiFolderDuotone,
  PiFolderOpenDuotone,
} from "react-icons/pi";

import React, { createContext, useCallback, useContext, useState } from "react";

import { cn } from "@/lib/utils";

interface TreeContextValue {
  variant: "lines" | "no-lines";
  border: "solid" | "dashed";
  expandedFolders: Set<string>;
  toggleFolder: (id: string) => void;
}

interface TreeProps {
  data?: TreeData;
  children?: React.ReactNode;
  variant?: "lines" | "no-lines";
  border?: "solid" | "dashed";
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
}

interface TreeItemProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TreeFolderProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  onClick?: () => void;
}

interface TreeFileProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  children?: TreeNode[];
  defaultExpanded?: boolean;
}

interface TreeData {
  nodes: TreeNode[];
}

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("Tree components must be used within a Tree");
  return context;
};

const containerVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.2,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.2,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  },
} as Variants;

const chevronVariants = {
  open: {
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  closed: {
    rotate: -90,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
} as Variants;

const Tree = ({
  data,
  children,
  variant = "lines",
  border = "solid",
  className,
  onNodeClick,
}: TreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );

  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const renderNode = (
    node: TreeNode,
    depth = 0,
    isLast = false,
    parentPath: boolean[] = [],
  ) => {
    const isExpanded = expandedFolders.has(node.id);
    const currentPath = [...parentPath, isLast];

    if (node.type === "folder") {
      const childrenArray = node.children || [];
      return (
        <div key={node.id}>
          <TreeFolderInternal
            node={node}
            depth={depth}
            isExpanded={isExpanded}
            isLast={isLast}
            parentPath={parentPath}
            onToggle={() => toggleFolder(node.id)}
            onNodeClick={onNodeClick}
          />
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={containerVariants}
                style={{ overflow: "hidden" }}
              >
                <div>
                  {childrenArray.map((child, index) =>
                    renderNode(
                      child,
                      depth + 1,
                      index === childrenArray.length - 1,
                      currentPath,
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      return (
        <TreeFileInternal
          key={node.id}
          node={node}
          depth={depth}
          isLast={isLast}
          parentPath={parentPath}
          onNodeClick={onNodeClick}
        />
      );
    }
  };

  React.useEffect(() => {
    if (data) {
      const initializeExpanded = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          if (node.type === "folder" && node.defaultExpanded) {
            setExpandedFolders((prev) => new Set(prev).add(node.id));
          }
          if (node.children) initializeExpanded(node.children);
        });
      };
      initializeExpanded(data.nodes);
    }
  }, [data]);

  return (
    <TreeContext.Provider
      value={{ variant, expandedFolders, toggleFolder, border }}
    >
      <div className={cn("w-full font-mono text-sm select-none", className)}>
        {data
          ? data.nodes.map((node, index) =>
              renderNode(node, 0, index === data.nodes.length - 1),
            )
          : children}
      </div>
    </TreeContext.Provider>
  );
};

const TreeItem = ({
  id,
  name,
  icon,
  children,
  className,
  onClick,
}: TreeItemProps) => {
  const { variant, border } = useTree();
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm py-1 transition-colors",
          variant === "no-lines" && "pl-4",
        )}
        onClick={onClick}
      >
        {icon}
        <span className="truncate">{name}</span>
      </div>
      {children && (
        <div className={cn(variant === "no-lines" ? "pl-4" : "relative pl-6")}>
          {variant === "lines" && (
            <div
              className={cn(
                "absolute top-0 bottom-0 left-2 w-[0.5px] border-l",
                `border-${border}`,
              )}
            />
          )}
          {children}
        </div>
      )}
    </div>
  );
};

const TreeFolder = ({
  id,
  name,
  icon,
  openIcon,
  children,
  defaultExpanded = false,
  className,
  onClick,
}: TreeFolderProps) => {
  const { variant, expandedFolders, toggleFolder, border } = useTree();
  React.useEffect(() => {
    if (defaultExpanded) toggleFolder(id);
  }, [defaultExpanded, id, toggleFolder]);

  const isExpanded = expandedFolders.has(id);
  const defaultIcon = isExpanded ? (
    <PiFolderOpenDuotone className="text-muted-foreground size-3 shrink-0" />
  ) : (
    <PiFolderDuotone className="text-muted-foreground size-3 shrink-0" />
  );
  const displayIcon = icon || (isExpanded && openIcon) || defaultIcon;

  const handleClick = () => {
    toggleFolder(id);
    onClick?.();
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm py-1 transition-colors",
          variant === "lines" && "relative",
          variant === "no-lines" && "pl-4",
        )}
        onClick={handleClick}
      >
        {variant === "lines" && (
          <>
            <div className="bg-border absolute top-1/2 left-2 h-px w-3" />
            <div className="w-3" />
          </>
        )}
        <div
          className={cn(
            "flex items-center gap-1.5",
            variant === "lines" && "pl-1.5",
            variant === "no-lines" && "pl-1",
          )}
        >
          <motion.div
            variants={chevronVariants}
            animate={isExpanded ? "open" : "closed"}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <PiCaretDownBold className="text-muted-foreground size-3" />
          </motion.div>
          {displayIcon}
        </div>
        <span className="truncate font-medium">{name}</span>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && children && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            style={{ overflow: "hidden" }}
          >
            <div
              className={cn(variant === "no-lines" ? "pl-4" : "relative pl-6")}
            >
              {variant === "lines" && (
                <div
                  className={cn(
                    "absolute top-0 bottom-0 left-2 w-[0.5px] border-l",
                    `border-${border}`,
                  )}
                />
              )}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TreeFile = ({ id, name, icon, className, onClick }: TreeFileProps) => {
  const { variant } = useTree();
  const defaultIcon = (
    <PiFileDuotone className="text-muted-foreground size-3 shrink-0" />
  );

  return (
    <div
      className={cn(
        "hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm py-1 transition-colors",
        variant === "lines" && "relative",
        variant === "no-lines" && "pl-4",
        className,
      )}
      onClick={onClick}
    >
      {variant === "lines" && (
        <>
          <div className="bg-border absolute top-1/2 left-2 h-px w-3" />
          <div className="w-4" />
        </>
      )}
      {icon || defaultIcon}
      <span className="truncate">{name}</span>
    </div>
  );
};

const TreeFolderInternal = ({
  node,
  depth,
  isExpanded,
  isLast,
  parentPath,
  onToggle,
  onNodeClick,
}: {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  isLast: boolean;
  parentPath: boolean[];
  onToggle: () => void;
  onNodeClick?: (node: TreeNode) => void;
}) => {
  const { variant, border } = useTree();
  const defaultIcon = isExpanded ? (
    <PiFolderOpenDuotone className="text-muted-foreground size-3 shrink-0" />
  ) : (
    <PiFolderDuotone className="text-muted-foreground size-3 shrink-0" />
  );
  const displayIcon = node.icon || (isExpanded && node.openIcon) || defaultIcon;

  const handleClick = () => {
    onToggle();
    onNodeClick?.(node);
  };

  const getItemClasses = () =>
    cn(
      "flex items-center gap-1.5 cursor-pointer transition-colors relative py-1 hover:bg-accent hover:text-accent-foreground",
    );

  const renderLines = () => {
    if (variant !== "lines") return null;
    return (
      <div className="absolute top-0 left-0 flex h-full items-center">
        {parentPath.map((isParentLast, index) => (
          <div key={index} className="flex h-full w-4 justify-center">
            {!isParentLast && (
              <div
                className={cn("h-full w-[0.5px] border-l", `border-${border}`)}
              />
            )}
          </div>
        ))}
        <div className="relative flex h-full w-4 justify-center">
          <div
            className={cn(
              "w-[0.5px] border-l",
              isLast ? "h-1/2" : "h-full",
              `border-${border}`,
            )}
          />
        </div>
      </div>
    );
  };

  const getIndentation = () =>
    variant === "lines" ? (depth + 1) * 16 + 2 : depth * 16;

  return (
    <div className="relative">
      {renderLines()}
      <div
        className={getItemClasses()}
        style={{ paddingLeft: `${getIndentation()}px` }}
        onClick={handleClick}
      >
        <div
          className={cn(
            "flex items-center gap-1.5",
            variant === "lines" && "pl-0.5",
            variant === "no-lines" && "pl-1",
          )}
        >
          <motion.div
            variants={chevronVariants}
            animate={isExpanded ? "open" : "closed"}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <PiCaretDownBold className="text-muted-foreground size-3 flex-shrink-0" />
          </motion.div>
          {displayIcon}
        </div>
        <span className="truncate font-medium">{node.name}</span>
      </div>
    </div>
  );
};

const TreeFileInternal = ({
  node,
  depth,
  isLast,
  parentPath,
  onNodeClick,
}: {
  node: TreeNode;
  depth: number;
  isLast: boolean;
  parentPath: boolean[];
  onNodeClick?: (node: TreeNode) => void;
}) => {
  const { variant, border } = useTree();
  const defaultIcon = (
    <PiFileDuotone className="text-muted-foreground size-3 shrink-0" />
  );

  const getItemClasses = () =>
    cn(
      "flex items-center gap-1.5 cursor-pointer transition-colors relative py-1 hover:bg-accent hover:text-accent-foreground",
    );

  const renderLines = () => {
    if (variant !== "lines") return null;
    return (
      <div className="absolute top-0 left-0 flex h-full items-center">
        {parentPath.map((isParentLast, index) => (
          <div key={index} className="flex h-full w-4 justify-center">
            {!isParentLast && (
              <div
                className={cn("h-full w-[0.5px] border-l", `border-${border}`)}
              />
            )}
          </div>
        ))}
        <div className="relative flex h-full w-4 justify-center">
          <div
            className={cn(
              "w-[0.5px] border-l",
              isLast ? "h-1/2" : "h-full",
              `border-${border}`,
            )}
          />
        </div>
      </div>
    );
  };

  const getIndentation = () =>
    variant === "lines" ? (depth + 1) * 16 : depth * 16;

  return (
    <div className="relative">
      {renderLines()}
      <div
        className={getItemClasses()}
        style={{ paddingLeft: `${getIndentation()}px` }}
        onClick={() => onNodeClick?.(node)}
      >
        <div className="w-4" />
        {node.icon || defaultIcon}
        <span className="truncate">{node.name}</span>
      </div>
    </div>
  );
};

export {
  Tree,
  TreeItem,
  TreeFolder,
  TreeFile,
  type TreeProps,
  type TreeItemProps,
  type TreeFolderProps,
  type TreeFileProps,
  type TreeNode,
  type TreeData,
};
