import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="size-full flex flex-col w-full">
      {/* Tab Navigation */}
      <div className="flex space-x-4 bg-gray-100 p-2 rounded-lg w-full shadow-sm h-16">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-white text-gray-800 shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="flex-1">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
