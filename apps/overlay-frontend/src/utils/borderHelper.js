export const createBorder = () => {
  const border = document.createElement("div");
  border.style.position = "fixed";
  border.style.top = "0";
  border.style.left = "0";
  border.style.width = "100vw";
  border.style.height = "100vh";
  border.style.pointerEvents = "none";
  border.style.border = "5px solid #ff913a";
  border.style.zIndex = "9999";
  border.id = "orange-screen-border";

  document.body.appendChild(border);
};
export const deleteBorder = () => {
  const existingBorder = document.getElementById("orange-screen-border");

  if (existingBorder) {
    existingBorder.remove();
  }
};
