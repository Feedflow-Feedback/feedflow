import { useState } from "preact/hooks";

import { formatDateReadable, blobToImageUrl } from "@feedflow/utils";
import axios from "axios";

export default function IndividualFeedback({ feedback, update }) {
  const backendUrl = "http://localhost:3000";

  const [openComment, setOpenComment] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  const [showComments, setShowComments] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createComment(e) {
    e.preventDefault();

    if (!form.name || !form.comment) {
      console.error("Please enter both name and comment.");

      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/comment/create`, {
        author: form.name,
        authorEmail: form.name,
        comment: form.comment,
        feedbackId: feedback.id,
      });

      if (response.status === 200) {
        setForm({ name: "", email: "", comment: "" });
        setOpenComment(false);

        update();
      } else if (response.status === 400) {
        //setError("Try again later and Error aqcured");
      }
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  }
  return (
    <div className="bg-white shadow-md px-4 py-4 rounded-md border-[0.5px] border-lightGray">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <p className="font-bold"> {feedback.title}</p>
          <p>{feedback.description}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          {feedback.imageData !== null && (
            <img
              src={blobToImageUrl(feedback.imageData)}
              alt="Feedback"
              className="mt-4 max-w-64 max-h-36 h-auto rounded-md"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex items-end space-x-4">
          <div className="text-p-xs">
            <p>{feedback.author}</p>
            <p>{feedback.authorEmail}</p>
          </div>
          <div className="text-p-xs">
            {formatDateReadable(feedback.updated_at)}
          </div>
        </div>

        <div>
          {!openComment && (
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue text-nowrap py-1 px-6 text-white rounded-md cursor-pointer"
                data-cy="Add Comment Button"
                onClick={() => setOpenComment(!openComment)}
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      </div>

      {openComment && (
        <form
          onSubmit={(e) => {
            createComment(e);
          }}
          className="relative mt-4 w-full"
        >
          <div className="aspect-square w-4 cursor-pointer absolute top-0 right-0 ">
            <svg
              onClick={() => setOpenComment(!openComment)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="w-full"
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
          <label
            htmlFor="name"
            className="block text-p-sm font-regular text-left"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              data-cy="name"
              name="name"
              type="name"
              placeholder="your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
            />
          </div>
          <label
            htmlFor="email"
            className="block text-p-sm font-regular text-left mt-2"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              data-cy="email"
              name="email"
              type="email"
              placeholder="your email"
              value={form.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
            />
          </div>
          <label
            htmlFor="comment"
            className="block mb-1 text-p-sm font-medium  mt-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            data-cy="comment"
            rows="4"
            className="block p-2.5 w-full text-sm rounded-lg border border-black/60 resize-none"
            value={form.comment}
            onChange={handleChange}
            required
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              className="bg-blue text-nowrap py-1 px-6 text-white rounded-md"
              data-cy="Save"
            >
              Save
            </button>
          </div>
        </form>
      )}
      <p
        className="mt-2 text-p-sm underline cursor-pointer"
        data-cy="Show Comments"
        onClick={() => setShowComments(!showComments)}
      >
        Show Comments
      </p>
      {showComments && (
        <div className="mt-6 max-h-108 overflow-y-scroll">
          {feedback.comments.map((comment) => (
            <div
              key={comment.id}
              className="mt-2 p-4 bg-white shadow-lg rounded-md border-[0.5px] border-lightGray"
            >
              <div className="flex items-center gap-1">
                <p className="text-p-xs font-semibold">{comment.author}</p>
                <p className="mb-1">-</p>
                <p className="text-p-xs text-gray-700">
                  {formatDateReadable(comment.submitted_at)}
                </p>
              </div>

              <p className="mt-1">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
