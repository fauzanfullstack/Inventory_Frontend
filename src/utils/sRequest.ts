import api from "./api";

// GET all sRequest
export const getSRequests = async () => {
  const { data } = await api.get("/s-requests");
  return data;
};

// GET sRequest by ID
export const getSRequestById = async (id: number | string) => {
  const { data } = await api.get(`/s-requests/${id}`);
  return data;
};

// CREATE sRequest (support upload file)
export const createSRequest = async (payload: any) => {
  const { data } = await api.post("/s-requests", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// UPDATE sRequest (support upload file baru)
export const updateSRequest = async (id: number | string, payload: any) => {
  const { data } = await api.put(`/s-requests/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// DELETE sRequest
export const deleteSRequest = async (id: number | string) => {
  const { data } = await api.delete(`/s-requests/${id}`);
  return data;
};
