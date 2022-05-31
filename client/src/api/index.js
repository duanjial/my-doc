import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const fetchDocuments = () => API.get("/documents");

export const deleteDocument = (id) => API.delete(`/document/${id}`);

export const createDocument = (docName) => {
  return API.post("/document", docName);
};

export const logIn = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/register", formData);

export const logout = () => API.get("/logout");
