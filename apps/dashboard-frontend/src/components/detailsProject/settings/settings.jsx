import { useState, useEffect } from "react";
import ConfirmDeleteModal from "./confirmDeleteModal";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export default function Settings({ id, name, description, url }) {
  const backendUrl = "http://localhost:3000";
  const token = useAuthStore((state) => state.token);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [form, setForm] = useState({
    name: name,
    description: description,
    url: url,
  });

  const closeModal = () => {
    setOpenModalDelete(false);
  };
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`${backendUrl}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
    closeModal();
  };

  const handleUpdateProject = async () => {
    try {
      await axios.patch(
        `${backendUrl}/projects/${id}`,
        {
          name: form.name,
          description: form.description,
          url: form.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  };

  return (
    <>
      <div>
        <div className="mt-6">
          <p className="text-p-lg font-bold">General Settins</p>
          <form onSubmit={handleUpdateProject}>
            <div className="mt-2">
              <label
                htmlFor="title"
                className="block text-p-md font-regular text-left"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  defaultValue={name}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-p-md font-regular text-left"
              >
                Project url
              </label>
              <div className="mt-1">
                <input
                  id="url"
                  name="url"
                  type="url"
                  defaultValue={url}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-p-sm "
                />
              </div>
            </div>
            <div className="mt-4 mb-4">
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
                  rows={4}
                  defaultValue={description}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 resize-none placeholder:text-p-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md  px-4 py-2 text-sm font-semibold bg-orange w-min text-white shadow-xs cursor-pointer text-nowrap"
            >
              Update
            </button>
          </form>
        </div>
        <div className="mt-6 relative">
          <p className="text-p-lg font-bold">Notifications - Coming Soon</p>
          <div className="mt-2 select-none pointer-events-none opacity-50">
            <label
              htmlFor="description"
              className="block text-p-md font-regular text-left"
            >
              Email Notifications
            </label>
            <div className="mt-1">
              <input
                id="title"
                name="title"
                type="title"
                placeholder="new Project"
                className="block w-full rounded-md bg-white px-3 py-1.5 "
                disabled
              />
            </div>
          </div>
          {/* Overlay haze */}
          <div className="absolute inset-0 bg-gray-200 opacity-60 pointer-events-none rounded-md"></div>
        </div>
        <div className="mt-6">
          <ConfirmDeleteModal
            openModalDelete={openModalDelete}
            closeModal={closeModal}
            handleDeleteProject={handleDeleteProject}
          />
          <p className="text-p-lg font-bold">Delete Project</p>
          <button
            className="bg-[#dc2626] rounded-md text-white px-4 py-2 mt-4 cursor-pointer"
            onClick={() => setOpenModalDelete(true)}
          >
            Delete Project
          </button>
        </div>
      </div>
    </>
  );
}
