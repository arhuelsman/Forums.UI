import { QueryFunctionContext } from '@tanstack/react-query';
import { GetCommentsApi } from './getCommentsApi';
import { GetCommentsKeys } from './getCommentsKeys';
import { UserComment } from '../models/comment-model';

export const GetCommentsQuery = {
    GetComments({
        queryKey: [{ params }],
    }: QueryFunctionContext<ReturnType<typeof GetCommentsKeys.GetComments>>): Promise<UserComment[]> {
        return GetCommentsApi.getComments(params.postId).then((response: UserComment[]) => {
            return response
        });
    },
};

export type GetCommentsQueryProps = {
    postId: bigint
};