document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("popup");
  link.addEventListener("click", function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create({ url: tab.url.replace(/www./, "ss") });
    });
  });
});
