import React, { useState } from "react";
import Breadcrums from "@/components/breadcrums/breadcrums";
import Navbar from "@/components/navbar/navbar";
import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
import FeedbacksTable from "@/components/feedbacksOverview/feedbacksTable/feedbacksTable";
import SearchBar from "@/components/feedbacksOverview/searchBar/searchBar";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  return (
    <>
      <div>
        <Navbar />

        <div className="container mx-auto md:py-12 py-6 px-8 lg:px-4">
          <Breadcrums />
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
            {activeTab === "Integrations" && <p>Showing resolved items.</p>}
            {activeTab === "Settings" && <p>Showing unresolved items.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
