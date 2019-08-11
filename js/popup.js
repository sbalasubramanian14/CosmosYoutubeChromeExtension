document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("popup");
  link.addEventListener("click", function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create({ url: tab.url.replace(/www./, "ss") });
    });
  });

  var github = document.getElementById("github-link");
  github.addEventListener("click", function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create({
        url:
          "https://github.com/sbalasubramanian14/CosmosYoutubeChromeExtension"
      });
    });
  });
});
