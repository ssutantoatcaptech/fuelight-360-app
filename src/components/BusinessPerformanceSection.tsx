const kpiCards = [
  { label: "Sell-out Volume", value: "", subtext: "vs same period last year", color: "green" },
  { label: "", value: "0.00 MUC", subtext: "+0.00 MUC", color: "green" },
  { label: "System NSR", value: "", subtext: "vs same period last year", color: "red" },
  { label: "", value: "£0.00M", subtext: "-£0.00M", color: "red" },
  { label: "System GP", value: "", subtext: "vs same period last year", color: "green" },
];

const leftTableRows = [
  { label: "Sell-out Volume", col1: "£357.28", col2: "0.00", col3: "" },
  { label: "System NSR", col1: "£357.28", col2: "0.00", col3: "" },
  { label: "System GP", col1: "£357.28", col2: "0.00", col3: "" },
  { label: "Consumer Investment", col1: "£357.28", col2: "0.00", col3: "" },
  { label: "Customer Investment", col1: "£357.28", col2: "0.00", col3: "" },
  { label: "Total", col1: "£357.28", col2: "0.00", col3: "", isBold: true },
];

const rightTableRows = [
  { channel: "Digital Media", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Traditional Media", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Digital Media", sub: "Imorand Media", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Internal Media", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Others", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Tenoles", volume: "0.00", nsp: "£0.00", roi: "+0.0x" },
  { channel: "Total", volume: "0.00", nsp: "£0.00", roi: "+0.0x", isBold: true },
];

export default function BusinessPerformanceSection() {
  return (
    <div className="w-full rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#E2E1DF]">Business Performance</h2>
        <div className="h-5 w-9 rounded-full bg-[#262626] p-0.5">
          <div className="ml-auto h-4 w-4 rounded-full bg-[#40B8C5]" />
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="mb-6 grid grid-cols-5 gap-3">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-lg border border-[#1f1f1f] bg-[#141414] px-3 py-3">
            {kpi.label && (
              <span className="text-[10px] uppercase tracking-wide text-[#6D6561]">{kpi.label}</span>
            )}
            {kpi.value && (
              <span className={`text-base font-semibold ${kpi.color === "green" ? "text-green-400" : "text-red-400"}`}>
                {kpi.value}
              </span>
            )}
            <span className={`text-[10px] ${kpi.color === "green" ? "text-green-400/70" : "text-red-400/70"}`}>
              {kpi.subtext}
            </span>
          </div>
        ))}
      </div>

      {/* Nested Table Containers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Table: Consumer Investment */}
        <div className="rounded-lg border border-[#1f1f1f] bg-[#141414]">
          <div className="border-b border-[#1f1f1f] px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8E8781]">Consumer Investment</span>
          </div>
          <div className="flex flex-col">
            {/* Column Headers */}
            <div className="flex items-center border-b border-[#1f1f1f] px-4 py-2 text-[10px] uppercase tracking-wide text-[#6D6561]">
              <span className="flex-1">Metric</span>
              <span className="w-20 text-right">Value</span>
              <span className="w-20 text-right">Volume</span>
              <span className="w-16 text-right">Delta</span>
            </div>
            {leftTableRows.map((row, i) => (
              <div
                key={i}
                className={`flex items-center px-4 py-2 ${i < leftTableRows.length - 1 ? "border-b border-[#1a1a1a]" : ""}`}
              >
                <span className={`flex-1 text-sm ${row.isBold ? "font-semibold text-[#E2E1DF]" : "text-[#C7C4C1]"}`}>
                  {row.label}
                </span>
                <span className="w-20 text-right text-sm text-[#8E8781]">{row.col1}</span>
                <span className="w-20 text-right text-sm text-[#8E8781]">{row.col2}</span>
                <span className="w-16 text-right text-sm text-[#6D6561]">{row.col3}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Table: Channel Breakdown */}
        <div className="rounded-lg border border-[#1f1f1f] bg-[#141414]">
          <div className="border-b border-[#1f1f1f] px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8E8781]">Channel Breakdown</span>
          </div>
          <div className="flex flex-col">
            {/* Column Headers */}
            <div className="flex items-center border-b border-[#1f1f1f] px-4 py-2 text-[10px] uppercase tracking-wide text-[#6D6561]">
              <span className="flex-1">Channel</span>
              <span className="w-16 text-right">Volume</span>
              <span className="w-16 text-right">NSP</span>
              <span className="w-16 text-right">ROI</span>
            </div>
            {rightTableRows.map((row, i) => (
              <div
                key={i}
                className={`flex items-center px-4 py-2 ${i < rightTableRows.length - 1 ? "border-b border-[#1a1a1a]" : ""}`}
              >
                <span className={`flex-1 text-sm ${row.isBold ? "font-semibold text-[#E2E1DF]" : "text-[#C7C4C1]"}`}>
                  {row.channel}
                  {row.sub && <span className="ml-1 text-[10px] text-[#6D6561]">({row.sub})</span>}
                </span>
                <span className="w-16 text-right text-sm text-[#8E8781]">{row.volume}</span>
                <span className="w-16 text-right text-sm text-[#8E8781]">{row.nsp}</span>
                <span className="w-16 text-right text-sm text-green-400">{row.roi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
