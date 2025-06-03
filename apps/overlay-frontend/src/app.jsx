import { useState, useEffect } from "preact/hooks";
import BasicOverlay from "./components/basicOverlay.jsx";
import FeedbackOverlay from "./components/feedbackOverlay.jsx";
import TutorialOverlay from "./components/tutorialOverlay.jsx";
import ExtendedOverlay from "./components/extendedOverlay.jsx";
import ExtendedOverlayModal from "./components/extendedOverlayModal.jsx";
import { findMatchingDomElements } from "./utils/feedbackDomUtils.js";
import { createBorder, deleteBorder } from "./utils/borderHelper.js";
import { fetchFeedbacksByProject } from "./services/feedbackService";
import ExtendedOverlayModalPhoto from "./components/extendedOverlayModalPhoto.jsx";
import { Modes } from "./constants/modes";
import { highlightDomElement } from "./utils/highlightDomElement.js";
import { takeScreenshot } from "./utils/takeScreenshot.js";
import { unHighlightDomElement } from "./utils/unHighlightDomElement";
import "./index.css";

export function App() {
  window.PROJECT_ID = "119cf9ca-0a31-403f-8bb2-6af7d1b8e13d";
  const projectId = window.PROJECT_ID;
  const backendUrl = "http://localhost:3000";

  const [mode, setMode] = useState("regular");
  const [isOpenModalAddFeedback, setIsOpenModalAddFeedback] = useState(false);
  const [isOpenModalAddFeedbackPhoto, setIsOpenModalAddFeedbackPhoto] =
    useState(false);

  const [htmlElement, setHtmlElement] = useState(null);
  const [photoElement, setPhotoElement] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const update = () => {
    fetchAllFeedbacks();
  };

  const returnToRegularMode = () => {
    setMode(Modes.REGULAR);
    deleteBorder();
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
  const closeAndModeSwitchPhoto = () => {
    setIsOpenModalAddFeedbackPhoto(false);
    setMode(Modes.ADD_FEEDBACK);
    deleteBorder();
    //here
    //unHighlightDomElement(htmlElement);
    unHighlightDomElement();
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
        createBorder();

        highlightDomElement(el);

        const imageDataUrl = await takeScreenshot();

        // Convert data URL to Blob
        const res = await fetch(imageDataUrl);
        const arrayBuffer = await res.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const fileData = Array.from(uint8Array);

        setPhotoElement(fileData);

        setIsOpenModalAddFeedbackPhoto(true);
      }
      if (mode === "textFeedback") {
        createBorder();

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
      {/* <p>Example Text</p>
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
        </div> */}
      <p id="exampleElement">asd</p>

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

          <ExtendedOverlayModalPhoto
            open={isOpenModalAddFeedbackPhoto}
            close={() => closeAndModeSwitchPhoto()}
            htmlElement={htmlElement}
            photoElement={photoElement}
          />
        </>
      )}

      {renderOverlay()}
    </>
  );
}
