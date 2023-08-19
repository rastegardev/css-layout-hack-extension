addStyle = () => {
  let domStyle = document.createElement("style");
  domStyle.id = "custom-styles";
  domStyle.append(
    "* { color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.1) !important; }\
    * * { background-color: rgba(0,255,0,.1) !important; }\
    * * * { background-color: rgba(0,0,255,.1) !important; }\
    * * * * { background-color: rgba(255,0,255,.1) !important; }\
    * * * * * { background-color: rgba(0,255,255,.1) !important; }\
    * * * * * * { background-color: rgba(255,255,0,.1) !important; }\
    * * * * * * * { background-color: rgba(255,0,0,.1) !important; }\
    * * * * * * * * { background-color: rgba(0,255,0,.1) !important; }\
    * * * * * * * * * { background-color: rgba(0,0,255,.1) !important; }"
  );
  document.body.appendChild(domStyle);

  // Apply CSS styles for the z-index display
  const style = document.createElement("style");
  style.innerHTML = `
    .element-z-index {
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      padding: 2px 5px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `;
  document.head.appendChild(style);

  // Get all semantic elements with a z-index property
  const semanticElementsWithZIndex = document.querySelectorAll(
    "div, header, footer, section, nav, article, aside"
  );

  // Display z-index on the page
  semanticElementsWithZIndex.forEach((element) => {
    const elementZIndex = document.createElement("span");
    const zIndexValue = getComputedStyle(element).zIndex;
    if (zIndexValue !== "auto") {
      elementZIndex.textContent = `z-index: ${zIndexValue}`;
      elementZIndex.classList.add("element-z-index");
      element.appendChild(elementZIndex);
    }
  });
};

addStyle();
