export default function Overlay({ setMode }) {
  return (
    <>
      <div
        className="fixed top-1/2 right-0 bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl z-50"
        style={{ transform: "translate(0, -50%)" }}
      >
        <div
          className="grid grid-cols-1 gap-4 p-4"
          id="basicOverlay"
          data-cy="basicOverlay"
        >
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("addFeedback")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className=""
              strokeWidth="1.5"
              stroke="#666666"
              role="img"
              aria-label="Add Icon"
              data-cy="Add Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                scale="2"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("showFeedback")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#666666"
              role="img"
              aria-label="Feedback List Icon"
              data-cy="Feedback List Icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </div>
          <div
            className="aspect-square w-12 cursor-pointer"
            onClick={() => setMode("showTutorial")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#666666"
              role="img"
              aria-label="Question Icon"
              data-cy="Question Icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
