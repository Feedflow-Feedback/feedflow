export const highlightDomElement = (el, feedbackId = "temp") => {
  if (!el) return;

  const elRect = el.getBoundingClientRect();

  // Avoid duplicate circles
  if (
    document.querySelector(
      `.feedback-red-circle[data-feedback-id="${feedbackId}"]`
    )
  )
    return;

  // Create red circle
  const circle = document.createElement("div");
  circle.className = "feedback-red-circle";
  circle.setAttribute("data-feedback-id", feedbackId);
  circle.style.position = "absolute";
  circle.style.top = `${elRect.top - 16}px`;
  circle.style.left = `${elRect.right}px`;
  circle.style.width = "16px";
  circle.style.height = "16px";
  circle.style.background = "red";
  circle.style.borderRadius = "50%";
  circle.style.zIndex = "10000";
  circle.style.border = "2px solid white";
  circle.style.transform = "translate(-50%, 50%)";

  if (Math.abs(elRect.top) < 2) {
    circle.style.top = `${elRect.top - 10}px`;
  }
  if (window.innerWidth - elRect.right < 2) {
    circle.style.left = `${elRect.right - 8}px`;
  }

  document.body.appendChild(circle);

  // Avoid duplicate borders
  if (
    document.querySelector(
      `.feedback-element-border[data-feedback-id="${feedbackId}"]`
    )
  )
    return;

  // Create border
  const borderDiv = document.createElement("div");
  borderDiv.className = "feedback-element-border";
  borderDiv.setAttribute("data-feedback-id", feedbackId);
  borderDiv.style.position = "absolute";
  borderDiv.style.top = `${elRect.top - 2}px`;
  borderDiv.style.left = `${elRect.left - 2}px`;

  const isFullWidth = Math.abs(elRect.width - window.innerWidth) < 2;

  if (isFullWidth) {
    borderDiv.style.width = `${elRect.width - 4}px`;
    borderDiv.style.left = `${elRect.left + 2}px`;
  } else {
    borderDiv.style.width = `${elRect.width + 4}px`;
  }

  borderDiv.style.height = `${elRect.height + 4}px`;
  borderDiv.style.pointerEvents = "none";
  borderDiv.style.border = "0.5px solid red";
  borderDiv.style.zIndex = "9999";
  borderDiv.style.boxSizing = "border-box";

  document.body.appendChild(borderDiv);
};
