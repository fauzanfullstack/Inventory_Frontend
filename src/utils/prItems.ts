// src/utils/prItems.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/purchase-request-items";

// GET all PR Items
export const getPrItems = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// GET PR Item by ID
export const getPrItemById = async (id: number | string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// CREATE PR Item
export const createPrItem = async (payload: any) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};

// UPDATE PR Item
export const updatePrItem = async (id: number | string, payload: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, payload);
  return res.data;
};

// DELETE PR Item
export const deletePrItem = async (id: number | string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
