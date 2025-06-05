import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { blobToImageUrl, formatDateReadable } from "@feedflow/utils";
import FeedbackStatusDropdown from "../feedbackStatusDropdown/feedbackStatusDropdown";

import axios from "axios";

import { useUserStore } from "@/stores/userStore";
export default function feedbackDetailsModal({
  open,
  close,
  feedback,
  closeAndUpdate,
  update,
}) {
  const backendUrl = "http://localhost:3000";
  const token = useAuthStore((state) => state.token);
  const userEmail = useUserStore((state) => state.email);
  const [openComment, setOpenComment] = useState(false);
  const [form, setForm] = useState({ name: "", comment: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleChangeStatus = async (newStatus, feedbackId) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/feedback/updateFeedback`,
        {
          status: newStatus,
          feedbackId: feedbackId,
        }
      );
      if (response.status === 200) {
        update();
      }
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  };

  async function createComment(e) {
    e.preventDefault();

    if (!form.name || !form.comment) {
      console.error("Please enter both name and comment.");
      //setError("Please enter both title and description.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/comment/create`,
        {
          author: form.name,
          authorEmail: userEmail,
          comment: form.comment,
          feedbackId: feedback.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setForm({ name: "", comment: "" });
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
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/10 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative md:min-w-3xl p-4 min-h-96 transform overflow-hidden rounded-lg bg-white text-black text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="absolute top-2 right-2">
                <svg
                  onClick={() => close()}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6 cursor-pointer"
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
              <div className="">
                <DialogTitle as="h3" className=" font-semibold  text-h-xs">
                  {feedback.title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {feedback.description}
                  </p>
                </div>
                <div>
                  {feedback.imageData !== null && (
                    <img
                      src={blobToImageUrl(feedback.imageData)}
                      alt="Feedback"
                      className="mt-4 max-w-72 h-auto rounded-md"
                    />
                  )}
                </div>
              </div>
              <div className="mt-8">
                <FeedbackStatusDropdown
                  status={feedback.status}
                  setStatus={(newStatus) =>
                    handleChangeStatus(newStatus, feedback.id)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-end mt-4">
              <div className="flex  md:items-end space-x-4">
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
                      onClick={() => setOpenComment(!openComment)}
                      id="addCommentButton"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
            {openComment && (
              <form onSubmit={createComment} className="relative mt-4 w-full">
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
                  className="block text-p-md font-regular text-left"
                >
                  Name
                </label>
                <div className="mt-1">
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
                  htmlFor="comment"
                  className="block mb-1 text-sm font-medium mt-2"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  className="block p-2.5 w-full text-sm rounded-lg border border-black/60 resize-none"
                  defaultValue={form.comment}
                  onChange={handleChange}
                  required
                  placeholder="Write your thoughts here..."
                ></textarea>
                <div className="flex justify-end mt-6 space-x-4">
                  {/* <button className="text-nowrap py-1 px-6  rounded-md border-[1.75px] border-black">
                    Cancel
                  </button> */}
                  <button
                    className="bg-blue text-nowrap py-1 px-6 text-white rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
            <div className="mt-6 max-h-72 overflow-y-scroll">
              <p>Comments</p>
              {feedback.comments.length === 0 && (
                <p className="text-p-sm">No comments yet.</p>
              )}
              {feedback.comments.map((comment, index) => (
                <div
                  key={index}
                  className="mt-2 p-4 bg-white shadow-lg rounded-md border-[0.5px] border-lightGray "
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
