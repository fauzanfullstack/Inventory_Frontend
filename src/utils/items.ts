import api from "./api";

// GET all
export const getItems = async () => {
  const { data } = await api.get("/items");
  return data;
};

// GET by ID
export const getItemById = async (id: number | string) => {
  const { data } = await api.get(`/items/${id}`);
  return data;
};

// CREATE
export const createItem = async (payload: any) => {
  const { data } = await api.post("/items", payload);
  return data;
};

// UPDATE (partial update aman)
export const updateItem = async (id: number | string, payload: any) => {
  const { data } = await api.put(`/items/${id}`, payload);
  return data;
};

// DELETE
export const deleteItem = async (id: number | string) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};
