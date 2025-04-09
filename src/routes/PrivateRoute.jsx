import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined mientras carga

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsub();
  }, []);

  if (user === undefined)
    return <p className="text-center mt-4">Cargando...</p>;

  if (!user) return <Navigate to="/" replace />;

  return children;
}
