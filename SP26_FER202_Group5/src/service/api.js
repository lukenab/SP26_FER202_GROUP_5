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

export const addBook = async (book) => {
  try {
    const response = await axios.post(`${BASE_URL}/books`, book);
    return response.data;
  } catch (error) {
    console.error('Add book error:', error);
  }
};

export const updateBook = async (id, updateBook) => {
  const response = await axios.patch(`${BASE_URL}/books/${id}`, updateBook);
  return response.data;
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Fail to create orders: ', error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Fail to get all orders: ', error);
    return [];
  }
};

export const updateOrderStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/orders/${id}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.log('Fail to update orders: ', error);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    return await axios.delete(`${BASE_URL}/orders/${orderId}`);
  } catch (error) {
    console.error("Delete failed ", error);
  }
}

// ================= USER MANAGEMENT =================

// GET all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Fail to get users:', error);
    return [];
  }
};

// CREATE user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Fail to create user:', error);
  }
};

// UPDATE user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Fail to update user:', error);
    throw error; 
  }
};

// DELETE user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fail to delete user:', error);
  }
};

// === CATEGORY ===

// ADD CATEGORY
export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Fail to add category:", error);
  }
};

// UPDATE CATEGORY
export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Fail to update category:", error);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fail to delete category:", error);
  }
};
