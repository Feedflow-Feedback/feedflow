import crossIcon from "../assets/icons/cross_icon.svg";
import addFeedbackIcon from "../assets/icons/add_feedback_icon_white.svg";
import TutorialOverlayStep from "./tutorialOverlayStep";

const content = [
  {
    title: "Click the screenshot or Textfeedback button",
    text: "In the Feedflow toolbar to your right click the icon.",
  },
  {
    title: "Place the marker",
    text: "Place the marker over the area that you want to leave feedback about. Click the to enable marker mode and then click on the screen where you want to place the marker.",
  },
  {
    title: "Write your feedback",
    text: "Together with the element you clicked, write in text form what the feedback is about.",
  },
  {
    title: "Enter your name & Email",
    text: " Before you submit the feedback we need to know who is reporting. ",
  },
  {
    title: "Submit the feedback",
    text: "Click on the submit button and your feedback will get posted. All done! ",
  },
];

export default function TutorialOverlay({ returnToRegularMode }) {
  return (
    <>
      <div
        id="tutorialOverlay"
        className="fixed top-1/2 right-0 overflow-y-scroll h-[calc(100vh-60px)]  w-xl bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl z-50"
        style={{ transform: "translate(0, -50%)" }}
      >
        <img
          src={crossIcon}
          alt="Close"
          className="w-8 cursor-pointer absolute top-4 right-4"
          onClick={returnToRegularMode}
        />
        <div className="mt-12 px-8 ">
          <div className="px-4 py-2 bg-teal rounded-md w-fit flex items-center">
            <img src={addFeedbackIcon} alt="Close" className="w-8" />
            <p className="ml-2 text-p-lg font-bold text-white">
              Adding Feedback
            </p>
          </div>

          <div>
            {content.map((step, index) => (
              <div key={index} className="mt-4">
                <TutorialOverlayStep
                  title={step.title}
                  text={step.text}
                  step={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
