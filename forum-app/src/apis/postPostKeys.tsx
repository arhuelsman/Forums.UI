import { PostPostMutationProps } from "./postPostMutation";

export const PostPostKeys = {
    PostPost: (params: PostPostMutationProps) =>
    [
        {
            scope: 'PostPostApi',
            scopeType: 'Grid',
            params,
        },
    ] as const,
}