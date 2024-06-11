import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        const originalRequest = err.config;

        if (err.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function(resolve, reject) {

                const refreshToken = localStorage.getItem('refreshToken');
                axiosInstance
                    .post('/refresh-token', { refreshToken })
                    .then(({ data }) => {
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        axiosInstance.defaults.headers.common['Authorization'] = `${data.accessToken}`;
                        processQueue(null, data.accessToken);
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err, null);

                        reject(err);
                    })
                    .then(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(err);
    }
);





