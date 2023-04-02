export type CreateCommentsDto = {
    content: string;
    authorId?: number;
    articleId: number;
};

export type UpdateCommentsDto = {
    content: string;
    authorId: number;
    articleId: number;
};