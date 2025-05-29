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

export function App() {
  window.PROJECT_ID = "bc40efbc-c042-4c4d-9685-ae1a2348849d";
  const projectId = window.PROJECT_ID;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [mode, setMode] = useState("regular");
  const [isOpenModalAddFeedback, setIsOpenModalAddFeedback] = useState(false);
  const [htmlElement, setHtmlElement] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

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
    if (mode !== "textFeedback") return;

    if (mode === "textFeedback") {
      createBorder();
    }

    const handleClick = (event) => {
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

      setIsOpenModalAddFeedback(true);
      setHtmlElement(el.outerHTML);

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
        <img
          src="https://kartbahnlyss.ch/media/ca7bca87f7afbff765ab3f10ce6a175e89367e1e-245x51.png"
          alt="Placeholder"
        />
        <BasicOverlay mode={mode} setMode={setMode} />
        {(mode === "addFeedback" || mode === "textFeedback") && (
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
