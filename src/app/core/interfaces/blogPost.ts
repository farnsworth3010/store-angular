export interface BlogPost {
  ID: number;
  title: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  text: string;
}

export type ShortBlogPost = Omit<BlogPost, 'text'>;

export interface NewBlogPostInput {
  title: string;
  text: string;
}
