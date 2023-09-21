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

      // Find all words in readable text tags
      const readableTextTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
      const readableText = tempElement.querySelectorAll(readableTextTags);

      // Get all text content from readable text tags
      let textContent = "";
      readableText.forEach((element) => {
        console.log("Element", element);
        textContent += element.textContent;
      });

      // Remove HTML tags to get plain text
      const text = tempElement.textContent.replace(/<[^>]+>/g, "");

      // Split text into words
      const words = textContent.split(/\s+/);

      // Calculate reading time in minutes
      let wpm = 200;
      const readingTime = Math.ceil(words.length / wpm);

      // Function to request the reading speed value from the background script
      const getWPMFromStorage = () => {
        console.log("Getting reading speed value from storage");
        chrome.storage.sync.get({
          option: 200, // Default value for Medium
        }, (items) => {
          wpm = parseInt(items.option); // Parse the value to an integer
          console.log(`current wpm: ${wpm}`);
        });
      };

      // Call the function to get the reading speed value
      //document.addEventListener("DOMContentLoaded", getWPMFromStorage); //Never gets called for some reason
      getWPMFromStorage(); //gets called multiple times for some reason


      // Wrapper
      const divWrapper = document.createElement("div");
      divWrapper.style.display = "flex";
      divWrapper.style.alignItems = "center";
      divWrapper.style.marginTop = "10px";
      divWrapper.style.gap = "5px";

      // Icon
      const icon = document.createElement("div");
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#16d05d}</style><path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>`;
      icon.style.display = "flex";
      icon.style.alignItems = "center";

      // Create a new element to display reading time
      const readingTimeElement = document.createElement("span");
      readingTimeElement.style.display = "block";
      readingTimeElement.style.fontSize = "12px";
      readingTimeElement.id = `reading_time_${index}`;
      readingTimeElement.textContent = `${readingTime} min read`;
      readingTimeElement.style.color = "rgb(22,208,93)";

      // Append reading time element to each result
      const resultWrapper = document.querySelectorAll(".g")[index];
      resultWrapper.appendChild(divWrapper);
      divWrapper.appendChild(icon);
      divWrapper.appendChild(readingTimeElement);
    }
  );
};
