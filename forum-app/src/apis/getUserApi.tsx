import axios from 'axios';
import { User } from '../models/user-model';

export const GetUserApi = {
    getPosts(username: string): Promise<User> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .get(`${endpoint}/api/GetUserFunction?username=${username}`)
            .then(function (response: { data: User }) {
                if (response.data) {
                    return response.data as User;
                }
                return {} as User;
            })
            .catch((err) => {
                throw err
            });
    }

}