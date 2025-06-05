import { useEffect, useState } from "react";

export default function TabsNavigation({
  activeTab,
  setActiveTab,
  openAmount,
  resolvedAmount,
}) {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setTabs([
      { label: "Unresolved", count: openAmount },
      { label: "Resolved", count: resolvedAmount },
      { label: "All", count: openAmount + resolvedAmount },
    ]);
  }, [openAmount, resolvedAmount]);

  return (
    <div className="border-b-[1.75px] border-black/60 px-2">
      <div className="flex md:space-x-6 space-x-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`pb-2 border-b-[3px] text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "border-black/60 text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              <span className="px-2">
                {tab.label} ({tab.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
