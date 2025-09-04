import { Tree, type TreeData } from "@/components/lab/tree";

export const DefaultTree = () => {
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
              },
            ],
          },
          {
            id: "layout",
            name: "layout.tsx",
            type: "file",
          },
          {
            id: "page",
            name: "page.tsx",
            type: "file",
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
          },
        ],
      },
      {
        id: "package",
        name: "package.json",
        type: "file",
      },
    ],
  };

  return <Tree data={treeData} variant="no-lines" />;
};
