import axios from 'axios';
import { GetRandomUserResponse, ToUser } from './models/getRandomUser-models';
import { User } from '../models/user-model';

export const GetRandomUserApi = {
    getRandomUser(): Promise<User> {
        var endpoint = 'https://randomuser.me/api/';
        return axios
            .get(`${endpoint}`)
            .then(function (response: { data: GetRandomUserResponse }) {
                if (response.data) {
                    return ToUser(response.data.results[0]);
                }
                return {} as User;
            })
            .catch((err) => {
                throw err
            });
    }
}