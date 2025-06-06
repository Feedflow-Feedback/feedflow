import axios from "axios";

export const fetchFeedbacksByProject = async (projectId, backendUrl) => {
  const response = await axios.post(`${backendUrl}/feedback/getAllByProject`, {
    projectId,
  });
  return response.data;
};
