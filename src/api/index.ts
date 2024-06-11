import { axiosInstance } from './axiosInstance.ts';


type LoginData = {
    username?: string;
    password?: string;
    remember?: string;
};

export const login = (data: LoginData) => {
    return axiosInstance.post('login', data, {})
        .then(function ({data}) {
            return data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const logoutFromSystem = (refreshToken: string) => {
    return axiosInstance.delete('logout', {
        data: { refreshToken }
    })
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

export const getUserInfo = () => {
    return axiosInstance.get('/userInfo')
        .then(function ({data}) {
            return data
        })
        .catch(function (error) {
            return error.response.data
        });
}
