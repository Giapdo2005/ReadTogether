import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("fetchBooks -> error", error);
  }
};

export const addBook = async (bookData) => {
  try {
    const respose = await axios.post(`${API_BASE_URL}/books`, bookData);
    return respose.data;
  } catch (error) {
    console.error("addBook -> error", error);
    throw error;
  }
};

export const updateBookStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, {
      read: status,
    });
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("updateBookStatus -> error", error);
    throw error;
  }
};
