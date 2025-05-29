"use client";
import uploadIcon from "../assets/icons/upload_icon.svg";
import { useState } from "preact/hooks";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";

export default function extendedOverlayModal({ open, close, htmlElement }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const projectId = window.PROJECT_ID;
  const [form, setForm] = useState({
    feedback_Title: "",
    feedback_Description: "",
    feedback_AuthorEmail: "",
    feedback_Author: "",
    feedback_File: "",
  });

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
    //console.log(htmlElement);

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
  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/20 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <DialogPanel
            transition
            className="relative transform overflow-hidden min-w-lg rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  id="feedback_Author"
                  name="feedback_Author"
                  type="text"
                  required
                  placeholder="Your Name"
                  onChange={handleChange}
                  value={form.Author}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <input
                  id="feedback_AuthorEmail"
                  name="feedback_AuthorEmail"
                  type="text"
                  required
                  placeholder="Your Email"
                  onChange={handleChange}
                  value={form.feedback_AuthorEmail}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <input
                  id="feedback_Title"
                  name="feedback_Title"
                  type="text"
                  required
                  placeholder="Feedback Title"
                  onChange={handleChange}
                  value={form.feedback_Title}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

                <textarea
                  id="feedback_Description"
                  name="feedback_Description"
                  rows="4"
                  className="block p-2.5 w-full text-sm rounded-lg border border-black/60 resize-none"
                  placeholder="Write your thoughts here..."
                  value={form.feedback_Description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-between ">
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img
                    src={uploadIcon}
                    alt="Feedback Icon"
                    className="w-6 h-6 inline-block mr-2"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="inline-flex py-2 px-6  justify-center rounded-md bg-white  text-sm font-semibold text-black shadow-xs border-[1px] border-black"
                    onClose={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex py-2 px-6  justify-center rounded-md bg-teal  text-sm font-semibold text-white shadow-xs "
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
