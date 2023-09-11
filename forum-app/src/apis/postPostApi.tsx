import axios from 'axios';
import { PostPostRequest } from './models/postPost-models';
import { GetAuthentication } from '../hooks/useAuthentication';
import { UserPost } from '../models/post-model';

export const PostPostApi = {
    postPost(postRequest: PostPostRequest): Promise<UserPost> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        const auth = GetAuthentication();
        return axios
            .post(`${endpoint}/api/CreatePostFunction`, postRequest, {headers: { Authorization: `Bearer ${auth}`}})
            .then(function (response: { data: UserPost }) {
                if (response.data) {
                    return response.data as UserPost;
                }
                return {} as UserPost;
            })
            .catch((err) => {
                throw err
            });
    }

}