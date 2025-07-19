export type categoryType =
  | "frontend"
  | "uiux"
  | "animation"
  | "backend"
  | "personal"
  | "ai";

type Thumbnail = {
  url: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  thumbnail: Thumbnail;
  excerpt: string;
  categories: categoryType;
  content: {
    json: RawContent;
  };
  updatedAt: string;
  createdAt: string;
};

type RawContent = {
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