export default function ExtendedOverlay({
  returnToRegularMode,
  setMode,
  mode,
}) {
  return (
    <>
      <div
        className="fixed top-1/2 right-0  bg-white shadow-2xl border-[0.5px] border-lightGray rounded-bl-2xl rounded-tl-2xl no-click z-50"
        style={{ transform: "translate(0, -50%)" }}
      >
        <div
          className="grid grid-cols-1 gap-4 p-4"
          id="extendedOverlay"
          data-cy="extendedOverlay"
        >
          <div className="aspect-square w-12 cursor-pointer ">
            <svg
              onClick={returnToRegularMode}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="close"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#666666"
              role="img"
              aria-label="Close Icon"
              data-cy="Close Icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="aspect-square w-12 cursor-pointer">
            <svg
              onClick={() => setMode("textFeedback")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={mode === "textFeedback" ? "#FF913A" : "#666666"}
              role="img"
              aria-label="Feedback Text Icon"
              data-cy="Feedback Text Icon"
              className="no-click"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <div className="aspect-square w-12 cursor-pointer">
            <svg
              onClick={() => setMode("photoFeedback")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="no-click"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={mode === "photoFeedback" ? "#FF913A" : "#666666"}
              role="img"
              aria-label="Photo Icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
