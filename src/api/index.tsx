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

//Users
export const registerUser = async (data: {
  userName: string;
  email: string;
  password: string;
}) => await api.post("/users/register", data);

export const loginUser = async (data: { userName: string; password: string }) =>
  await api.post("/users/login", data);

// Motorcycles
export const getMotorcycles = async (queryParams?: any) =>
  await api.get(`/motorcycles`, { params: queryParams });

export const getMotorcycleById = async (id: number) =>
  await api.get(`/motorcycles/${id}`);

export const createMotorcycle = async (data: any) =>
  await api.post(`/motorcycles`, data);

export const updateMotorcycle = async (id: number, data: any) =>
  await api.put(`/motorcycles/${id}`, data);

export const deleteMotorcycle = async (id: number) =>
  await api.delete(`/motorcycles/${id}`);
