import { PiDatabaseFill, PiImageFill } from "react-icons/pi";
import { SiReact } from "react-icons/si";

import { Tree, type TreeData } from "@/components/lab/tree";

export const IconTree = () => {
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
                icon: <SiReact className="size-3 shrink-0 text-blue-500" />,
              },
            ],
          },
          {
            id: "layout",
            name: "layout.tsx",
            type: "file",
            icon: <SiReact className="size-3 shrink-0 text-blue-500" />,
          },
          {
            id: "page",
            name: "page.tsx",
            type: "file",
            icon: <SiReact className="size-3 shrink-0 text-blue-500" />,
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
            icon: <PiImageFill className="size-3 shrink-0 text-purple-500" />,
          },
        ],
      },
      {
        id: "package",
        name: "package.json",
        type: "file",
        icon: <PiDatabaseFill className="size-3 shrink-0 text-yellow-500" />,
      },
    ],
  };

  return <Tree data={treeData} variant="no-lines" />;
};
