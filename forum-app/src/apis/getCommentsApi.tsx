import axios from 'axios';
import { UserComment } from '../models/comment-model';

export const GetCommentsApi = {
    getComments(postId : bigint): Promise<UserComment[]> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .get(`${endpoint}/api/GetCommentsFunction?postId=${postId}`)
            .then(function (response: { data: UserComment[] }) {
                if (response.data) {
                    return response.data as UserComment[];
                }
                return [] as UserComment[];
            })
            .catch((err) => {
                throw err
            });
    }

}