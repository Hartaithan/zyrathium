chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  window.postMessage({ from: "extension", ...msg }, "*");

  const handler = (event: MessageEvent) => {
    if (event.source !== window) return;
    switch (event.data?.from) {
      case "main-response":
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

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  switch (event.data?.from) {
    case "main-to-extension":
      chrome.runtime.sendMessage(event.data);
      break;
    default:
      break;
  }
});
