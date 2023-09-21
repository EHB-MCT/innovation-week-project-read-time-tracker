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
