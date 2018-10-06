import Logger from "./Logger";
import { BaseAddress } from "../Configuration";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios"

let axiosRequestConfig: AxiosRequestConfig = {
    baseURL: BaseAddress,
    timeout: 10_000
};

let axiosInstance: AxiosInstance = axios.create(axiosRequestConfig);

// Assign an interceptor which will log errors
// during requests execution.
axiosInstance.interceptors.response.use(undefined, (e: any) => {
    Logger.logError("Axios", `${e}`);
});

export default axiosInstance;
