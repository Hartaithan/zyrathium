chrome.commands.onCommand.addListener((command) => {
  if (command === "insert_content") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      const tabId = tabs[0].id;
      if (!tabId) return;

      chrome.tabs.sendMessage(tabId, { type: "GET_CONTENT" }, (response) => {
        if (chrome.runtime.lastError) {
          const message = chrome.runtime.lastError.message;
          console.warn("unable to read message from main", message);
          return;
        }

        if (!response?.content) {
          console.warn("unable to get message from main", response);
          return;
        }

        console.log("content received", response.content);
        chrome.tabs.sendMessage(tabId, {
          type: "INSERT_CONTENT",
          content: response.content,
        });
      });
    });
  }
});
