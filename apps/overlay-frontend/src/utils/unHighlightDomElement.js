export const unHighlightDomElement = (feedbackId = "temp") => {
  const circles = document.querySelectorAll(".feedback-red-circle");
  circles.forEach((circle) => {
    if (circle.getAttribute("data-feedback-id") === feedbackId) {
      circle.remove();
    }
  });

  const borders = document.querySelectorAll(".feedback-element-border");
  borders.forEach((border) => {
    if (border.getAttribute("data-feedback-id") === feedbackId) {
      border.remove();
    }
  });
};
