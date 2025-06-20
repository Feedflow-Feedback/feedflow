import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
import FeedbacksTable from "@/components/detailsProject/feedbacksOverview/feedbacksTable/feedbacksTable";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import Installation from "../../components/detailsProject/installation/installation";
import Settings from "../../components/detailsProject/settings/settings";

export default function Project() {
  const backendUrl = "https://backend-feedflow.bbmit-service.ch";
  const token = useAuthStore((state) => state.token);

  const tabs = [
    { label: "Feedbacks" },
    { label: "Installation" },
    { label: "Settings" },
  ];

  const { id } = useParams();

  const [project, setProject] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const getFeedbacks = async () => {
    const response = await axios.post(
      `${backendUrl}/feedback/getAllByProject`,
      {
        projectId: id,
      }
    );

    setFeedbacks(response.data);
  };

  const getProjects = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/projects/getProjectDetails`,

        {
          projectId: id,
        },

        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProject(response.data);
    } catch (err) {
      console.error("Create Project failed, error:", err);
    }
  };

  useEffect(() => {
    getProjects();
    getFeedbacks();
  }, [id]);

  const [activeTab, setActiveTab] = useState("Feedbacks");
  return (
    <>
      <div className="bg-black/5 min-h-screen">
        <Navbar />
        <a
          className="container mx-auto pt-8 px-8 lg:px-4 flex items-center"
          href="/dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <p className="ml-2 text-p-md">Return to Dashboard</p>
        </a>
        <div className="container mx-auto  md:pb-12 pb-6 px-8 lg:px-4">
          <div className="mt-8">
            <h2 className="text-h-md">{project.name}</h2>
            <p>{project.description}</p>
            <div className="mt-8">
              <TabsNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
              />
            </div>
          </div>
          <div className="mt-4 text-sm ">
            {activeTab === "Feedbacks" && (
              <div>
                {/* <SearchBar /> */}
                <div className="mt-4">
                  <FeedbacksTable
                    feedbacks={feedbacks}
                    update={() => getFeedbacks()}
                  />
                </div>
              </div>
            )}
            {/* {activeTab === "Integrations" && <p>Showing resolved items.</p>} */}
            {activeTab === "Installation" && (
              <div>
                <Installation />
              </div>
            )}
            {activeTab === "Settings" && (
              <div>
                <Settings
                  id={id}
                  name={project.name}
                  description={project.description}
                  url={project.url}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
