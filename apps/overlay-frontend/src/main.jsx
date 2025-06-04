import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css"; // still useful for dev
import styles from "./index.css?inline"; // gets CSS as a string for Shadow DOM

const local = false;

if (local) {
  render(<App />, document.getElementById("app"));
} else {
  function initFeedbackWidget(containerId = "app") {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }

    // Create Shadow DOM
    const shadowHost = document.createElement("div");
    container.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    // Inject styles
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    shadowRoot.appendChild(styleEl);

    // Mount Preact app
    const rootEl = document.createElement("div");
    shadowRoot.appendChild(rootEl);

    render(<App />, rootEl);
  }

  window.FeedbackWidget = { init: initFeedbackWidget };
}
