import axios from 'axios';

export const DeleteDeleteAccountApi = {
    deleteAccount(username: string): Promise<boolean> {
        var endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:7029' : 'https://forums-ui-bff.azurewebsites.net';
        return axios
            .delete(`${endpoint}/api/DeleteAccountFunction?username=${username}`)
            .then(function (response: { data: boolean }) {
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