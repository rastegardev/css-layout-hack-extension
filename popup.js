const eye = document.querySelector(".eye");
const button = document.querySelector(".button");
const circle = document.querySelector(".circle");
let buttonOn = false;

callWhiteOut = (tab) => {
  const { id, url } = tab;
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ["assets/script/addContent.js"],
  });
};

removeScript = (tab) => {
  const { id, url } = tab;
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ["assets/script/removeContent.js"],
  });
};

getCurrentTab = async () => {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const toggleButton = () => {
  if (buttonOn === false) {
    buttonOn = true;
    eye.innerHTML = "🙈";
    button.style.animation = "transformToBlue 0.5s ease-in-out 0s forwards";
    circle.style.animation = "moveCircleRight 0.5s ease-in-out 0s forwards";
    getCurrentTab().then((tab) => {
      callWhiteOut(tab);
    });
  } else if (buttonOn === true) {
    buttonOn = false;
    eye.innerHTML = "👀";
    button.style.animation = "transformToYellow 0.5s ease-in-out 0s forwards";
    circle.style.animation = "moveCircleLeft 0.5s ease-in-out 0s forwards";
    getCurrentTab().then((tab) => {
      removeScript(tab);
    });
  }
};
button.addEventListener("click", toggleButton);
