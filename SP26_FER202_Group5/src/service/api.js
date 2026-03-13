import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getAllBook = async () => {
  const response = await axios.get(`${BASE_URL}/books`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

export const getBookDetail = async (id) => {
  const response = await axios.get(`${BASE_URL}/books/${id}`);
  return response.data;
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addBook =  async (book) => {
try {
    const response = await axios.post(`${BASE_URL}/books`, book);
    return response.data;
  } catch (error) {
    console.error("Add book error:",error);
  }
};

export const updateBook = async (id, updateBook) => {
  const response =  await axios.patch(`${BASE_URL}/books/${id}`, updateBook);
  return response.data;
}
