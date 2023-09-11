import axios from 'axios';
import { PostRegisterRequest } from './models/postRegister-models';

export const PostRegisterApi = {
    postRegister(postRequest: PostRegisterRequest): Promise<boolean> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .post(`${endpoint}/api/RegisterFunction`, postRequest)
            .then(function (response: { data: string }) {
                if (response.data) {
                    return true
                }
                return false;
            })
            .catch((err) => {
                throw err
            });
    }
}