import axios from 'axios';

const API_URL = 'http://localhost:3000/superheroes';

export const fetchSuperheroes = (page, limit) =>
  axios.get(`${API_URL}?page=${page}&limit=${limit}`);

export const fetchSuperheroById = (id) => axios.get(`${API_URL}/${id}`);

export const createSuperhero = (data) => axios.post(API_URL, data);

export const updateSuperhero = (id, data) => axios.patch(`${API_URL}/${id}`, data);

export const deleteSuperhero = (id) => axios.delete(`${API_URL}/${id}`);