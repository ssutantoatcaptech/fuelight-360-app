const brands = [
  { name: "Coca-Cola", volume: "0.00 MUC", pct: "-0.02%", positive: false },
  { name: "Coca-Cola Zero", volume: "0.00 MUC", pct: "+0.07%", positive: true },
  { name: "Fanta", volume: "0.00 MUC", pct: "-0.02%", positive: false },
  { name: "Sprite", volume: "0.00 MUC", pct: "+0.07%", positive: true },
];

export default function BrandPerformanceSnapshot() {
  return (
    <div className="w-full rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#E2E1DF]">Brand Performance Snapshot</h2>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-[#393939] px-3 py-1.5 text-xs text-[#8E8781]"
        >
          Largest Variance
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
      </div>

      {/* Brand Cards Track */}
      <div className="flex gap-4 overflow-x-auto pb-3">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="flex min-w-[180px] flex-1 flex-col gap-2 rounded-lg border border-[#1f1f1f] bg-[#141414] px-4 py-3"
          >
            <span className="text-xs font-medium text-[#E2E1DF]">{brand.name}</span>
            <span className="text-base font-semibold text-[#E2E1DF]">{brand.volume}</span>
            <span
              className={`inline-flex w-fit rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                brand.positive
                  ? "bg-green-400/10 text-green-400"
                  : "bg-red-400/10 text-red-400"
              }`}
            >
              {brand.pct}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll Track */}
      <div className="mt-2 h-1 w-full rounded-full bg-[#1f1f1f]">
        <div className="h-1 w-1/4 rounded-full bg-[#393939]" />
      </div>
    </div>
  );
}
