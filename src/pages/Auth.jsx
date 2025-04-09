// src/pages/Auth.jsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let result;
      if (isRegistering) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      await saveUserToFirestore(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const saveUserToFirestore = async (user) => {
    if (!user) return;

    const ref = doc(db, "usuarios", user.uid);
    await setDoc(
      ref,
      {
        displayName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "/img/defaultavatar.png",
        lastLogin: new Date(),
      },
      { merge: true }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isRegistering ? "Registrarse" : "Iniciar sesión"}</h2>
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
        <button type="submit">
          {isRegistering ? "Registrarme" : "Ingresar"}
        </button>
      </form>

      <button onClick={handleGoogleLogin} style={{ marginTop: 10 }}>
        Continuar con Google
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 20 }}>
        {isRegistering ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Iniciar sesión" : "Registrarse"}
        </button>
      </p>
    </div>
  );
}
