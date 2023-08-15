// Function to update the UI based on the button state
const updateUI = (buttonOn) => {
  const eye = document.querySelector(".eye");
  const button = document.querySelector(".button");
  const circle = document.querySelector(".circle");

  if (buttonOn) {
    eye.innerHTML = "🙈";
    button.style.animation = "transformToBlue 0.5s ease-in-out 0s forwards";
    circle.style.animation = "moveCircleRight 0.5s ease-in-out 0s forwards";
  } else {
    eye.innerHTML = "👀";
    button.style.animation = "transformToYellow 0.5s ease-in-out 0s forwards";
    circle.style.animation = "moveCircleLeft 0.5s ease-in-out 0s forwards";
  }
};

// Function to retrieve and update button state from local storage
const updateButtonStateFromLocalStorage = () => {
  chrome.storage.local.get(["buttonOn"], (result) => {
    const buttonOn = result.buttonOn || false; // Default to false if not set
    updateUI(buttonOn);
    if (buttonOn) {
      callWhiteOut();
    } else {
      removeScript();
    }
  });
};

// Function to callWhiteOut based on the button state
const callWhiteOut = () => {
  getCurrentTab().then((tab) => {
    const { id, url } = tab;
    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      files: ["assets/script/addContent.js"],
    });
  });
};

// Function to removeScript based on the button state
const removeScript = () => {
  getCurrentTab().then((tab) => {
    const { id, url } = tab;
    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      files: ["assets/script/removeContent.js"],
    });
  });
};

// Function to get the current tab
const getCurrentTab = async () => {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

// Add event listener to the button
document.querySelector(".button").addEventListener("click", () => {
  // Toggle the button state
  chrome.storage.local.get(["buttonOn"], (result) => {
    const newButtonState = !result.buttonOn; // Toggle the state
    chrome.storage.local.set({ buttonOn: newButtonState }, () => {
      updateUI(newButtonState);
      if (newButtonState) {
        callWhiteOut();
      } else {
        removeScript();
      }
    });
  });
});

// Update the UI based on the button state when the content script is loaded
updateButtonStateFromLocalStorage();

// Listen for changes in local storage and update UI accordingly
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && "buttonOn" in changes) {
    updateUI(changes.buttonOn.newValue);
    if (changes.buttonOn.newValue) {
      callWhiteOut();
    } else {
      removeScript();
    }
  }
});
