import React, { useState } from "react";
import Breadcrums from "@/components/breadcrums/breadcrums";
import Navbar from "@/components/navbar/navbar";
import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
import FeedbacksTable from "@/components/feedbacksOverview/feedbacksTable/feedbacksTable";
import SearchBar from "@/components/feedbacksOverview/searchBar/searchBar";

export default function Dashboard() {
  return (
    <>
      <div className="">
        <Navbar />

        <div className="container mx-auto md:py-12 py-6 px-8 lg:px-4">
          <h2 className="text-h-md">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-8 gap-6">
            <div className="bg-black/20 rounded-lg p-4 aspect-square">
              <p>Project xyz</p>
            </div>
            <div className="bg-black/20 rounded-lg p-4 aspect-square">
              <p>Project xyz</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 w-18 h-18 rounded-full bg-black/20 z-10">
          <p>asdsd</p>
        </div>
      </div>
    </>
  );
}
