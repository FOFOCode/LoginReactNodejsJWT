import React, { useEffect, useState } from "react";
import "./Login.css";
import { login } from "../services/authservice";
import { loginAxios } from "../services/authServicesAxios";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   localStorage.removeItem("token");
  // });

  //FETCH

  // const logIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await login({ correo, password });
  //     localStorage.setItem("token", data.token);
  //     alert("Login exitoso");
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  //Axios

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAxios(correo, password);
      alert("Login exitoso");
      console.log("Login exitoso");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={logIn} className="login-form p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingrese su correo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta? <a href="/signIn">Regístrate aquí</a>
          </small>
        </div>
      </form>
    </div>
  );
}
