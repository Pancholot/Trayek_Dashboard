import axios, { AxiosError } from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});
import { jwtDecode } from "jwt-decode";

axiosInstance.interceptors.request.use(
  async (config) => {
    if (
      config.url === "/api/users/login" ||
      config.url === "/api/users/register" ||
      config.url === "/api/users/refresh-token"
    ) {
      return config;
    }
    let access_token = localStorage.getItem("access_token");
    if (!access_token || isTokenExpired(access_token)) {
      access_token = await refreshToken();
    }
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const isTokenExpired = (token: string) => {
  try {
    const payload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = 30;
    if (!payload || typeof payload.exp !== "number") {
      return true;
    }
    return payload.exp - bufferTime < currentTime;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true;
  }
};

export const refreshToken = async () => {
  try {
    const old_refresh = localStorage.getItem("refresh_token");
    if (!old_refresh) {
      throw new Error("No refresh token found");
    }
    if (isTokenExpired(old_refresh)) {
      throw new Error("Refresh token expired");
    }

    const response = await axiosInstance.post(
      "/api/users/refresh-token",
      null,
      {
        headers: {
          Authorization: `Bearer ${old_refresh}`,
        },
      }
    );

    const { access, refresh } = response.data;

    if (access) {
      localStorage.setItem("access_token", access);
    }

    if (refresh) {
      localStorage.setItem("refresh_token", refresh);
    }

    return access;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Error al refrescar el token:", axiosError.response);
      }
      throw error;
    }
  }
};

export default axiosInstance;
