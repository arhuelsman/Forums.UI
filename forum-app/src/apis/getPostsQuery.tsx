import { QueryFunctionContext } from '@tanstack/react-query';
import { GetPostsApi } from './getPostsApi';
import { GetPostsKeys } from './getPostsKeys';
import { UserPost } from '../models/post-model';

export const GetPostsQuery = {
    GetPosts({
        queryKey: [{ params }],
    }: QueryFunctionContext<ReturnType<typeof GetPostsKeys.GetPosts>>): Promise<UserPost[]> {
        return GetPostsApi.getPosts().then((response: UserPost[]) => {
            return response
        });
    },
};

export type GetPostsQueryProps = {

};