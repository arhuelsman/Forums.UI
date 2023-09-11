import axios from 'axios';
import { UserPost } from '../models/post-model';

export const GetPostsApi = {
    getPosts(): Promise<UserPost[]> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .get(`${endpoint}/api/GetPostsFunction?hours=72`)
            .then(function (response: { data: UserPost[] }) {
                if (response.data) {
                    return response.data as UserPost[];
                }
                return [] as UserPost[];
            })
            .catch((err) => {
                throw err
            });
    }

}