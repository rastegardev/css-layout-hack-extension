removeStyle = () => {
  // Remove custom styles
  let styles = document.getElementById("custom-styles");
  if (styles) {
    styles.parentNode.removeChild(styles);
  }

  // Remove z-index spans
  const zIndexSpans = document.querySelectorAll(".element-z-index");
  zIndexSpans.forEach((span) => {
    span.remove();
  });
};

// Call the function to remove custom styles and z-index spans
removeStyle();
