export default function ScenarioControlStrip() {
  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      {/* Left: Title + Dropdown */}
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-[#E2E1DF]">
          Default [Market] Scenario
        </h1>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-[#8E8781]"
        >
          Default View
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
      </div>

      {/* Center: Metadata */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[10px] text-[#6D6561]">
          Latest model as of: --
        </span>
        <span className="text-[10px] text-[#6D6561]">
          Outcomes actualized through: &lt; 4 days
        </span>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-black"
        >
          View
        </button>
        <button
          type="button"
          className="rounded-md border border-[#393939] px-4 py-1.5 text-sm font-medium text-[#C7C4C1]"
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-md bg-[#206C7F] px-4 py-1.5 text-sm font-medium text-white"
        >
          Optimize
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#393939]"
          aria-label="Download"
        >
          <svg className="h-4 w-4 text-[#8E8781]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
