// src/utils/users.ts
import api from "./api";

export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

// GET ALL USERS
export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await api.get("/auth/users");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET USER BY ID
export const getUserById = async (id: number): Promise<User> => {
  try {
    const { data } = await api.get(`/auth/users/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// CREATE USER
export const createUser = async (payload: {
  username: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}): Promise<User> => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// UPDATE USER
export const updateUser = async (
  id: number,
  payload: {
    username?: string;
    full_name?: string;
    email?: string;
    password?: string;
    role?: string;
  }
): Promise<User> => {
  try {
    const { data } = await api.put(`/auth/users/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// DELETE USER
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/auth/users/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};