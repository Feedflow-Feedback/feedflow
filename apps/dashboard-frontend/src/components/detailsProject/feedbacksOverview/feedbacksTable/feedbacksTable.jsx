import FeedbackDetailsModal from "../feedbackDetailsModal/feedbackDetailsModal";

export default function FeedbacksTable({ feedbacks }) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-black/20">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-bold text-gray-900 sm:pl-6 w-full"
                  >
                    Feedback Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-bold text-gray-900 whitespace-nowrap "
                  >
                    Latest Update
                  </th>
                  <th
                    scope="col"
                    className=" py-3.5 text-left text-sm font-bold text-gray-900 px-6"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20 bg-white">
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id} className="cursor-pointer">
                    <FeedbackDetailsModal open={true} />
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 w-full">
                      {feedback.title}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      wip
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {feedback.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
