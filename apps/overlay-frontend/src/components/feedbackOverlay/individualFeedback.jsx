import { useState } from "preact/hooks";
import crossIcon from "../../assets/icons/cross_icon.svg";
export default function IndividualFeedback({ feedback }) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <div className="bg-white shadow-md px-4 py-4 rounded-md border-[0.5px] border-lightGray">
      <div className="flex ">
        <div>
          <div className="aspect-square w-12 rounded-full bg-black/60"></div>
        </div>
        <div className="ml-6">
          <div className="flex items-end">
            <p className="font-bold">James Martin</p>
            <p className="ml-2 text-black/70 text-p-xs">24.04.2025</p>
          </div>
          <div className="mt-2">
            <p className="font-bold"> {feedback.title}</p>
            <p>{feedback.description}</p>
          </div>
        </div>
      </div>

      {!openComment && (
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue text-nowrap py-1 px-6 text-white rounded-md cursor-pointer"
            onClick={() => setOpenComment(!openComment)}
          >
            Add Comment
          </button>
        </div>
      )}

      {openComment && (
        <div className="relative mt-4">
          <div className="aspect-square w-4 cursor-pointer absolute top-0 right-0 ">
            <img
              src={crossIcon}
              alt="Close Icon"
              className=" w-full"
              onClick={() => setOpenComment(!openComment)}
            />
          </div>
          <label for="message" class="block mb-1 text-sm font-medium  ">
            Comment
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm rounded-lg border border-black/60 resize-none"
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className="flex justify-end mt-6 space-x-4">
            <button className="text-nowrap py-1 px-6  rounded-md border-[1.75px] border-black">
              Icon
            </button>
            <button className="bg-blue text-nowrap py-1 px-6 text-white rounded-md">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
