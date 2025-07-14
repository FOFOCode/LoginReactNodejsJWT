// src/services/webauthnService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const getRegistrationChallenge = async (correo) => {
  const res = await axios.post(`${API_BASE}/api/users/login/challenge`, {
    correo,
  });
  return res.data;
};

export const verifyRegistration = async (correo, attestationResponse) => {
  const res = await axios.post(`${API_BASE}/api/login/auth/verify`, {
    correo,
    attestationResponse,
  });
  return res.data;
};
