export const unHighlightDomElement = (feedbackId = "temp") => {
  // Remove all matching red circles
  console.log("Unhighlighting element with feedbackId:", feedbackId);
  const circles = document.querySelectorAll(".feedback-red-circle");
  circles.forEach((circle) => {
    if (circle.getAttribute("data-feedback-id") === feedbackId) {
      console.log("Removing circle for feedbackId:", feedbackId);
      circle.remove();
    }
  });

  // Remove all matching borders
  const borders = document.querySelectorAll(".feedback-element-border");
  borders.forEach((border) => {
    if (border.getAttribute("data-feedback-id") === feedbackId) {
      console.log("Removing border for feedbackId:", feedbackId);
      border.remove();
    }
  });
};
