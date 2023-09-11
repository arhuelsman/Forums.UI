export type UserComment = {
    id: bigint,
    postId: bigint,
    parentCommentId: bigint | undefined,
    text: string,
    likes: number,
    dislikes: number,
    createdDate: Date,
    createdUser: string
};