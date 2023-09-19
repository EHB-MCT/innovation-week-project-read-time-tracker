chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractContent") {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // proxy url to bypass cors restriction
    // Extract content from URL
    fetch(proxyUrl + message.url)
      .then((response) => response.text())
      .then((html) => {
        sendResponse({ message: html });
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        sendResponse({ error: "Failed to fetch content" });
      });

    // Returning true here indicates that sendResponse will be called asynchronously
    return true;
  }
});
console.log("background.js");
console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);

chrome.tabs.onCreated.addListener(function(tab) {
    // Send a message to the content script to start the timer
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { startTimer: true });
      console.log(`Message sent to tab ${tabs[0].id}`)
    });
});
