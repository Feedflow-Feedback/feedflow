import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import styles from "./index.css?inline";

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

    const shadowHost = document.createElement("div");
    container.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    shadowRoot.appendChild(styleEl);

    const rootEl = document.createElement("div");
    shadowRoot.appendChild(rootEl);

    render(<App />, rootEl);
  }

  window.FeedbackWidget = { init: initFeedbackWidget };
}
