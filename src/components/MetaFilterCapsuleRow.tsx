const filters = [
  { label: "GB", hasChevron: true },
  { label: "£ GBP", hasChevron: true },
  { label: "Market", hasChevron: true },
  { label: "Jun 4, 2025 – Nov 4, 2025", hasChevron: false, hasCalendar: true },
  { label: "All Brands", hasChevron: true },
];

export default function MetaFilterCapsuleRow() {
  return (
    <div className="flex items-center gap-3 px-6 py-2">
      {filters.map((f, i) => (
        <button
          key={i}
          type="button"
          className="flex items-center gap-1.5 rounded-full border border-[#393939] px-3 py-1.5 text-xs font-medium text-[#C7C4C1] transition-colors hover:border-[#6D6561]"
        >
          {f.label}
          {f.hasChevron && (
            <svg className="h-3 w-3 text-[#6D6561]" viewBox="0 0 12 12" fill="currentColor">
              <path d="M3 5l3 3 3-3" />
            </svg>
          )}
          {f.hasCalendar && (
            <svg className="h-3 w-3 text-[#6D6561]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="1" y="2" width="10" height="9" rx="1" />
              <path d="M1 5h10M4 0.5v2M8 0.5v2" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
