import { QueryFunctionContext } from '@tanstack/react-query';
import { GetUserKeys } from './getUserKeys';
import { User } from '../models/user-model';
import { GetUserApi } from './getUserApi';

export const GetUserQuery = {
    GetUser({
        queryKey: [{ params }],
    }: QueryFunctionContext<ReturnType<typeof GetUserKeys.GetUser>>): Promise<User> {
        return GetUserApi.getPosts(params.username).then((response: User) => {
            return response
        });
    },
};

export type GetUserQueryProps = {
    username: string
};