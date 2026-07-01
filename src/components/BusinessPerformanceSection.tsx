const kpiCards = [
  { label: "Sell-out Volume", value: "0.00 MUC", subLabel: "vs same period last year", subValue: "+0.00 MUC", color: "success" as const },
  { label: "System NSR", value: "£0.00M", subLabel: "vs same period last year", subValue: "-£0.00M", color: "error" as const },
  { label: "System GP", value: "£0.00M", subLabel: "vs same period last year", subValue: "+£0.00M", color: "success" as const },
];

const consumerInvestmentRows = [
  { label: "Digital Media", value: "£0.00M", delta: "(+0.00)", deltaColor: "success", roi1: "0.0x", roi2: "0.0x", isAlt: false },
  { label: "Traditional Media", value: "£0.00M", delta: "(-0.00)", deltaColor: "error", roi1: "0.0x", roi2: "0.0x", isAlt: true },
  { label: "Retail Media", value: "£0.00M", delta: "(+0.00)", deltaColor: "success", roi1: "0.0x", roi2: "0.0x", isAlt: false },
  { label: "Other Media", value: "£0.00M", delta: "(-0.00)", deltaColor: "error", roi1: "0.0x", roi2: "0.0x", isAlt: true },
];

const customerInvestmentRows = [
  { label: "Promotions & Shopper Marketing", value: "£0.00M", delta: "(+0.00)", deltaColor: "success", roi1: "0.0x", roi2: "0.0x", isAlt: false },
  { label: "Outlet Equipment", value: "£0.00M", delta: "(-0.00)", deltaColor: "error", roi1: "0.0x", roi2: "0.0x", isAlt: true },
];

