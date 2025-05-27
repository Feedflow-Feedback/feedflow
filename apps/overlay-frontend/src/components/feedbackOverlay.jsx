import { useState } from "preact/hooks";
import crossIcon from "../assets/icons/cross_icon.svg";
import TabsNavigation from "./feedbackOverlay/tabsNavigation.jsx";
import SortOptions from "./feedbackOverlay/sortOptions.jsx";
import IndividualFeedback from "./feedbackOverlay/individualFeedback.jsx";

export default function FeedbackOverlay({ returnToRegularMode }) {
  const [activeTab, setActiveTab] = useState("Unresolved");

  return (
    <div
      id="feedbackOverlay"
      className="absolute top-0 right-0 h-[calc(100vh-60px)] mt-[30px] w-xl bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl"
    >
      <div className="relative">
        <div className="pt-6  px-8">
          <p className="text-h-xs font-bold font-inter">Feedbacks</p>
          <div className="mt-8">
            <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        <img
          src={crossIcon}
          alt="Close"
          className="w-8 cursor-pointer absolute top-4 right-4"
          onClick={returnToRegularMode}
        />
      </div>

      <div className="pt-6  px-8">
        <SortOptions />
      </div>

      <div className="pt-6 px-8">
        <IndividualFeedback />
      </div>
      {/* <div className="mt-4 text-sm text-gray-700">
        {activeTab === "All" && <p>Showing all items.</p>}
        {activeTab === "Resolved" && <p>Showing resolved items.</p>}
        {activeTab === "Unresolved" && <p>Showing unresolved items.</p>}
      </div> */}
    </div>
  );
}
