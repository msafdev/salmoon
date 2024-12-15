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

type ExternalUrls = {
  spotify: string;
};

type ExternalIds = {
  isrc?: string;
};

type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};
