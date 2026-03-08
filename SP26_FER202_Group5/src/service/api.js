import axios from 'axios'

const BASE_URL = 'http://localhost:5000';

export const getAllBook = async () => {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
}

export const getAllCategories = async () =>{
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
}

