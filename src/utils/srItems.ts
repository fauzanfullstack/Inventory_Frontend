// src/utils/srItems.ts
import api from "./api";

// GET ALL SR ITEMS
export const getSRItems = async () => {
  try {
    const { data } = await api.get("/sr-items");
    return data;
  } catch (error: any) {
    console.error("ERROR getSRItems:", error.response?.data || error);
    throw error;
  }
};

// GET SR ITEM BY ID
export const getSRItemById = async (id: number | string) => {
  try {
    const { data } = await api.get(`/sr-items/${id}`);
    return data;
  } catch (error: any) {
    console.error("ERROR getSRItemById:", error.response?.data || error);
    throw error;
  }
};

// CREATE SR ITEM
export const createSRItem = async (payload: any) => {
  try {
    const { data } = await api.post("/sr-items", payload);
    return data;
  } catch (error: any) {
    console.error("ERROR createSRItem:", error.response?.data || error);
    throw error;
  }
};

// UPDATE SR ITEM
export const updateSRItem = async (id: number | string, payload: any) => {
  try {
    const { data } = await api.put(`/sr-items/${id}`, payload);
    return data;
  } catch (error: any) {
    console.error("ERROR updateSRItem:", error.response?.data || error);
    throw error;
  }
};

// DELETE SR ITEM
export const deleteSRItem = async (id: number | string) => {
  try {
    const { data } = await api.delete(`/sr-items/${id}`);
    return data;
  } catch (error: any) {
    console.error("ERROR deleteSRItem:", error.response?.data || error);
    throw error;
  }
};
