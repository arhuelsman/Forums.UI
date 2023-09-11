import axios from 'axios';
import { PostCommentRequest } from './models/postComment-models';
import { GetAuthentication } from '../hooks/useAuthentication';
import { UserComment } from '../models/comment-model';

export const PostCommentApi = {
    postComment(postRequest: PostCommentRequest): Promise<UserComment> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        const auth = GetAuthentication();
        return axios
            .post(`${endpoint}/api/CreateCommentFunction`, postRequest, {headers: { Authorization: `Bearer ${auth}`}})
            .then(function (response: { data: UserComment }) {
                if (response.data) {
                    return response.data as UserComment;
                }
                return {} as UserComment;
            })
            .catch((err) => {
                throw err
            });
    }

}