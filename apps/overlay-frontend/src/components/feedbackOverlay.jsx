import { useState, useEffect } from "preact/hooks";
import crossIcon from "../assets/icons/cross_icon.svg";
import TabsNavigation from "./feedbackOverlay/tabsNavigation.jsx";
import SortOptions from "./feedbackOverlay/sortOptions.jsx";
import IndividualFeedback from "./feedbackOverlay/individualFeedback.jsx";
import Feedbacks from "./feedbackOverlay/feedbacks.jsx";

export default function FeedbackOverlay({
  returnToRegularMode,
  feedbacks,
  update,
}) {
  const [activeTab, setActiveTab] = useState("Unresolved");
  const projectId = window.PROJECT_ID;

  const [openFeedbacks, setOpenFeedbacks] = useState([]);
  const [resolvedFeedbacks, setResolvedFeedbacks] = useState([]);

  useEffect(() => {
    const open = [];
    const closed = [];
    feedbacks.forEach((feedback) => {
      if (feedback.status === "open") {
        open.push(feedback);
      } else {
        closed.push(feedback);
      }
    });
    setOpenFeedbacks(open);
    setResolvedFeedbacks(closed);
  }, [feedbacks]);

  return (
    <div
      id="feedbackOverlay"
      className="absolute top-0 right-0 overflow-y-scroll h-[calc(100vh-60px)] mt-[30px] w-xl bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl"
    >
      <div className="relative">
        <div className="pt-6  px-8">
          <p className="text-h-xs font-bold font-inter">Feedbacks</p>
          <div className="mt-8">
            <TabsNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              openAmount={openFeedbacks.length}
              resolvedAmount={resolvedFeedbacks.length}
            />
          </div>
        </div>

        <img
          src={crossIcon}
          alt="Close"
          className="w-8 cursor-pointer absolute top-4 right-4"
          onClick={returnToRegularMode}
        />
      </div>

      <div className="mt-4">
        {activeTab === "Unresolved" && (
          <Feedbacks feedbacks={openFeedbacks} update={update} />
        )}
        {activeTab === "Resolved" && (
          <Feedbacks feedbacks={resolvedFeedbacks} update={update} />
        )}
        {activeTab === "All" && (
          <Feedbacks feedbacks={feedbacks} update={update} />
        )}
      </div>
    </div>
  );
}
