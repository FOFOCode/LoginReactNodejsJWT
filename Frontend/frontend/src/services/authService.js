const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_URL_USERS = "/api/users/";

export const login = async ({ correo, password }) => {
  const res = await fetch(`${API_URL}${API_URL_USERS}login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ correo, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error en el login");
  return data;
};
