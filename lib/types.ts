export type categoryType =
  | "frontend"
  | "uiux"
  | "animation"
  | "backend"
  | "personal"
  | "ai";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categories: categoryType;
  content: {
    raw: RawContent;
  };
  updatedAt: string;
};

export type RawContent = {
  children: {
    type: string;
    children: {
      text: string;
    }[];
    src?: string;
    title?: string;
    width?: number;
    handle?: string;
    height?: number;
    mimeType?: string;
  }[];
};

export type Edge = {
  node: Post;
};

export type FetchPostResponse = {
  postsConnection?: {
    edges: Edge[];
  };
};
