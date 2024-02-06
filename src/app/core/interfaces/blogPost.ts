export interface BlogPost {
  id: number;
  title: string;
  creation_date: Date;
  text: string;
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
