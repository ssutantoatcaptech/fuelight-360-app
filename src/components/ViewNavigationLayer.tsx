const tabs = ["Summary", "Waterfall", "Comparison", "Trend", "Curves", "Details"];

interface ViewNavigationLayerProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function ViewNavigationLayer({ activeTab, onTabChange }: ViewNavigationLayerProps) {
  return (
    <div className="flex gap-[8px] h-[44px] items-center px-[24px] w-full shrink-0">
      {/* Left nav arrow */}
      <button className="flex items-center justify-center size-[36px] rounded-[8px] opacity-70">
        <svg className="size-[13.5px] text-text-caption" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 3l-5 5 5 5" />
        </svg>
      </button>

      {/* Vertical divider */}
      <div className="flex items-center justify-center h-[20px] w-0">
        <div className="w-[1px] h-[20px] bg-input-border rotate-0" />
      </div>

      {/* Tabs */}
      <div className="flex flex-1 gap-[16px] items-center min-w-0 border-0 border-input-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onTabChange(i)}
            className={`flex flex-1 flex-col items-center justify-center h-[44px] min-w-0 px-[16px] ${
              activeTab === i
                ? "border-b-[1.5px] border-tab-active-border"
                : ""
            }`}
          >
            <span className={`text-[14px] leading-[1.55] font-medium whitespace-nowrap font-[family-name:var(--font-title)] ${
              activeTab === i
                ? "text-tab-active-text"
                : "text-text-tab-default"
            }`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Vertical divider */}
      <div className="flex items-center justify-center h-[20px] w-0">
        <div className="w-[1px] h-[20px] bg-input-border" />
      </div>

      {/* Right nav arrow */}
      <button className="flex items-center justify-center size-[36px] rounded-[8px]">
        <svg className="size-[13.5px] text-text-caption" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
