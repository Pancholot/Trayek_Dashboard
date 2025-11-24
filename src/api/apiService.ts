import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import PageResponse from "../types/PageResponse";
import Passenger from "../types/Passenger";
import Driver from "../types/Drivers";

export const apiService = {
  logIn: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error during login:", error.response?.data.msg);
      } else {
        console.error("Unexpected error during login:", error);
      }
      return false;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
      return response.status === 201;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Axios error during registration:",
          error.response?.data.msg
        );
        return error.response?.data.msg;
      } else {
        console.error("Unexpected error during registration:", error);
      }
      return false;
    }
  },

  logOut: async () => {
    try {
      const response = await axiosInstance.post("/users/logout");
      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error during logout:", error.response?.data.msg);
      } else {
        console.error("Unexpected error during logout:", error);
      }
      return false;
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh");
      const { accessToken } = response.data;
      await localStorage.setItem("accessToken", accessToken);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Axios error during token refresh:",
          error.response?.data.msg
        );
      } else {
        console.error("Unexpected error during token refresh:", error);
      }
      return false;
    }
  },

  checkServerHealth: async () => {
    try {
      const response = await axiosInstance.get("/health");
      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Axios error during health check:",
          error.response?.data.msg
        );
      } else {
        console.error("Unexpected error during health check:", error);
      }
      return false;
    }
  },

  getPassengers: async (
    page: number,
    searchTerm: string,
    size?: number,
    sortBy?: string,
    sortDir?: string
  ) => {
    try {
      const response = await axiosInstance.get("/users/all-passengers", {
        params: {
          page,
          size,
          sortBy,
          sortDir,
          searchTerm,
        },
      });
      return response.data.data as PageResponse<Passenger>;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Axios error during health check:",
          error.response?.data.msg
        );
      } else {
        console.error("Unexpected error during health check:", error);
      }
      return false;
    }
  },

  getDrivers: async (
    page: number,
    searchTerm: string,
    size?: number,
    sortBy?: string,
    sortDir?: string
  ) => {
    try {
      const response = await axiosInstance.get("/drivers/all", {
        params: {
          page,
          size,
          sortBy,
          sortDir,
          searchTerm,
        },
      });
      return response.data.data as PageResponse<Driver>;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Axios error during health check:",
          error.response?.data.msg
        );
      } else {
        console.error("Unexpected error during health check:", error);
      }
      return false;
    }
  },
};
