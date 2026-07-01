const filters = [
  { label: "GB" },
  { label: "£ GBP" },
  { label: "Market" },
  { label: "Jun 4, 2025 - Nov 4, 2025", isDate: true },
  { label: "All Brands" },
];

export default function MetaFilterCapsuleRow() {
  return (
    <div className="flex gap-[20px] items-center p-[8px] rounded-[10px] bg-container-flat w-full">
      {/* Filter inputs */}
      <div className="flex flex-1 gap-[8px] items-center min-w-0">
        {filters.map((f, i) => (
          <div key={i} className="flex flex-col gap-[8px] items-start shrink-0">
            <div className="flex gap-[12px] items-center h-[36px] px-[12px] rounded-[8px] bg-input-bg border border-input-border">
              <span className="text-[14px] leading-[1.6] text-text-header whitespace-nowrap overflow-hidden text-ellipsis">
                {f.label}
              </span>
              <div className="flex items-center justify-center w-[8px] h-[20px] shrink-0">
                <svg className={`${f.isDate ? "size-[13.5px]" : "size-[16.5px]"} text-text-caption`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Right spacer (184px empty container from Figma) */}
      <div className="flex items-center self-stretch">
        <div className="flex gap-[8px] items-start justify-end w-[184px] h-full shrink-0" />
      </div>
    </div>
  );
}
