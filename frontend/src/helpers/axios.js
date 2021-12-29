import axios from "axios";

// const baseURL = process.env.NODE_ENV === "production" ? "https://devcamper-django.herokuapp.com/api/v1/" : "http://127.0.0.1:8000/api/v1/";

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

export const fileAxios = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "multipart/form-data",
        accept: "application/json",
    },
});

export const urlAxios = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
    },
});

const refreshAxios = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response === "undefined") {
            alert(
                "A server/network error occurred. " +
                "Looks like CORS might be the problem. " +
                "Sorry about this - we will get it fixed shortly."
            );
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + "token/refresh/"
        ) {
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return refreshAxios
                        .post("accounts/token/refresh/", { refresh: refreshToken })
                        .then((response) => {
                            localStorage.setItem("access_token", response.data.access);
                            localStorage.setItem("refresh_token", response.data.refresh);

                            axiosInstance.defaults.headers["Authorization"] =
                                "JWT " + response.data.access;
                            fileAxios.defaults.headers["Authorization"] =
                                "JWT " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "JWT " + response.data.access;

                            console.log("Token refreshed");

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = "/login";
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = "/login";
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;