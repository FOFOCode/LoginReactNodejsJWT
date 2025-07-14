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
  // base64 a base64url
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function serializeCredential(credential) {
  if (!credential) return null;
  return {
    id: credential.id,
    type: credential.type,
    rawId: arrayBufferToBase64url(credential.rawId),
    response: {
      clientDataJSON: arrayBufferToBase64url(
        credential.response.clientDataJSON
      ),
      attestationObject: credential.response.attestationObject
        ? arrayBufferToBase64url(credential.response.attestationObject)
        : undefined,
      authenticatorData: credential.response.authenticatorData
        ? arrayBufferToBase64url(credential.response.authenticatorData)
        : undefined,
      signature: credential.response.signature
        ? arrayBufferToBase64url(credential.response.signature)
        : undefined,
      userHandle: credential.response.userHandle
        ? arrayBufferToBase64url(credential.response.userHandle)
        : undefined,
    },
  };
}

export default function RegisterFingerprint() {
  const [correo, setCorreo] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      // 1. Solicitar challenge al backend
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

      // 2. Convertir challenge y user.id a ArrayBuffer
      options.challenge = base64urlToArrayBuffer(options.challenge);
      options.user.id = base64urlToArrayBuffer(options.user.id);

      // 3. Ejecutar el prompt de huella
      const credential = await navigator.credentials.create({
        publicKey: options,
      });

      // 4. Serializar respuesta para enviar al backend
      const attestationResponse = serializeCredential(credential);

      // 5. Enviar la respuesta para verificar y guardar en backend
      const verifyRes = await fetch(
        "http://localhost:3001/api/users/login/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            correo,
            attestationResponse,
          }),
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
        setMessage("Huella registrada con éxito!");
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
        placeholder="Correo"
        onChange={(e) => setCorreo(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar huella</button>
      <p>{message}</p>
    </div>
  );
}
