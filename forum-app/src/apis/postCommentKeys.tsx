import { PostCommentMutationProps } from "./postCommentMutation";

export const PostCommentKeys = {
    PostComment: (params: PostCommentMutationProps) =>
    [
        {
            scope: 'PostCommentApi',
            scopeType: 'Grid',
            params,
        },
    ] as const,
}