import api from "./api";

// GET ALL ISSUING ITEMS
export const getIssuingItems = async () => {
  try {
    const res = await api.get("/issuing-items");
    return res.data;
  } catch (error: any) {
    console.error("ERROR getIssuingItems:", error.response?.data || error);
    throw error;
  }
};

// GET ISSUING ITEM BY ID
export const getIssuingItemById = async (id: number | string) => {
  try {
    const res = await api.get(`/issuing-items/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("ERROR getIssuingItemById:", error.response?.data || error);
    throw error;
  }
};

// CREATE ISSUING ITEM
export const createIssuingItem = async (payload: any) => {
  try {
    const res = await api.post("/issuing-items", payload);
    return res.data;
  } catch (error: any) {
    console.error("ERROR createIssuingItem:", error.response?.data || error);
    throw error;
  }
};

// UPDATE ISSUING ITEM
export const updateIssuingItem = async (
  id: number | string,
  payload: any
) => {
  try {
    const res = await api.put(`/issuing-items/${id}`, payload);
    return res.data;
  } catch (error: any) {
    console.error("ERROR updateIssuingItem:", error.response?.data || error);
    throw error;
  }
};

// DELETE ISSUING ITEM
export const deleteIssuingItem = async (id: number | string) => {
  try {
    const res = await api.delete(`/issuing-items/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("ERROR deleteIssuingItem:", error.response?.data || error);
    throw error;
  }
};
