import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requestByHref = async (href: string, method: string, data?: any) => {
  return await axios({
    url: href,
    method,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// ******
// Auth
// ******
export const registerUser = async (data: {
  userName: string;
  email: string;
  password: string;
}) => await api.post("/auth/register", data);

export const loginUser = async (data: { userName: string; password: string }) =>
  await api.post("/auth/login", data);

export const refreshToken = async (data: { refreshToken: string }) =>
  await api.post("/auth/refresh", data);

// ******
// Users
// ******
export const getUsers = async (queryParams?: any) =>
  await api.get(`/users`, { params: queryParams });

export const createUser = async (data: any) => await api.post(`/users`, data);

export const getUser = async (href: string) => await requestByHref(href, "GET");

export const updateUser = async (href: string, data: any) =>
  await requestByHref(href, "PUT", data);

export const deleteUser = async (href: string) =>
  await requestByHref(href, "DELETE");

// ******
// Images
// ******
export const batchCreate = async (resourceId: string, data: FormData) =>
  await api.post(`/images/${resourceId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getImageByResourceId = async (resourceId: string) =>
  await api.get(`/images/${resourceId}`);

// ******
// Motorcycles
// ******
export const getMotorcycles = async (queryParams?: any) =>
  await api.get(`/motorcycles`, { params: queryParams });

export const getMotorcyclesByUserId = async (id: string) =>
  await api.get(`/users/${id}/motorcycles`);

export const createMotorcycle = async (data: any) =>
  await api.post(`/motorcycles`, data);

export const getMotorcycle = async (href: string) =>
  await requestByHref(href, "GET");

export const updateMotorcycle = async (href: string, data: any) =>
  await requestByHref(href, "PUT", data);

export const deleteMotorcycle = async (href: string) =>
  await requestByHref(href, "DELETE");

// ******
// Comments
// ******
export const createComment = async (motorcycleId: string, data: any) =>
  await api.post(`/motorcycles/${motorcycleId}/comments`, data);

export const getComment = async (href: string) =>
  await requestByHref(href, "GET");

export const updateComment = async (href: string, data: any) =>
  await requestByHref(href, "PUT", data);

export const deleteComment = async (href: string) =>
  await requestByHref(href, "DELETE");

// ******
// Jobs
// ******
export const createJob = async (motorcycleId: string, data: any) =>
  await api.post(`/motorcycles/${motorcycleId}/jobs`, data);

export const getJob = async (href: string) => await requestByHref(href, "GET");

export const updateJob = async (href: string, data: any) =>
  await requestByHref(href, "PUT", data);

export const deleteJob = async (href: string) =>
  await requestByHref(href, "DELETE");
