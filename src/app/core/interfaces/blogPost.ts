export interface BlogPost {
  ID: number;
  title: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  text: string;
}

export type ShortBlogPost = Omit<BlogPost, 'text'>;

export interface ResponseShortBlogPost {
  data: ShortBlogPost[];
  page: number;
  total: number;
}

export interface ResponseBlogPost {
  data: BlogPost[];
  page: number;
  total: number;
}
export interface ResponseNewBlogPost {
  id: number;
}

export interface NewBlogPostInput {
  title: string;
  text: string;
}
