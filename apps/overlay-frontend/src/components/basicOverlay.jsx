import add_feedback_icon from "../assets/icons/add_feedback_icon.svg";
import questionIcon from "../assets/icons/question_icon.svg";
import feedbackListIcon from "../assets/icons/feedback_list_icon.svg";

export default function Overlay({ setMode }) {
  return (
    <>
      <div
        className="fixed top-1/2 right-0 bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl z-50"
        style={{ transform: "translate(0, -50%)" }}
      >
        <div className="grid grid-cols-1 gap-4 p-4" id="basicOverlay">
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("addFeedback")}
          >
            <img src={add_feedback_icon} alt="Add Icon" className=" w-full" />
          </div>
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("showFeedback")}
          >
            <img
              src={feedbackListIcon}
              alt="Feedback List Icon"
              className=" w-full"
            />
          </div>
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("showTutorial")}
          >
            <img src={questionIcon} alt="Question Icon" className=" w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
