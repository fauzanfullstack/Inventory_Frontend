// src/utils/sAuth.ts
import api from "./api";

// REGISTER user
export const registerUser = async (payload: {
  username: string;
  full_name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

// LOGIN user
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

// LOGOUT user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
