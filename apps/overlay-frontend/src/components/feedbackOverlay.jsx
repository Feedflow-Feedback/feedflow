import crossIcon from "../assets/icons/cross_icon.svg";

export default function FeedbackOverlay({ returnToRegularMode }) {
  return (
    <>
      <div className="absolute right-0 h-screen w-96 bg-white shadow-2xl border-[1.5px] border-gray-300 rounded-bl-2xl rounded-tl-2xl ">
        <div className="relative">
          <div>
            <p className="">Feedback List</p>
          </div>

          <img
            src={crossIcon}
            alt="Close"
            className="w-8 cursor-pointer absolute top-2 right-2"
            onClick={returnToRegularMode}
          />
        </div>
      </div>
    </>
  );
}
