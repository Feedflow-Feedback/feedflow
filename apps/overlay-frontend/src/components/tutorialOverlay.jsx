import crossIcon from "../assets/icons/cross_icon.svg";
import addFeedbackIcon from "../assets/icons/add_feedback_icon_white.svg";
import TutorialOverlayStep from "./tutorialOverlayStep";

const content = [
  {
    title: "Click the screenshot or Textfeedback button",
    text: "In the Feedbucket toolbar to your right click the icon.",
  },
  {
    title: "Place the marker",
    text: "Place the marker over the area that you want to leave feedback about. Click the to enable marker mode and then click on the screen where you want to place the marker. The marker can be moved by dragging it to the place you want to.",
  },
  {
    title: "Write your feedback",
    text: "Together with the screenshot you should write in text form what the feedback is about.",
  },
  {
    title: "Enter your name & Email",
    text: " Before you submit the feedback we need to know who is reporting. This is something that you only have to do once. We will ask for your email as well and that is the be able to send you notifications when actions are taken on your feedback. ",
  },
  {
    title: "Submit the screenshot feedback",
    text: "  Click on the submit button and your screenshot feedback will get posted. All done! ",
  },
];

export default function TutorialOverlay({ returnToRegularMode }) {
  return (
    <>
      <div
        id="tutorialOverlay"
        className="fixed top-0 right-0 overflow-y-scroll h-[calc(100vh-60px)] mt-[30px] w-xl bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl"
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

          <p>View all submitted feedback</p>
          <div>
            1 <p>Click the screenshot or Textfeedback button</p>
            <p>In the Feedbucket toolbar to your right click the icon</p>
          </div>
        </div>
      </div>
    </>
  );
}
