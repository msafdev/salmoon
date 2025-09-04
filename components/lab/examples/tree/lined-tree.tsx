import {
  PiDatabaseDuotone,
  PiFileDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import { Tree, type TreeData } from "@/components/lab/tree";

export const LinedTree = () => {
  const treeData: TreeData = {
    nodes: [
      {
        id: "app",
        name: "app",
        type: "folder",
        defaultExpanded: true,
        children: [
          {
            id: "slug",
            name: "[slug]",
            type: "folder",
            children: [
              {
                id: "page",
                name: "page.tsx",
                type: "file",
                icon: (
                  <PiFileDuotone className="text-muted-foreground size-3 shrink-0" />
                ),
              },
            ],
          },
          {
            id: "layout",
            name: "layout.tsx",
            type: "file",
            icon: (
              <PiFileDuotone className="text-muted-foreground size-3 shrink-0" />
            ),
          },
          {
            id: "page",
            name: "page.tsx",
            type: "file",
            icon: (
              <PiFileDuotone className="text-muted-foreground size-3 shrink-0" />
            ),
          },
        ],
      },
      {
        id: "public",
        name: "public",
        type: "folder",
        children: [
          {
            id: "favicon",
            name: "favicon.ico",
            type: "file",
            icon: (
              <PiImageDuotone className="text-muted-foreground size-3 shrink-0" />
            ),
          },
        ],
      },
      {
        id: "package",
        name: "package.json",
        type: "file",
        icon: (
          <PiDatabaseDuotone className="text-muted-foreground size-3 shrink-0" />
        ),
      },
    ],
  };

  return <Tree variant="lines" data={treeData} border="solid" />;
};
