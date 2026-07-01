interface Props {
  viewMode: "view" | "edit" | "optimize";
  onViewModeChange: (mode: "view" | "edit" | "optimize") => void;
}

export default function ScenarioControlStrip({ viewMode, onViewModeChange }: Props) {
  return (
    <div className="flex gap-[16px] h-[56px] items-center w-full">
      {/* Left: Title + Tag */}
      <div className="flex flex-1 gap-[16px] h-[56px] items-center min-w-0">
        <div className="flex gap-[8px] items-center shrink-0">
          {/* Settings icon */}
          <div className="flex items-center justify-center size-[24px] shrink-0">
            <svg className="size-[19.5px] text-text-caption" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          {/* Title */}
          <h1 className="text-[20px] leading-[1.4] font-medium text-text-header whitespace-nowrap font-[family-name:var(--font-title)]">
            Default [Market] Scenario
          </h1>
        </div>
        {/* Tag */}
        <div className="flex items-center justify-center h-[20px] min-w-[20px] px-[8px] rounded-full bg-tccc-orange-600 shrink-0">
          <span className="text-[10px] leading-[1.4] text-white text-center whitespace-nowrap">
            Default View
          </span>
        </div>
      </div>

      {/* Right: Info + Buttons + Download */}
      <div className="flex gap-[24px] items-center shrink-0">
        {/* Info text */}
        <div className="flex gap-[8px] items-center">
          <svg className="size-[16px] text-text-caption shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0-2A5 5 0 108 3a5 5 0 000 10zM7 7h2v5H7V7zm0-3h2v2H7V4z" clipRule="evenodd" />
          </svg>
          <div className="flex flex-col gap-[8px] text-[10px] leading-[1.6] text-text-caption">
            <span>Latest model as of: 00/00/0000</span>
            <span>Outcomes actualized through: 00/00/0000</span>
          </div>
        </div>

        {/* Button group */}
        <div className="flex gap-[4px] h-[40px] items-center p-[2px] rounded-[10px] bg-container-flat">
          {/* View */}
          <button
            onClick={() => onViewModeChange("view")}
            className={`flex gap-[8px] items-center justify-center h-[36px] min-w-[80px] px-[12px] rounded-[8px] ${
              viewMode === "view"
                ? "gradient-border bg-button-accent-bg"
                : "bg-button-default-bg border-0"
            }`}
          >
            <svg className={`size-[16.5px] ${viewMode === "view" ? "text-button-accent-text" : "text-button-default-text"}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3C5 3 1.73 7.11 1 8s3.95 5 9 5 8-4.11 9-5-4-5-9-5zm0 8a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
            <span className={`text-[14px] leading-none text-center whitespace-nowrap ${viewMode === "view" ? "text-button-accent-text" : "text-button-default-text"}`}>
              View
            </span>
          </button>
          {/* Edit */}
          <button
            onClick={() => onViewModeChange("edit")}
            className={`flex gap-[8px] items-center justify-center h-[36px] min-w-[80px] px-[12px] rounded-[8px] ${
              viewMode === "edit"
                ? "gradient-border bg-button-accent-bg"
                : "bg-button-default-bg border-0"
            }`}
          >
            <svg className={`size-[16.5px] ${viewMode === "edit" ? "text-button-accent-text" : "text-button-default-text"}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className={`text-[14px] leading-none text-center whitespace-nowrap ${viewMode === "edit" ? "text-button-accent-text" : "text-button-default-text"}`}>
              Edit
            </span>
          </button>
          {/* Optimize */}
          <button
            onClick={() => onViewModeChange("optimize")}
            className={`flex gap-[8px] items-center justify-center h-[36px] min-w-[80px] px-[12px] rounded-[8px] ${
              viewMode === "optimize"
                ? "gradient-border bg-button-accent-bg"
                : "bg-button-default-bg border-0"
            }`}
          >
            <svg className={`size-[16.5px] ${viewMode === "optimize" ? "text-button-accent-text" : "text-button-default-text"}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 010-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744l.311 1.244 1.244.311a1 1 0 010 1.934l-1.244.311-.311 1.244a1 1 0 01-1.934 0l-.311-1.244-1.244-.311a1 1 0 010-1.934l1.244-.311.311-1.244A1 1 0 0112 2z" />
            </svg>
            <span className={`text-[14px] leading-none text-center whitespace-nowrap ${viewMode === "optimize" ? "text-button-accent-text" : "text-button-default-text"}`}>
              Optimize
            </span>
          </button>
        </div>

        {/* Download button */}
        <button className="flex items-center justify-center size-[44px] rounded-[8px]">
          <div className="flex items-center justify-center size-[24px]">
            <svg className="size-[19.5px] text-text-caption" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
