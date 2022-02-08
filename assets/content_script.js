chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getVolume") {
    sendResponse(document.querySelector("audio")?.volume ?? 1);
  }
});
