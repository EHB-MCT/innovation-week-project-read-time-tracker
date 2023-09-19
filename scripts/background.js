chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractContent") {
    // Extract content from URL
    fetch(message.url)
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
