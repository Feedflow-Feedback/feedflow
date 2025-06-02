import crossIcon from "../assets/icons/cross_icon.svg";
import addFeedbackIcon from "../assets/icons/add_feedback_icon_white.svg";

export default function TutorialOverlayStep({ text, title, step }) {
  return (
    <>
      <div className="flex text-p-lg text-black">
        <p>{step}. </p>
        <p className="ml-1">{title}</p>
      </div>
      <p className="text-black">{text}</p>
    </>
  );
}
