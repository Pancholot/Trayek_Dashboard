import axios, { AxiosError, AxiosInstance } from "axios";
import { store } from "../store";
import { setIsLoggedOut } from "../store/authSlice";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("/users/login")) {
      return config;
    }
    if (
      config.url?.includes("/users/refresh-token") ||
      config.url?.includes("/users/logout")
    ) {
      const refresh = localStorage.getItem("refreshToken");
      if (refresh) {
        config.headers.Authorization = `Bearer ${refresh}`;
      }
      return config;
    }

    const access = localStorage.getItem("accessToken");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    if (error instanceof AxiosError) {
      console.error("Axios request error:", error.message);
    } else {
      console.error("Unexpected request error:", error);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) {
        console.log("No refresh token available, logging out");
        store.dispatch(setIsLoggedOut());
        return Promise.reject(error);
      }

      const { data } = await axiosInstance.post("/users/refresh-token", null, {
        headers: { Authorization: `Bearer ${refresh}` },
      });
      const new_access_token = data.accessToken;

      localStorage.setItem("accessToken", new_access_token);
      original.headers.Authorization = `Bearer ${new_access_token}`;

      return axiosInstance(original);
    }
    store.dispatch(setIsLoggedOut());
    return Promise.reject(error);
  }
);

export default axiosInstance;
