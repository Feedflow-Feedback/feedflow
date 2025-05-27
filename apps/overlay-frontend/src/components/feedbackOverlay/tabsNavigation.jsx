export default function TabsNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { label: "Unresolved", count: 3 },
    { label: "Resolved", count: 2 },
    { label: "All", count: 10 },
  ];

  return (
    <div className="border-b-[1.75px] border-black/60 px-2">
      <div className="flex space-x-6">
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
