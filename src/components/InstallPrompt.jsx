import { useEffect, useState } from "react";
import { getPlatformInfo } from "@/utils/getPlatformInfo";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const { isAndroid, isStandalone } = getPlatformInfo();

    const handler = (e) => {
      if (!isAndroid || isStandalone) return;

      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("✅ Usuario aceptó instalación");
    } else {
      console.log("❌ Usuario rechazó instalación");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="install-prompt-container">
      <button onClick={handleInstall} className="install-prompt-button">
        📲 Instalar App
      </button>
    </div>
  );
}
