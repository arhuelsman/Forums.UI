import { MutationFunction, QueryFunctionContext } from '@tanstack/react-query';
import { PostCommentKeys } from './postCommentKeys';
import { UserComment } from '../models/comment-model';
import { PostCommentApi } from './postCommentApi';
import { PostCommentRequest } from './models/postComment-models';

export const PostCommentMutation = {
    PostComment(request: PostCommentRequest): Promise<UserComment> {
        return PostCommentApi.postComment(request).then((response: UserComment) => {
            return response;
        });
    },
};

export type PostCommentMutationProps = {
    postId: bigint,
    text: string,
    created_user: string
};