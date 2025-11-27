// src/utils/sIssuing.ts
import api from "./api";

// GET all issuing
export const getIssuings = async () => {
  const { data } = await api.get("/issuings"); // endpoint sesuai backend
  return data;
};

// GET issuing by ID
export const getIssuingById = async (id: number | string) => {
  const { data } = await api.get(`/issuings/${id}`);
  return data;
};

// CREATE issuing
export const createIssuing = async (payload: any) => {
  const { data } = await api.post("/issuings", payload);
  return data;
};

// UPDATE issuing
export const updateIssuing = async (id: number | string, payload: any) => {
  const { data } = await api.put(`/issuings/${id}`, payload);
  return data;
};

// DELETE issuing
export const deleteIssuing = async (id: number | string) => {
  const { data } = await api.delete(`/issuings/${id}`);
  return data;
};
