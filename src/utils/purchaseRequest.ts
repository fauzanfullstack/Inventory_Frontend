// src/utils/purchaseRequest.ts
import api from "./api";

// ===============================
// Middleware axios untuk otomatis kirim token
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Fungsi API Purchase Requests
// ===============================
export const getPurchaseRequests = async () => {
  const res = await api.get("/purchase-requests");
  return res.data;
};

export const getPurchaseRequestById = async (id: number) => {
  const res = await api.get(`/purchase-requests/${id}`);
  return res.data;
};

export const createPurchaseRequest = async (payload: any) => {
  const res = await api.post("/purchase-requests", payload);
  return res.data;
};

export const updatePurchaseRequest = async (id: number, payload: any) => {
  const res = await api.put(`/purchase-requests/${id}`, payload);
  return res.data;
};

export const deletePurchaseRequest = async (id: number) => {
  const res = await api.delete(`/purchase-requests/${id}`);
  return res.data;
};
