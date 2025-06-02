import commentIcon from "../assets/icons/comment_icon.svg";
import crossIcon from "../assets/icons/cross_icon.svg";
import photoIcon from "../assets/icons/photo_icon.svg";
import videoIcon from "../assets/icons/camera_icon.svg";

export default function ExtendedOverlay({
  returnToRegularMode,
  setMode,
  mode,
}) {
  return (
    <>
      <div
        className="fixed top-1/2 right-0  bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl no-click"
        style={{ transform: "translate(0, -50%)" }}
      >
        <div className="grid grid-cols-1 gap-4 p-4" id="extendedOverlay">
          <div className="aspect-square w-12 cursor-pointer">
            <img
              src={crossIcon}
              alt="Close Icon"
              className=" w-full close"
              onClick={returnToRegularMode}
            />
          </div>

          <div className="aspect-square w-12 cursor-pointer">
            <img
              src={commentIcon}
              alt="Feedback Text Icon"
              style={
                mode === "textFeedback"
                  ? {
                      filter:
                        "invert(82%) sepia(32%) saturate(6019%) hue-rotate(330deg) brightness(100%) contrast(104%)",
                    }
                  : {}
              }
              className=" w-full no-click"
              onClick={() => setMode("textFeedback")}
            />
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <img
              src={photoIcon}
              alt="Photo Icon"
              style={
                mode === "photoFeedback"
                  ? {
                      filter:
                        "invert(82%) sepia(32%) saturate(6019%) hue-rotate(330deg) brightness(100%) contrast(104%)",
                    }
                  : {}
              }
              onClick={() => setMode("photoFeedback")}
              className=" w-full no-click"
            />
          </div>
          {/* <div className="aspect-square w-12 cursor-pointer">
            <img
              src={videoIcon}
              alt="Question Icon"
              className=" w-full no-click"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
