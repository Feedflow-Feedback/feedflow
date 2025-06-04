"use client";

import { useState, useEffect } from "preact/hooks";
import axios from "axios";

export default function ExtendedOverlayModalPhoto({
  open,
  close,
  htmlElement,
  photoElement,
}) {
  const backendUrl = "http://localhost:3000";
  const projectId = window.PROJECT_ID;

  const [form, setForm] = useState({
    feedback_Title: "",
    feedback_Description: "",
    feedback_AuthorEmail: "",
    feedback_Author: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(`${backendUrl}/feedback/create`, {
        title: form.feedback_Title,
        description: form.feedback_Description,
        author: form.feedback_Author,
        authorEmail: form.feedback_AuthorEmail,
        projectId: projectId,
        htmlElement: htmlElement,
        imageData: photoElement,
      });
      setForm({
        feedback_Title: "",
        feedback_Description: "",
        feedback_AuthorEmail: "",
        feedback_Author: "",
      });
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
    close();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      role="dialog"
      aria-modal="true"
      onClick={close} // close modal on backdrop click
    >
      <div
        className="relative w-full max-w-xl rounded-lg bg-white p-10 shadow-xl "
        style={{ zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()} // prevent closing modal on inside click
      >
        <button
          onClick={close}
          aria-label="Close modal"
          className="absolute top-2 right-2 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-6 h-6 cursor-pointer"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#666666"
            role="img"
            aria-label="Close"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="feedback_Author"
              name="feedback_Author"
              type="text"
              required
              placeholder="Your Name"
              onChange={handleChange}
              value={form.feedback_Author}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-black outline-1 -outline-offset-1 outline-black text-p-sm placeholder:text-black/60 focus:outline-2 focus:-outline-offset-2"
            />
            <input
              id="feedback_AuthorEmail"
              name="feedback_AuthorEmail"
              type="email"
              required
              placeholder="Your Email"
              onChange={handleChange}
              value={form.feedback_AuthorEmail}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-black outline-1 -outline-offset-1 outline-black text-p-sm placeholder:text-black/60 focus:outline-2 focus:-outline-offset-2"
            />
            <input
              id="feedback_Title"
              name="feedback_Title"
              type="text"
              required
              placeholder="Feedback Title"
              onChange={handleChange}
              value={form.feedback_Title}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-black outline-1 -outline-offset-1 outline-black text-p-sm placeholder:text-black/60 focus:outline-2 focus:-outline-offset-2"
            />

            <textarea
              id="feedback_Description"
              name="feedback_Description"
              rows="4"
              className="block p-2.5 w-full text-p-sm rounded-lg border border-black/60 placeholder:text-black/60 resize-none"
              placeholder="Write your thoughts here..."
              value={form.feedback_Description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5 flex justify-end gap-4">
            <button
              type="button"
              className="inline-flex py-2 px-6 cursor-pointer justify-center rounded-md bg-white text-p-sm font-semibold text-black shadow-xs border border-black"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex py-2 px-6 cursor-pointer justify-center rounded-md bg-teal text-p-sm font-semibold text-white shadow-xs"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
