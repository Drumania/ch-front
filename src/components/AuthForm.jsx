// src/components/AuthForm.jsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Button } from "primereact/button";

export default function AuthForm({ mode = "login", onClose }) {
  const [isRegistering, setIsRegistering] = useState(mode === "register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button
          type="submit"
          label={isRegistering ? "Registrarme" : "Ingresar"}
        />
      </form>

      <Button
        label="Continuar con Google"
        icon="pi pi-google"
        className="p-button-secondary mt-2"
        onClick={handleGoogleLogin}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className="mt-3">
        {isRegistering ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="btn btn-link p-0"
        >
          {isRegistering ? "Iniciar sesión" : "Registrarse"}
        </button>
      </p>
    </div>
  );
}
