export type UserPost = {
    id: bigint,
    title: string,
    description: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdDate: Date,
    createdUser: string
};