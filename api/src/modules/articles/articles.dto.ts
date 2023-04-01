export type CreateArticlesDto = {
  title: string;
  content: string;
  isPublished?: boolean;
  authorId: number;
  categoryId: number;
};

export type UpdateArticlesDto = {
  title: string;
  content: string;
  isPublished?: boolean;
  categoryId: number;
};
