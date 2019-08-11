const backgroundURLChangeListener = function(tabId, changeInfo, tabInfo) {
  var newUrl = changeInfo.url;
  var currentTab = tabId;
  if (newUrl && newUrl.includes("https://www.youtube.com/")) {
    chrome.tabs.sendMessage(currentTab, "you are on youtube");
  }
};

chrome.tabs.onUpdated.addListener(backgroundURLChangeListener);
