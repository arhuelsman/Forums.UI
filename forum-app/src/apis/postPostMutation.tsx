import { PostPostRequest } from './models/postPost-models';
import { UserPost } from '../models/post-model';
import { PostPostApi } from './postPostApi';

export const PostPostMutation = {
    PostPost(request: PostPostRequest): Promise<UserPost> {
        return PostPostApi.postPost(request).then((response: UserPost) => {
            return response;
        });
    },
};

export type PostPostMutationProps = {
    title: string,
    description: string,
    created_user: string
};