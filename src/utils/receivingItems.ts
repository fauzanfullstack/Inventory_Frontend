// src/utils/receivingItems.ts
import api from "./api";

// ===============================
// GET ALL RECEIVING ITEMS
// ===============================
export const getReceivingItems = async () => {
  try {
    const res = await api.get("/receiving-items");
    return res.data;
  } catch (error: any) {
    console.error("ERROR getReceivingItems:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// GET RECEIVING ITEM BY ID
// ===============================
export const getReceivingItemById = async (id: number | string) => {
  try {
    const res = await api.get(`/receiving-items/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("ERROR getReceivingItemById:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// CREATE RECEIVING ITEM
// ===============================
export const createReceivingItem = async (payload: any) => {
  try {
    const res = await api.post("/receiving-items", payload);
    return res.data;
  } catch (error: any) {
    console.error("ERROR createReceivingItem:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// UPDATE RECEIVING ITEM
// ===============================
export const updateReceivingItem = async (
  id: number | string,
  payload: any
) => {
  try {
    const res = await api.put(`/receiving-items/${id}`, payload);
    return res.data;
  } catch (error: any) {
    console.error("ERROR updateReceivingItem:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// DELETE RECEIVING ITEM
// ===============================
export const deleteReceivingItem = async (id: number | string) => {
  try {
    const res = await api.delete(`/receiving-items/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("ERROR deleteReceivingItem:", error.response?.data || error);
    throw error;
  }
};
