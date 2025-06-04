export const findMatchingDomElements = (feedbacks) => {
  feedbacks.forEach((feedback) => {
    if (feedback.status === "resolved") return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = feedback.htmlElement.trim();
    const element = tempDiv.firstElementChild;

    if (!element) return;

    const tag = element.tagName.toLowerCase();
    const attributes = Array.from(element.attributes);

    let selector = tag;
    attributes.forEach((attr) => {
      const value = attr.value.replace(/["']/g, "");
      selector += `[${attr.name}="${value}"]`;
    });

    const matchingElements = document.querySelectorAll(selector);
    matchingElements.forEach((el) => {
      if (
        document.querySelector(
          `.feedback-red-circle[data-feedback-id="${feedback.id}"]`
        )
      ) {
        return;
      }

      const elRect = el.getBoundingClientRect();

      const circle = document.createElement("div");

      circle.className = "feedback-red-circle";

      circle.setAttribute("data-feedback-id", feedback.id);
      circle.style.position = "absolute";
      circle.style.top = `${elRect.top - 16}px`;
      circle.style.left = `${elRect.right}px`;
      circle.style.width = "16px";
      circle.style.height = "16px";
      circle.style.background = " #ff913a";
      circle.style.borderRadius = "50%";

      circle.style.border = "2px solid white";
      circle.style.transform = "translate(-50%, 50%)";

      if (Math.abs(elRect.top) < 2) {
        circle.style.top = `${elRect.top - 10}px`;
      }
      if (window.innerWidth - elRect.right < 2) {
        circle.style.left = `${elRect.right - 8}px`;
      }

      document.body.appendChild(circle);

      if (
        document.querySelector(
          `.feedback-element-border[data-feedback-id="${feedback.id}"]`
        )
      ) {
        return;
      }

      const borderDiv = document.createElement("div");
      borderDiv.className = "feedback-element-border";
      borderDiv.setAttribute("data-feedback-id", feedback.id);
      borderDiv.style.position = "absolute";
      borderDiv.style.top = `${elRect.top - 2}px`;
      borderDiv.style.left = `${elRect.left - 2}px`;

      // Check if element width is (almost) the width of the viewport
      const isFullWidth = Math.abs(elRect.width - window.innerWidth) < 2;

      if (isFullWidth) {
        borderDiv.style.width = `${elRect.width - 4}px`;
        borderDiv.style.left = `${elRect.left + 2}px`;
      } else {
        borderDiv.style.width = `${elRect.width + 4}px`;
      }

      borderDiv.style.height = `${elRect.height + 4}px`;
      borderDiv.style.pointerEvents = "none";
      borderDiv.style.border = "0.5px solid  #ff913a";

      borderDiv.style.boxSizing = "border-box";

      document.body.appendChild(borderDiv);
    });
  });
};
