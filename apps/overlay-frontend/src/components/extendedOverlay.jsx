import add_feedback_icon from "../assets/icons/add_feedback_icon.svg";
import questionIcon from "../assets/icons/question_icon.svg";
import feedbackListIcon from "../assets/icons/feedback_list_icon.svg";
import crossIcon from "../assets/icons/cross_icon.svg";
import penIcon from "../assets/icons/pen_icon.svg";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import squareIcon from "../assets/icons/square_icon.svg";
import photoIcon from "../assets/icons/photo_icon.svg";
import videoIcon from "../assets/icons/camera_icon.svg";

export default function ExtendedOverlay({ setMode }) {
  return (
    <>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-2xl border-[1.5px] border-gray-300 rounded-bl-2xl rounded-tl-2xl ">
        <div className="grid grid-cols-1 gap-4 p-4">
          <div className="aspect-square w-12 cursor-pointer">
            <img src={crossIcon} alt="Add Icon" className=" w-full" />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img
              src={feedbackListIcon}
              alt="Feedback List Icon"
              className=" w-full"
            />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img src={penIcon} alt="Feedback List Icon" className=" w-full" />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img src={arrowIcon} alt="Feedback List Icon" className=" w-full" />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img src={squareIcon} alt="Question Icon" className=" w-full" />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img
              src={feedbackListIcon}
              alt="Question Icon"
              className=" w-full"
            />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img src={photoIcon} alt="Question Icon" className=" w-full" />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img src={videoIcon} alt="Question Icon" className=" w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
