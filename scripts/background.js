//   // Listen for tab creation
// chrome.tabs.onCreated.addListener(function(tab) {
//     // Send a message to the timer script to start the timer
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { startTimer: true });
//     });
// });
