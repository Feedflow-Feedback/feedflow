export default function TutorialOverlay({ returnToRegularMode }) {
  return (
    <>
      <div className="absolute  right-0 h-screen w-96 bg-white shadow-2xl border-[1.5px] border-gray-300 rounded-bl-2xl rounded-tl-2xl ">
        <p>Tutomode</p>
        <p onClick={returnToRegularMode}>Close</p>
      </div>
    </>
  );
}
