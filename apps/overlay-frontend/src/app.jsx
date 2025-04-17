import { useState } from "preact/hooks";
import BasicOverlay from "./components/basicOverlay.jsx";
import FeedbackOverlay from "./components/feedbackOverlay.jsx";
import TutorialOverlay from "./components/tutorialOverlay.jsx";
import ExtendedOverlay from "./components/extendedOverlay.jsx";

export function App() {
  const [mode, setMode] = useState("regular"); // Modes: "regular", "addFeedback", "showFeedback", "showTutorial"
  const returnToRegularMode = () => {
    setMode("regular");
  };

  return (
    <>
      <div>
        <BasicOverlay mode={mode} setMode={setMode} />
        <p className="text-h-lg">asdg</p>
        {mode === "addFeedback" && (
          <ExtendedOverlay returnToRegularMode={returnToRegularMode} />
        )}
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
