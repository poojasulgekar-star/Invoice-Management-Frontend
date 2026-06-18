import axios from "axios";

const API_URL = "http://localhost:8080/api/groups";

export const getGroups = () => {
  return axios.get(API_URL);
};

export const addGroup = (group) => {
  return axios.post(API_URL, group);
};

export const updateGroup = (id, group) => {
  return axios.put(`${API_URL}/${id}`, group);
};

export const deleteGroup = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};