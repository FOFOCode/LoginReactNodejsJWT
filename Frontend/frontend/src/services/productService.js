import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_URL_PRODUCTS = "/api/products/";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}${API_URL_PRODUCTS}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message || error;
  }
};
