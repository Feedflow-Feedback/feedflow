import FeedbackDetailsModal from "../feedbackDetailsModal/feedbackDetailsModal";
import { useState } from "react";
import { formatDateReadable } from "@feedflow/utils";

export default function FeedbacksTable({ feedbacks, update }) {
  const [open, setOpen] = useState(false);

  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState(null);

  const handleOpen = (i) => {
    setOpen(true);
    setSelectedFeedbackIndex(i);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFeedbackIndex(null);
  };

  const closeAndUpdate = () => {
    setOpen(false);
    setSelectedFeedbackIndex(null);
  };

  const updateData = () => {
    update();
  };

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-black/20 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-bold text-black sm:pl-6 w-full"
                  >
                    Feedback Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap "
                  >
                    Latest Update
                  </th>
                  <th
                    scope="col"
                    className=" py-3.5 text-left text-sm font-bold text-black px-6"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20 bg-white">
                {feedbacks.map((feedback, index) => (
                  <tr
                    key={feedback.id}
                    className="cursor-pointer"
                    onClick={() => handleOpen(index)}
                  >
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-black sm:pl-6 w-full">
                      {feedback.title}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap ">
                      {formatDateReadable(feedback.updated_at)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap min-w-28">
                      {feedback.status}
                    </td>
                  </tr>
                ))}
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-sm ">
                      No feedbacks available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              {open && (
                <FeedbackDetailsModal
                  open={open}
                  close={handleClose}
                  feedback={feedbacks[selectedFeedbackIndex]}
                  closeAndUpdate={() => closeAndUpdate()}
                  update={() => updateData()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
