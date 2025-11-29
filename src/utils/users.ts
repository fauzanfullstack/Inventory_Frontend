// src/utils/sAuth.ts
import api from "./api";

// ===============================
// REGISTER USER
// ===============================
export const registerUser = async (payload: {
  username: string;
  full_name: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data; // data.user + message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ===============================
// LOGIN USER
// ===============================
export const loginUser = async (payload: { email: string; password: string }) => {
  try {
    const { data } = await api.post("/auth/login", payload);

    // Simpan token & user ke localStorage
    if (data?.token && data?.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data; // data.user + token + message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ===============================
// LOGOUT USER
// ===============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
