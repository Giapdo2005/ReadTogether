import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// get all books from backend
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("fetchBooks -> error", error);
  }
};

// add book to the database
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    console.error("addBook -> error", error);
    throw error;
  }
};

// update book status to the database
export const updateBookStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, {
      read: status,
    });
    return response.data;
  } catch (error) {
    console.error("updateBookStatus -> error", error);
    throw error;
  }
};

// delete book from the database
export const deleteSelectedBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteBook -> error", error);
    throw error;
  }
};

// check if user exists for login auth
export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.error("login unsuccessful", error.response?.data || error.message);
    throw error;
  }
};
