import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="size-full flex flex-col w-full">
      {/* Tab Navigation */}
      <div className="w-full flex space-x-4 bg-gray-100 px-6 py-3 rounded-lg shadow-sm h-16 justify-between dark:bg-gray-900 dark:text-gray-200 ">
        <div>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-6 py-2 rounded-lg transition-all duration-300 dark:text-gray-200 ${
                activeTab === tab.key
                  ? "bg-white text-gray-800 shadow-md  dark:bg-blue-600 "
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <DarkModeToggle className={"justify-self-end"} />
      </div>
      {/* Active Tab Content */}
      <div className="flex-1 dark:bg-gray-900">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
