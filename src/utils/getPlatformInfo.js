export function getPlatformInfo() {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone;

  return {
    isIos,
    isAndroid,
    isStandalone,
    isMobile: isIos || isAndroid,
  };
}
