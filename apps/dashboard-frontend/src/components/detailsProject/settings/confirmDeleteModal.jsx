"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function confirmDeleteModal({
  openModalDelete,
  closeModal,
  handleDeleteProject,
}) {
  return (
    <Dialog
      open={openModalDelete}
      onClose={closeModal}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/15 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Are you sure you want to delete this project?
                </DialogTitle>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleDeleteProject}
                className="inline-flex  justify-center rounded-md bg-[#dc2626] px-6 py-2 text-sm font-semibold text-white shadow-xs cursor-pointer "
              >
                Delet Project
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
