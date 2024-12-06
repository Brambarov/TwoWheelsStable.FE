import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = async (data: {
  userName: string;
  email: string;
  password: string;
}) => await api.post("/auth/register", data);

export const loginUser = async (data: { userName: string; password: string }) =>
  await api.post("/auth/login", data);

// Images
export const batchCreate = async (resourceId: string, data: FormData) =>
  await api.post(`/images/${resourceId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getImageByResourceId = async (resourceId: string) =>
  await api.get(`/images/${resourceId}`);

// Motorcycles
export const getMotorcycles = async (queryParams?: any) =>
  await api.get(`/motorcycles`, { params: queryParams });

export const getMotorcycle = async (id: string) =>
  await api.get(`/motorcycles/${id}`);

export const createMotorcycle = async (data: any) =>
  await api.post(`/motorcycles`, data);

export const updateMotorcycle = async (id: string, data: any) =>
  await api.put(`/motorcycles/${id}`, data);

export const deleteMotorcycle = async (id: string) =>
  await api.delete(`/motorcycles/${id}`);

export const getMotorcyclesByUserId = async (id: string) =>
  await api.get(`/users/${id}/motorcycles`);

// Comments
export const createComment = async (id: string, data: any) =>
  await api.post(`/motorcycles/${id}/comments`, data);

export const updateComment = async (id: string, data: any) =>
  await api.put(`/comments/${id}`, data);

export const deleteComment = async (id: string) =>
  await api.delete(`/comments/${id}`);

// Comments
export const createJob = async (id: string, data: any) =>
  await api.post(`/motorcycles/${id}/jobs`, data);

export const updateJob = async (id: string, data: any) =>
  await api.put(`/jobs/${id}`, data);

export const deleteJob = async (id: string) => await api.delete(`/jobs/${id}`);
