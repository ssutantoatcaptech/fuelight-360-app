const brands = [
  {
    name: "Coca-Cola",
    selloutVolume: "1.20 MUC",
    selloutDelta: "(+0.00 MUC)",
    selloutColor: "success",
    nsrValue: "£0.40M",
    nsrDelta: "(+0.00)",
    nsrColor: "success",
  },
  {
    name: "Coca-Cola Zero",
    selloutVolume: "1.20 MUC",
    selloutDelta: "(+0.00 MUC)",
    selloutColor: "success",
    nsrValue: "$0.20M",
    nsrDelta: "(+0.00)",
    nsrColor: "success",
  },
  {
    name: "Fanta",
    selloutVolume: "0.10 MUC",
    selloutDelta: "(-0.00 MUC)",
    selloutColor: "error",
    nsrValue: "£0.05M",
    nsrDelta: "(+0.00)",
    nsrColor: "error",
  },
  {
    name: "Sprite",
    selloutVolume: "0.50 MUC",
    selloutDelta: "(+ 0.00 MUC)",
    selloutColor: "success",
    nsrValue: "$0.10M",
    nsrDelta: "(+ 0.00)",
    nsrColor: "success",
  },
];

export default function BrandPerformanceSnapshot() {
  return (
    <div className="flex flex-col gap-[24px] items-start w-full">
      {/* Section Header */}
      <div className="flex items-center justify-center w-full">
        <div className="flex-1 min-w-0">
          <h2 className="text-[24px] leading-[1.4] font-medium text-text-header font-[family-name:var(--font-title)]">
            Brand Performance Snapshot
          </h2>
        </div>
        {/* Dropdown */}
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <div className="flex gap-[12px] items-center h-[36px] px-[12px] rounded-[8px] bg-input-bg border border-input-border">
            <span className="text-[14px] leading-[1.6] text-text-header whitespace-nowrap overflow-hidden text-ellipsis">
              Largest Variance
            </span>
            <div className="flex items-center justify-center w-[8px] h-[20px] shrink-0">
              <svg className="size-[16.5px] text-text-caption" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Cards — locally isolated horizontal scroll, scrollbar hidden until hover */}
      <div className="brand-card-scroll w-full overflow-x-auto">
      <div className="flex gap-[16px] items-start w-max">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="flex flex-col gap-0 items-center px-[16px] py-[16px] rounded-xl bg-container-flat shrink-0"
          >
            {/* Card table */}
            <div className="grid grid-cols-2 gap-y-[8px] w-[416px] overflow-hidden">
              {/* Row 1: Brand name + "Total (vs same period last year)" */}
              <div className="col-start-1 flex items-center self-stretch px-[8px]">
                <span className="flex-1 min-w-0 text-[14px] leading-[1.55] font-medium text-text-header truncate font-[family-name:var(--font-title)]">
                  {brand.name}
                </span>
              </div>
              <div className="col-start-2 flex items-center self-stretch px-[8px] overflow-hidden">
                <span className="flex-1 min-w-0 text-[12px] leading-[1.6] text-table-cell truncate">
                  Total (vs same period last year)
                </span>
              </div>

              {/* Row 2: Sell-out Volume + value */}
              <div className="col-start-1 flex items-center self-stretch px-[8px] overflow-hidden">
                <span className="flex-1 min-w-0 text-[12px] leading-[1.6] text-table-cell truncate">
                  Sell-out Volume
                </span>
              </div>
              <div className="col-start-2 flex items-center self-stretch px-[8px] overflow-hidden">
                <span className="flex-1 min-w-0 text-[12px] leading-[1.6] text-table-cell whitespace-pre truncate">
                  <span className="text-input-border">{brand.selloutVolume}{"  "}</span>
                  <span className={brand.selloutColor === "success" ? "text-success" : "text-error"}>
                    {brand.selloutDelta}
                  </span>
                </span>
              </div>

              {/* Row 3: System NSR + value (raised bg) */}
              <div className="col-start-1 flex items-center h-[24px] px-[8px] overflow-hidden bg-table-row-raised rounded-none">
                <span className="flex-1 min-w-0 text-[12px] leading-[1.6] text-table-cell truncate">
                  System NSR
                </span>
              </div>
              <div className="col-start-2 flex items-center h-[24px] px-[8px] overflow-hidden bg-table-row-raised rounded-none">
                <span className="flex-1 min-w-0 text-[12px] leading-[1.6] text-table-cell whitespace-pre truncate">
                  {brand.nsrValue}{"  "}
                  <span className={brand.nsrColor === "success" ? "text-success" : "text-error"}>
                    {brand.nsrDelta}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
