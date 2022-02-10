const range = document.querySelector("#range");
const label = document.querySelector("#label");
const body = document.querySelector("body");

chrome.tabs.query(
  {
    active: true,
    lastFocusedWindow: true,
  },
  (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;
    if (!tab?.url?.startsWith("http"))
      return (body.innerHTML = "Not Supported!");

    updateVolumeText(tab);
    range.addEventListener("input", () => listenerFunction(tab));
    range.addEventListener("change", () => listenerFunction(tab));
  }
);

const executeScript = async (tab, func, args) => {
  await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func,
    args,
  });
};

const updateVolumeText = async (tab) => {
  chrome.tabs.sendMessage(tab.id, "getVolume", (response) => {
    label.innerText = `Volume  (${response * 100}%)`;
    range.value = response * 100;
  });
};

const listenerFunction = async (tab) => {
  await executeScript(
    tab,
    (value) => {
      document.querySelectorAll("audio").forEach((audio) => {
        audio.volume = value / 100;
      });
    },
    [range.value]
  );
  label.innerText = `Volume  (${range.value}%)`;
};
