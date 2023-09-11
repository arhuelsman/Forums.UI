import axios from 'axios';
import { PostLoginRequest } from './models/postLogin-models';

export const PostLoginApi = {
    postLogin(postRequest: PostLoginRequest): Promise<string> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .post(`${endpoint}/api/LoginFunction`, postRequest)
            .then(function (response: { data: string }) {
                if (response.data) {
                    return response.data as string;
                }
                return "";
            })
            .catch((err) => {
                throw err
            });
    }

}