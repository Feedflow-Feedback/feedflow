import { useState, useEffect } from "preact/hooks";
import BasicOverlay from "./components/basicOverlay.jsx";
import FeedbackOverlay from "./components/feedbackOverlay.jsx";
import TutorialOverlay from "./components/tutorialOverlay.jsx";
import ExtendedOverlay from "./components/extendedOverlay.jsx";
import ExtendedOverlayModal from "./components/extendedOverlayModal.jsx";
import { findMatchingDomElements } from "./utils/feedbackDomUtils.js";
import { createBorder, deleteBorder } from "./utils/borderHelper.js";
import { fetchFeedbacksByProject } from "./services/feedbackService";
import { Modes } from "./constants/modes";
import { highlightDomElement } from "./utils/highlightDomElement.js";
import { takeScreenshot } from "./utils/takeScreenshot.js";

export function App() {
  window.PROJECT_ID = "bc40efbc-c042-4c4d-9685-ae1a2348849d";
  const projectId = window.PROJECT_ID;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [mode, setMode] = useState("regular");
  const [isOpenModalAddFeedback, setIsOpenModalAddFeedback] = useState(false);
  const [htmlElement, setHtmlElement] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const update = () => {
    fetchAllFeedbacks();
  };

  const returnToRegularMode = () => {
    setMode(Modes.REGULAR);
  };
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const closeAndModeSwitch = () => {
    setIsOpenModalAddFeedback(false);
    setMode(Modes.ADD_FEEDBACK);
    deleteBorder();
    fetchAllFeedbacks();
  };

  const fetchAllFeedbacks = async () => {
    const feedbacks = await fetchFeedbacksByProject(projectId, backendUrl);
    setFeedbacks(feedbacks);
    findMatchingDomElements(feedbacks);
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);
  useEffect(() => {
    if (mode !== "textFeedback" && mode !== "photoFeedback") return;

    if (mode === "textFeedback") {
      createBorder();
    }

    if (mode === "photoFeedback") {
      createBorder();
    }

    const handleClick = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const nonClickableSelectors = [".no-click"];
      const closeClickableSelectors = [".close"];

      const el = event.target;
      const existingBorder = document.getElementById("orange-screen-border");
      if (!existingBorder) {
        createBorder();
      }

      if (nonClickableSelectors.some((sel) => el.matches && el.matches(sel))) {
        event.preventDefault();
        event.stopPropagation();

        return false;
      }
      if (
        closeClickableSelectors.some((sel) => el.matches && el.matches(sel))
      ) {
        event.preventDefault();
        event.stopPropagation();
        setMode(Modes.REGULAR);
        deleteBorder();

        return false;
      }
      setHtmlElement(el.outerHTML);
      if (mode === "photoFeedback") {
        console.log("Photo feedback mode active");
        highlightDomElement(el);

        const imageDataUrl = await takeScreenshot();

        // Convert data URL to Blob
        const res = await fetch(imageDataUrl);
        const arrayBuffer = await res.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const fileData = Array.from(uint8Array);

        console.log("Image data URL:", fileData);
      }
      if (mode === "textFeedback") {
        console.log("Text feedback mode active");
        setIsOpenModalAddFeedback(true);
      }

      document.removeEventListener("click", handleClick, true);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [mode]);

  const renderOverlay = () => {
    switch (mode) {
      case Modes.SHOW_FEEDBACK:
        return (
          <FeedbackOverlay
            returnToRegularMode={returnToRegularMode}
            feedbacks={feedbacks}
            update={update}
          />
        );
      case Modes.SHOW_TUTORIAL:
        return <TutorialOverlay returnToRegularMode={returnToRegularMode} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <p>Example Text</p>
        <div>
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
          <img src="./src/assets/preact.svg" alt="Placeholder" />
        </div>

        <BasicOverlay mode={mode} setMode={setMode} />
        {(mode === "addFeedback" ||
          mode === "textFeedback" ||
          mode === "photoFeedback") && (
          <>
            <ExtendedOverlay
              returnToRegularMode={returnToRegularMode}
              setMode={handleModeChange}
              mode={mode}
            />

            <ExtendedOverlayModal
              open={isOpenModalAddFeedback}
              close={() => closeAndModeSwitch()}
              htmlElement={htmlElement}
            />
          </>
        )}

        {renderOverlay()}
      </div>
    </>
  );
}
