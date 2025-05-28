import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import AddProjectModal from "@/components/addProjectModal/addProjectModal";
import ProjectPreview from "@/components/projectPreview/projectPreview";
import axios from "axios";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);

  const refreshData = () => {
    getProjects();
  };

  const getProjects = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/users/getProjectIds`,

        {
          userId: userId,
        },

        { headers: { Authorization: `Bearer ${token}` } }
      );
      const projectIds = response.data;

      try {
        const response = await axios.post(
          `${backendUrl}/projects/getMyProjects`,
          {
            userId: userId,
          },

          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data !== null && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (err) {
        console.error("Get Project Ids failed, error:", err);
      }

      if (response.status === 200) {
      } else if (response.status === 400) {
      }
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black/5">
        <Navbar />
        <div>
          <AddProjectModal
            isAddProjectModalOpen={isAddProjectModalOpen}
            onClose={() => setIsAddProjectModalOpen(false)}
            onRefresh={() => refreshData()}
          />
        </div>

        <div className="container mx-auto md:py-12 py-6 px-8 lg:px-4">
          <h2 className="text-h-md">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectPreview project={project} key={project.id} />
              </div>
            ))}
          </div>
          {projects.length === 0 && (
            <div>
              <p className="text-center text-gray-500">
                No projects found. Click the button below to create a new
                project.
              </p>
            </div>
          )}
        </div>
        <div
          className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-orange z-10 hover:scale-105 transition-all duration-100"
          onClick={() => setIsAddProjectModalOpen(true)}
        >
          <div className="flex items-center justify-center h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-9 text-white "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
