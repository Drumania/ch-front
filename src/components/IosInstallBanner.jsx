import { useEffect, useState } from "react";
import "./IosInstallBanner.css";

export default function IosInstallBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIos = () => {
      const ua = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(ua);
    };

    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    const alreadyDismissed = localStorage.getItem("ios-install-dismissed");

    if (isIos() && !isInStandaloneMode() && !alreadyDismissed) {
      setTimeout(() => {
        setShow(true);
      }, 1500);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("ios-install-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="install-banner-ios">
      <button className="close-btn" onClick={handleClose}>
        ✖
      </button>
      <p>
        📲 Agregá esta app a tu pantalla de inicio para una mejor experiencia.
      </p>
      <small>
        En Safari, tocá <strong>Compartir</strong> y luego{" "}
        <strong>“Agregar a pantalla de inicio”</strong>.
      </small>
    </div>
  );
}
