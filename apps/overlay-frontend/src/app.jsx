import { useState, useEffect } from "preact/hooks";
import BasicOverlay from "./components/basicOverlay.jsx";
import FeedbackOverlay from "./components/feedbackOverlay.jsx";
import TutorialOverlay from "./components/tutorialOverlay.jsx";
import ExtendedOverlay from "./components/extendedOverlay.jsx";
import ExtendedOverlayModal from "./components/extendedOverlayModal.jsx";
import axios from "axios";

export function App() {
  window.PROJECT_ID = "7ac760a6-6020-4c19-b99d-d03ad8103e6e";
  const projectId = window.PROJECT_ID;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [mode, setMode] = useState("regular");
  const [isOpenModalAddFeedback, setIsOpenModalAddFeedback] = useState(false);
  const [htmlElement, setHtmlElement] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const returnToRegularMode = () => {
    setMode("regular");
  };
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const deleteBorder = () => {
    const existingBorder = document.getElementById("orange-screen-border");

    if (existingBorder) {
      existingBorder.remove();
    }
  };
  const createBorder = () => {
    const border = document.createElement("div");
    border.style.position = "fixed";
    border.style.top = "0";
    border.style.left = "0";
    border.style.width = "100vw";
    border.style.height = "100vh";
    border.style.pointerEvents = "none";
    border.style.border = "5px solid #ff913a";
    border.style.zIndex = "9999";
    border.id = "orange-screen-border";

    document.body.appendChild(border);
  };

  const closeAndModeSwitch = () => {
    setIsOpenModalAddFeedback(false);
    setMode("addFeedback");
    deleteBorder();
    fetchAllFeedbacks();
  };

  const fetchAllFeedbacks = async () => {
    const response = await axios.post(
      `${backendUrl}/feedback/getAllByProject`,
      {
        projectId: projectId,
      }
    );
    setFeedbacks(response.data);
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
        setMode("regular");
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

        {feedbacks.map((feedback, index) => (
          <p>{feedback.htmlElement}</p>
        ))}
        {mode === "showFeedback" && (
          <FeedbackOverlay returnToRegularMode={returnToRegularMode} />
        )}
        {mode === "showTutorial" && (
          <TutorialOverlay returnToRegularMode={returnToRegularMode} />
        )}
      </div>
    </>
  );
}
