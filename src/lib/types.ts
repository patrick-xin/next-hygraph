import { ElementNode, EmbedReferences } from "@graphcms/rich-text-types";

export type Content = {
  raw: {
    children: ElementNode[];
  };
  json: ElementNode[];
  references: EmbedReferences;
};

export interface Root {
  blogsConnection: BlogsConnection;
}

export interface BlogsConnection {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface Edge {
  cursor: string;
  node: Blog;
}

export interface Blog {
  id: string;
  title: string;
  stage: string;
  createdAt: string;
  excerpt: string;
  content: Content;
  author: Author;
  isFeatured: boolean;
  seo: string;
  slug: string;
  coverImage: CoverImage;
  tags: string[];
  categories: Category[];
  views: number;
}

export interface Author {
  firstName: string;
  lastName: string;
  avatar: Avatar;
  recentPosts: Blog[];
  slug: string;
  bio: string;
}

export interface Avatar {
  url: string;
}

export interface CoverImage {
  thumbnail?: string;
  url: string;
  medium?: string;
  blurDataUrl: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

export interface Category {
  name: string;
  id: string;
  slug: string;
  image: CoverImage;
  blogs: Blog[];
  seo: string;
}

export interface AboutPageData {
  description: string;
  mission: {
    json: ElementNode[];
  };
  team: {
    raw: {
      children: ElementNode[];
    };
    json: ElementNode[];
    references: EmbedReferences;
  };
}
export interface IMenu {
  label: string;
  path: string;
  blogs: Pick<Blog, "title" | "slug" | "coverImage">[];
}
export interface Menu {
  [key: string]: {
    label: string;
    path: string;
    blogs: Pick<Blog, "title" | "slug" | "coverImage">[];
  };
}
