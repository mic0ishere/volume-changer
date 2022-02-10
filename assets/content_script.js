chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getVolume") {
    sendResponse(String(document.querySelector("audio")?.volume ?? 1));
  }
});
