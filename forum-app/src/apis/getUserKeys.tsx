import { GetUserQueryProps } from "./getUserQuery";

export const GetUserKeys = {
    GetUser: (params: GetUserQueryProps) =>
    [
        {
            scope: 'GetUserApi',
            scopeType: 'Grid',
            params,
        },
    ] as const,
}