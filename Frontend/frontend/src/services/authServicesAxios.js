import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_URL_USERS = "/api/users/";

export const loginAxios = async (correo, password) => {
  try {
    const res = await axios.post(`${API_URL}${API_URL_USERS}login`, {
      correo,
      password,
    });

    //Guardamos el token
    //El back devuelve datos peri uno de ellos en 'token'
    const token = res.data.token;
    localStorage.setItem("token", token);
    
    

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
