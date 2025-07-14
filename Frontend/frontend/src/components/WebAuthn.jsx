import React, { useState } from "react";

function base64urlToArrayBuffer(base64urlString) {
  const padding = "=".repeat((4 - (base64urlString.length % 4)) % 4);
  const base64 = (base64urlString + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

function arrayBufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let b of bytes) {
    binary += String.fromCharCode(b);
  }
  const base64 = window.btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function serializeAssertion(assertion) {
  if (!assertion) return null;
  return {
    id: assertion.id,
    type: assertion.type,
    rawId: arrayBufferToBase64url(assertion.rawId),
    response: {
      clientDataJSON: arrayBufferToBase64url(assertion.response.clientDataJSON),
      authenticatorData: arrayBufferToBase64url(
        assertion.response.authenticatorData
      ),
      signature: arrayBufferToBase64url(assertion.response.signature),
      userHandle: assertion.response.userHandle
        ? arrayBufferToBase64url(assertion.response.userHandle)
        : undefined,
    },
  };
}

export default function LoginFingerprint() {
  const [correo, setCorreo] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    try {
      // 1. Solicitar challenge para autenticación
      const res = await fetch(
        "http://localhost:3001/api/users/login/challenge",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ correo }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        setMessage(`Error backend: ${err.message || res.statusText}`);
        return;
      }

      const options = await res.json();

      // 2. Convertir challenge y allowCredentials.id a ArrayBuffer
      options.challenge = base64urlToArrayBuffer(options.challenge);
      if (options.allowCredentials) {
        options.allowCredentials = options.allowCredentials.map((cred) => ({
          ...cred,
          id: base64urlToArrayBuffer(cred.id),
        }));
      }

      // 3. Solicitar autenticación biométrica
      const assertion = await navigator.credentials.get({
        publicKey: options,
      });

      // 4. Serializar respuesta para enviar al backend
      const authenticationResponse = serializeAssertion(assertion);

      // 5. Enviar respuesta al backend para verificar autenticación
      const verifyRes = await fetch(
        "http://localhost:3001/api/users/login/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ correo, authenticationResponse }),
        }
      );

      if (!verifyRes.ok) {
        const err = await verifyRes.json();
        setMessage(
          `Error verificación: ${err.message || verifyRes.statusText}`
        );
        return;
      }

      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        setMessage("Inicio de sesión con huella exitoso!");
        // Aquí redirige o establece sesión
      } else {
        setMessage("Error en la verificación");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
      />
      <button onClick={handleLogin}>Iniciar sesión con huella</button>
      <p>{message}</p>
    </div>
  );
}
