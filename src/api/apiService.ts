import axiosInstance from "./axiosInstance";
export const LogIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/users/login", {
      email,
      password,
    });

    const { access, refresh } = response.data;
    if (access) {
      localStorage.setItem("access_token", access);
    }
    if (refresh) {
      localStorage.setItem("refresh_token", refresh);
    }
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};
