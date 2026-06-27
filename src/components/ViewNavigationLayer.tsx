import { useState } from "react";

const tabs = ["Summary", "Waterfall", "Comparison", "Trend", "Details"];

export default function ViewNavigationLayer() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex items-center gap-8 border-b border-[#1f1f1f] px-6">
      {tabs.map((tab, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActiveTab(i)}
          className={`relative py-3 text-sm font-medium transition-colors ${
            activeTab === i
              ? "text-[#E2E1DF]"
              : "text-[#6D6561] hover:text-[#8E8781]"
          }`}
        >
          {tab}
          {activeTab === i && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </button>
      ))}
    </div>
  );
}
