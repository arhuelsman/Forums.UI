import { GetPostsQueryProps } from "./getPostsQuery";

export const GetPostsKeys = {
    GetPosts: (params: GetPostsQueryProps) =>
    [
        {
            scope: 'GetPostsApi',
            scopeType: 'Grid',
            params,
        },
    ] as const,
}