import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuthStore } from "@/stores/authStore";
import FeedbackStatusDropdown from "../feedbackStatusDropdown/feedbackStatusDropdown";
import axios from "axios";
import { blobToImageUrl } from "@feedflow/utils";
export default function feedbackDetailsModal({
  open,
  close,
  feedback,
  closeAndUpdate,
  update,
}) {
  //console.log("Feedback Details Modal", feedback.imageData);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = useAuthStore((state) => state.token);
  const handleChangeStatus = async (newStatus, feedbackId) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/feedback/updateFeedback`,
        {
          status: newStatus,
          feedbackId: feedbackId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        //console.log("Feedback status updated successfully");
        update();
      }

      //console.log("Project updated successfully");
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  };
  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative min-w-xl transform overflow-hidden rounded-lg bg-white text-black text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="flex items-start justify-between">
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
              <FeedbackStatusDropdown
                status={feedback.status}
                setStatus={(newStatus) =>
                  handleChangeStatus(newStatus, feedback.id)
                }
              />
            </div>
            {/* <div className="mt-5 sm:mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeAndUpdate}
                className="inline-flex px-6 justify-center rounded-md bg-orange  py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
