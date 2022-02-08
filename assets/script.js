const range = document.getElementById("range");
const label = document.getElementById("label");

const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tabs[0];
};

const executeScript = async (tab, func, args) => {
  await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func,
    args,
  });
};

const updateVolumeText = async () => {
  const tab = await getCurrentTab();
  chrome.tabs.sendMessage(
    tab.id,
    "getVolume",
    (response) => {
      label.innerText = `Volume  (${response * 100}%)`;
      range.value = response * 100;
    }
  );
};

const listenerFunction = async () => {
  const tab = await getCurrentTab();
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

updateVolumeText();
range.oninput = listenerFunction;
range.onchange = listenerFunction;
