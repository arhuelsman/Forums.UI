import { GetCommentsQueryProps } from "./getCommentsQuery";

export const GetCommentsKeys = {
    GetComments: (params: GetCommentsQueryProps) =>
    [
        {
            scope: 'GetCommentsApi',
            scopeType: 'Grid',
            params,
        },
    ] as const,
}