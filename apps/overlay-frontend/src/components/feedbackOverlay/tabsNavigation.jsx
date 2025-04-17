export default function TabsNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { label: "All", count: 10 },
    { label: "Resolved", count: 2 },
    { label: "Unresolved", count: 3 },
  ];

  return (
    <div className="border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
