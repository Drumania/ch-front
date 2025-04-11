import { useRegisterSW } from "virtual:pwa-register/react";
import { useState } from "react";

export default function UpdateNotification() {
  const [show, setShow] = useState(false);

  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      setShow(true);
    },
    onOfflineReady() {
      console.log("✅ App lista para uso offline");
    },
  });

  if (!show) return null;

  return (
    <div className="pwa-update-notification">
      <p>🔄 Hay una nueva versión disponible.</p>
      <button onClick={() => updateServiceWorker(true)}>Actualizar</button>
    </div>
  );
}