export default function BusinessPerformanceSection() {
  return (
    <div className="flex flex-col gap-[24px] items-start w-full">
      {/* Section Header */}
      <div className="flex items-center justify-center w-full">
        <div className="flex-1 min-w-0">
          <h2 className="text-[20px] leading-[1.4] font-medium text-text-header font-[family-name:var(--font-title)]">
            Business Performance
          </h2>
        </div>
        <div className="flex gap-[24px] items-center">
          <div className="flex gap-[8px] items-center">
            {/* Toggle */}
            <div className="flex items-center w-[40px] h-[20px] px-[2px] rounded-full bg-input-bg overflow-hidden">
              <div className="size-[16px] rounded-full bg-brand-primary shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Bar — 3 equal cards separated by flex spacing */}
      <div className="flex items-start w-full px-[8px] py-[16px] border-t border-b border-input-border justify-between">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="flex flex-col gap-0 items-center px-[24px] py-[16px]" style={{ width: "calc(33.333% - 16px)" }}>
            <div className="grid grid-cols-[auto_1fr] grid-rows-[28px_22px] w-full gap-x-[16px]">
              {/* Row 1: Label + Value */}
              <p className="col-start-1 row-start-1 text-[20px] leading-[1.4] font-medium text-table-header font-[family-name:var(--font-title)] whitespace-nowrap">
                {kpi.label}
              </p>
              <p className="col-start-2 row-start-1 text-[20px] leading-[1.4] font-medium text-table-header text-right font-[family-name:var(--font-title)] whitespace-nowrap">
                {kpi.value}
              </p>
              {/* Row 2: Sub label + Sub value */}
              <p className={`col-start-1 row-start-2 text-[14px] leading-[1.6] whitespace-nowrap ${
                kpi.color === "success" ? "text-success" : "text-error"
              }`}>
                {kpi.subLabel}
              </p>
              <p className={`col-start-2 row-start-2 text-[14px] leading-[1.6] text-right whitespace-nowrap ${
                kpi.color === "success" ? "text-success" : "text-error"
              }`}>
                {kpi.subValue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="flex flex-col gap-[40px] items-start py-[16px] w-full">
        {/* Table 1: Consumer Investment */}
        <InvestmentTable
          title="Consumer Investment"
          totalValue="£0.00M"
          totalDelta="(+0.00)"
          totalDeltaColor="success"
          roi1Header="0.0x In-Period Sell-out Volume ROI"
          roi2Header="0.0x Long-Term Sell-out Volume ROI"
          rows={consumerInvestmentRows}
        />

        {/* Table 2: Customer Investment */}
        <InvestmentTable
          title="Customer Investment"
          totalValue="£0.00M"
          totalDelta="(+0.00)"
          totalDeltaColor="success"
          roi1Header="0.0x In-Period Sell-out Volume ROI"
          roi2Header="0.0x Long-Term Sell-out Volume ROI"
          rows={customerInvestmentRows}
        />
      </div>
    </div>
  );
}

function InvestmentTable({
  title,
  totalValue,
  totalDelta,
  totalDeltaColor,
  roi1Header,
  roi2Header,
  rows,
}: {
  title: string;
  totalValue: string;
  totalDelta: string;
  totalDeltaColor: string;
  roi1Header: string;
  roi2Header: string;
  rows: typeof consumerInvestmentRows;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-y-[8px] w-full" style={{ gridTemplateRows: `auto ${rows.map(() => "24px").join(" ")}` }}>
      {/* Header row */}
      {/* Col 1: Title */}
      <div className="col-start-1 row-start-1 flex items-center h-[24px] px-[8px]">
        <span className="text-[16px] leading-[1.6] font-semibold text-table-header truncate">
          {title}
        </span>
      </div>
      {/* Col 2: Total value + delta */}
      <div className="col-start-2 row-start-1 flex flex-col gap-[2px] items-start">
        <div className="flex items-center h-[24px] px-[8px]">
          <span className="text-[16px] leading-[1.6] font-semibold text-table-header whitespace-pre">
            {totalValue}{"  "}
            <span className={totalDeltaColor === "success" ? "text-success" : "text-error"}>
              {totalDelta}
            </span>
          </span>
        </div>
        <div className="flex items-center px-[8px]">
          <span className="text-[12px] leading-[1.4] text-text-caption">
            Total (vs same period last year)
          </span>
        </div>
      </div>
      {/* Col 3: In-Period ROI */}
      <div className="col-start-3 row-start-1 flex flex-col gap-[2px] items-start min-w-0 overflow-hidden">
        <div className="flex items-center h-[24px] px-[8px] w-full">
          <span className="text-[16px] leading-[1.6] font-semibold text-success truncate">
            {roi1Header}
          </span>
        </div>
        <div className="flex items-center px-[8px]">
          <span className="text-[12px] leading-[1.4] text-text-caption whitespace-nowrap">
            per £ invested
          </span>
        </div>
      </div>
      {/* Col 4: Long-Term ROI */}
      <div className="col-start-4 row-start-1 flex flex-col gap-[2px] items-start min-w-0 overflow-hidden">
        <div className="flex items-center h-[24px] px-[8px] w-full">
          <span className="text-[16px] leading-[1.6] font-semibold text-success truncate">
            {roi2Header}
          </span>
        </div>
        <div className="flex items-center px-[8px]">
          <span className="text-[12px] leading-[1.4] text-text-caption whitespace-nowrap">
            per £ invested
          </span>
        </div>
      </div>

      {/* Data rows */}
      {rows.map((row, i) => (
        <TableRow key={i} row={row} rowIndex={i + 2} />
      ))}
    </div>
  );
}

function TableRow({ row, rowIndex }: { row: typeof consumerInvestmentRows[0]; rowIndex: number }) {
  const bgClass = row.isAlt ? "bg-table-row-raised" : "";

  return (
    <>
      {/* Col 1: Label */}
      <div className={`col-start-1 flex items-center h-[24px] px-[8px] overflow-hidden ${bgClass}`} style={{ gridRow: rowIndex }}>
        <div className="w-[16px] h-[8px] shrink-0" />
        <span className="text-[12px] leading-[1.6] text-table-cell truncate">
          {row.label}
        </span>
      </div>
      {/* Col 2: Value + Delta */}
      <div className={`col-start-2 flex items-center h-[24px] px-[8px] overflow-hidden ${bgClass}`} style={{ gridRow: rowIndex }}>
        <span className="text-[12px] leading-[1.6] text-table-cell whitespace-pre">
          {row.value}{"  "}
          <span className={row.deltaColor === "success" ? "text-success" : "text-error"}>
            {row.delta}
          </span>
        </span>
      </div>
      {/* Col 3: In-Period ROI */}
      <div className={`col-start-3 flex items-center h-[24px] px-[8px] overflow-hidden ${bgClass}`} style={{ gridRow: rowIndex }}>
        <span className="text-[12px] leading-[1.6] text-table-cell">
          {row.roi1}
        </span>
      </div>
      {/* Col 4: Long-Term ROI */}
      <div className={`col-start-4 flex items-center h-[24px] px-[8px] overflow-hidden ${bgClass}`} style={{ gridRow: rowIndex }}>
        <span className="text-[12px] leading-[1.6] text-table-cell">
          {row.roi2}
        </span>
      </div>
    </>
  );
}
