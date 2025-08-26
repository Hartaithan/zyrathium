chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  window.postMessage({ from: "bridge-to-main", ...msg }, "*");

  const handler = (event: MessageEvent) => {
    if (event.source !== window) return;
    switch (event.data?.from) {
      case "main-to-bridge":
        window.removeEventListener("message", handler);
        sendResponse(event.data.payload);
        break;
      default:
        break;
    }
  };
  window.addEventListener("message", handler);

  return true;
});
