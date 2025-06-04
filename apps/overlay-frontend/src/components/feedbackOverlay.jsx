import { useState, useEffect } from "preact/hooks";
import TabsNavigation from "./feedbackOverlay/tabsNavigation.jsx";
import Feedbacks from "./feedbackOverlay/feedbacks.jsx";

export default function FeedbackOverlay({
  returnToRegularMode,
  feedbacks,
  update,
}) {
  const [activeTab, setActiveTab] = useState("Unresolved");

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
      className="fixed top-0 right-0 overflow-y-scroll h-[calc(100vh-60px)] mt-[30px] w-xl bg-white text-black shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl z-50"
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

        <svg
          onClick={returnToRegularMode}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-8 cursor-pointer absolute top-4 right-4"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#666666"
          role="img"
          aria-label="Close"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
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
