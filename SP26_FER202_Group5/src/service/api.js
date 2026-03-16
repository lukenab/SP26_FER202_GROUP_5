import axios from 'axios'

const BASE_URL = 'http://localhost:5000';

export const getAllBook = async () => {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
}

export const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
}

export const getBookDetail = async (id) => {
    const response = await axios.get(`${BASE_URL}/books/${id}`);
    return response.data;
}

export const addCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}/categories`, category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.patch(`${BASE_URL}/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`);
  return response.data;
};