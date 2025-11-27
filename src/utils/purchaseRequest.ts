// src/utils/purchaseRequest.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/purchase-requests";

export const getPurchaseRequests = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getPurchaseRequestById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const updatePurchaseRequest = async (id: number, payload: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, payload);
  return res.data;
};

export const createPurchaseRequest = async (payload: any) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};

export const deletePurchaseRequest = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
