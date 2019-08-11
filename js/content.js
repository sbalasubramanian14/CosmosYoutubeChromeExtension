var initialSkipInProgress = true;

// To Skip the first ad
const initialSkip = function() {
  count = 0;
  let checkAndSkip = setInterval(function() {
    let adSkipButton = document
      .getElementsByClassName("ytp-ad-skip-button-container")
      .item(0);

    // stop the initial skip if either the skip button is available
    // or the check count is > 20, which means no initial ads in the video
    if (adSkipButton || count >= 20) {
      clearInterval(checkAndSkip);
      initialSkipInProgress = false;
      if (adSkipButton) {
        adSkipButton.click();
      }
    }
    count++;
  }, 200);
};

// To skips the subsequent ads in-between the video and close the popup ads
const subsequentSkip = function() {
  // Run after initial skip
  if (!initialSkipInProgress) {
    count = 0;

    let checkAndSkip = setInterval(function() {
      let adSkipButton = document
        .getElementsByClassName("ytp-ad-skip-button-container")
        .item(0);

      let adCloseButton = document
        .getElementsByClassName("ytp-ad-overlay-close-button")
        .item(0);

      if (adSkipButton || adCloseButton || count >= 20) {
        clearInterval(checkAndSkip);
        if (adSkipButton) {
          adSkipButton.click();
        } else if (adCloseButton) {
          adCloseButton.click();
        }
      }
      count++;
    }, 200);
  }
};

const skipAndSetUp = function(time) {
  initialSkip();
  setTimeout(function() {
    setUpMutationObserverForInAds();
  }, time);
};

// Skip at first load
window.addEventListener("load", skipAndSetUp(1000), false);

// Skip at subsequent loads.
// Listens to the background.js listener, and calls the skip function if the page loads to youtube.
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  skipAndSetUp(2000);
});

// Setting up a mutation observer for full video ads
const callback = function(mutationsList, observer) {
  subsequentSkip();
};

const setUpMutationObserverForInAds = function() {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByClassName("video-ads").item(0);

  // Options for the observer (which mutations to observe)
  const config = { childList: true };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
};
