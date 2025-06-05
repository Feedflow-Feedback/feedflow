"use client";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";

export default function ExtendedOverlayModal({ open, close, htmlElement }) {
  const backendUrl = "http://localhost:3000";
  const projectId = window.PROJECT_ID;

  const [form, setForm] = useState({
    feedback_Title: "",
    feedback_Description: "",
    feedback_AuthorEmail: "",
    feedback_Author: "",
    feedback_File: "",
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const fileData = Array.from(uint8Array);

    setForm({ ...form, feedback_File: fileData });
  };

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
        imageData: form.feedback_File,
      });

      setForm({
        feedback_Title: "",
        feedback_Description: "",
        feedback_AuthorEmail: "",
        feedback_Author: "",
        feedback_File: "",
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
      onClick={close} // close if backdrop clicked
    >
      <div
        className="relative w-full max-w-xl rounded-lg bg-white p-10 shadow-xl "
        style={{ zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()} // prevent closing modal on inside click
      >
        <button
          onClick={close}
          aria-label="Close modal"
          data-cy="Close modal"
          className="absolute top-3 right-3 p-1"
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
            data-cy="Close"
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
              data-cy="feedback_Author"
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
              data-cy="feedback_AuthorEmail"
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
              data-cy="feedback_Title"
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
              data-cy="feedback_Description"
              rows="4"
              className="block p-2.5 w-full text-p-sm rounded-lg border border-black/60 resize-none placeholder:text-black/60"
              placeholder="Write your thoughts here..."
              value={form.feedback_Description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mt-5 sm:mt-6 flex justify-between">
            <div className="flex items-center">
              <input
                id="file-upload"
                data-cy="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#666666"
                  className="w-6 h-6 inline-block mr-2"
                  role="img"
                  aria-label="Upload"
                  data-cy="Upload"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload Image
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="inline-flex py-2 px-6 cursor-pointer justify-center rounded-md bg-white text-p-sm font-semibold text-black shadow-xs border-[1px] border-black"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="submit"
                data-cy="submit"
                className="inline-flex py-2 px-6 cursor-pointer justify-center rounded-md bg-teal text-p-sm font-semibold text-white shadow-xs"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
