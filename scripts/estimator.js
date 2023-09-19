window.onload = () => {
  console.log("Estimator loaded");

  console.log("Fetching all search result urls");
  const urls = getSearchResultUrls();

  urls.forEach((url, index) => {
    fetchUrl(url, index);
  });
};

const getSearchResultUrls = () => {
  // Use querySelector to find 'span' inside class .g
  const urls = [];

  const results = document.querySelectorAll(".g a");
  results.forEach((result, index) => {
    // Push href attribute of each result to urls array
    urls.push(result.href);
  });

  // Return array of urls
  return urls;
};

const fetchUrl = (url, index) => {
  chrome.runtime.sendMessage(
    { action: "extractContent", url: url },
    (response) => {
      // Parse response
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(
        response.message,
        "text/html"
      );
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlDocument.body.innerHTML;

      // Remove HTML tags to get plain text
      const text = tempElement.textContent.replace(/<[^>]+>/g, "");

      // Split text into words
      const words = text.split(/\s+/);

      // Calculate reading time in minutes
      const wpm = 200;
      const readingTime = Math.ceil(words.length / wpm);

      // Create a new element to display reading time
      const readingTimeElement = document.createElement("span");
      readingTimeElement.style.display = "block";
      readingTimeElement.style.marginTop = "10px";
      readingTimeElement.style.fontSize = "12px";
      readingTimeElement.id = `reading_time_${index}`;
      readingTimeElement.textContent = `${readingTime} min read`;
      readingTimeElement.style.color = "#5f6368";

      // Append reading time element to each result
      const resultWrapper = document.querySelectorAll(".g")[index];
      resultWrapper.appendChild(readingTimeElement);
    }
  );
};
