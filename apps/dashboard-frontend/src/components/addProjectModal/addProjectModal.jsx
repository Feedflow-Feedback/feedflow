"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export default function addProjectModal({
  isAddProjectModalOpen,
  onClose,
  onRefresh,
}) {
  const backendUrl = "http://localhost:3000";
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);

  const [form, setForm] = useState({ title: "", description: "", url: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createProject(e) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.url) {
      setError("Please enter both title and description.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/projects/create`,
        {
          name: form.title,
          description: form.description,
          url: form.url,
          userId: userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        onRefresh();
        onClose();
      } else if (response.status === 400) {
        setError("Try again later and Error aqcured");
      }
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  }
  return (
    <Dialog
      open={isAddProjectModalOpen}
      onClose={onClose}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/20 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white !px-12 md:min-w-lg  pt-4 md:pt-2 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8  sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <form onSubmit={createProject}>
              <div>
                <div className="mt-1 text-center sm:mt-3">
                  <h3 className="font-semibold text-h-xs">
                    Create new project
                  </h3>
                  <div className="mt-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-p-md font-regular text-left"
                      >
                        Project Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="title"
                          name="title"
                          type="title"
                          placeholder="new Project"
                          value={form.title}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="title"
                        className="block text-p-md font-regular text-left"
                      >
                        Project Url
                      </label>
                      <div className="mt-1">
                        <input
                          id="url"
                          name="url"
                          type="url"
                          placeholder="https://example.com"
                          value={form.url}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="description"
                        className="block text-p-md font-regular text-left"
                      >
                        Project Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 resize-none placeholder:text-p-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md  px-8 py-2 text-sm font-semibold bg-orange w-min text-white shadow-xs cursor-pointer "
                >
                  Create
                </button>
              </div>
              <div className="h-8  ">
                <p
                  className={` text-center text-sm font-medium text-black ${
                    error ? "block" : "hidden"
                  }`}
                >
                  {error}
                </p>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
