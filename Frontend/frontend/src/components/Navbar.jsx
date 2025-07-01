import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
      console.log("Sesion finalizada");
    } catch (error) {
      console.log("Error al iniciar sesion ", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Dashboard de productos
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
