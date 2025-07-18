import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import WebAuthnRegister from "./components/WebAuthnRegister";
import WebAuthn from "./components/WebAuthn";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/datosBiometricos" element={<WebAuthnRegister />} />
      <Route path="/logInHuella" element={<WebAuthn />} />
    </Routes>
  );
}

export default App;
