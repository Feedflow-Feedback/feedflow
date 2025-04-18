import crossIcon from "../assets/icons/cross_icon.svg";

export default function TutorialOverlay({ returnToRegularMode }) {
  return (
    <>
      <div className="absolute right-0 h-screen w-96 bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl ">
        <p>Tutomode</p>
        <p onClick={returnToRegularMode}>Close</p>
        <img
          src={crossIcon}
          alt="Close"
          className="w-8 cursor-pointer absolute top-4 right-4"
          onClick={returnToRegularMode}
        />
      </div>
    </>
  );
}
