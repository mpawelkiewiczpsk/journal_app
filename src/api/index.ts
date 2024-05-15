import { axiosInstance } from './axiosInstance.ts';


export const login = () => {
    return axiosInstance.post('login')
        .then(function ({data}) {
            return data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getProtectedInfo = () => {
    return axiosInstance.get('/protected')
        .then(function ({data}) {
            return data
        })
        .catch(function (error) {
            return error.response.data
        });
}
