export default function TabsNavigation({ activeTab, setActiveTab, tabs }) {
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
                  : "border-transparent  hover:text-black"
              }`}
            >
              <span className="px-2">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
