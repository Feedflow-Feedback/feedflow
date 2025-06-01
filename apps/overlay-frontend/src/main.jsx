import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
const local = false;
if (local) {
  render(<App />, document.getElementById("app"));
} else {
  function initFeedbackWidget(containerId = "app") {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");

      document.body.appendChild(container);
    }

    render(<App />, container);
  }
  window.FeedbackWidget = { init: initFeedbackWidget };
}
