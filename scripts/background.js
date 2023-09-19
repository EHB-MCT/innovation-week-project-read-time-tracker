console.log("background.js");
console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);

chrome.tabs.onCreated.addListener(function(tab) {
    // Send a message to the content script to start the timer
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { startTimer: true });
      console.log(`Message sent to tab ${tabs[0].id}`)
    });
});