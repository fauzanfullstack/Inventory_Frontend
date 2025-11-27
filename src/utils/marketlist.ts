import axios from "axios";

const BASE_URL = "http://localhost:5000/api/marketlists";

// GET all
export const getMarketLists = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// GET by id
export const getMarketListById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// CREATE
export const createMarketList = async (payload: any) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};

// UPDATE
export const updateMarketList = async (id: number, payload: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, payload);
  return res.data;
};

// DELETE
export const deleteMarketList = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
