import React, { useState } from "react";

import Navbar from "@/components/navbar/navbar";
import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
import FeedbacksTable from "@/components/feedbacksOverview/feedbacksTable/feedbacksTable";
import SearchBar from "@/components/feedbacksOverview/searchBar/searchBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Project() {
  const { id } = useParams();
  useEffect(() => {
    console.log("Project ID:", id);
  }, [id]);

  const [activeTab, setActiveTab] = useState("Feedbacks");
  return (
    <>
      <div>
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
            <h2 className="text-h-md">Project xyz</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et
            </p>
            <div className="mt-8">
              <TabsNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            {activeTab === "Feedbacks" && (
              <div>
                <SearchBar />
                <div className="mt-4">
                  <FeedbacksTable />
                </div>
              </div>
            )}
            {/* {activeTab === "Integrations" && <p>Showing resolved items.</p>} */}
            {activeTab === "Settings" && <p>Showing settings</p>}
          </div>
        </div>
      </div>
    </>
  );
}
