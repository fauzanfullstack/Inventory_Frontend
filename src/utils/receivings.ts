// src/utils/receiving.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/receivings";

// GET all
export const getReceivings = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// GET by ID
export const getReceivingById = async (id: number | string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// CREATE (with image)
export const createReceiving = async (formData: FormData) => {
  const res = await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE (with optional image)
export const updateReceiving = async (id: number | string, formData: FormData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE
export const deleteReceiving = async (id: number | string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
