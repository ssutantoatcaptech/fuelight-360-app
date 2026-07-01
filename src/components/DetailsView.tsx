const rowLabels = ["Meta", "TikTok", "SnapChat", "Pintrest", "X (Twitter)", "Other Social"];

const columnHeaders = [
  "Investment (£M)",
  "Impressions (M)",
  "Sell-out Volume (MUC)",
  "System NSR ($M)",
];

export default function DetailsView() {
  return (
    <div className="flex flex-col flex-1 h-full w-full min-h-0 overflow-hidden">
      {/* Context Header Row */}
      <div className="flex items-center justify-between w-full pb-[16px] shrink-0">
        <div className="flex items-center gap-[8px]">
          <svg className="size-[16px] text-text-caption" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h4v4H2V2zm0 6h4v4H2V8zm6-6h4v4H8V2zm0 6h4v4H8V8z" />
          </svg>
          <span className="text-[14px] font-medium text-text-header">
            Data Details
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="text-[13px] text-text-caption">Values in Millions</span>
          <span className="text-[13px] text-text-caption">Selected timeframe</span>
          <span className="text-[13px] text-text-caption">View-only</span>
          <button className="flex items-center gap-[6px] h-[36px] px-[12px] border border-input-border rounded-[8px] text-[13px] font-medium text-text-header bg-input-bg">
            <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a1 1 0 011 1v1.07a5.97 5.97 0 012.18.9l.76-.75a1 1 0 011.41 1.41l-.75.76c.44.66.75 1.4.9 2.18H14.6a1 1 0 110 2H13.5a5.97 5.97 0 01-.9 2.18l.75.76a1 1 0 01-1.41 1.41l-.76-.75a5.97 5.97 0 01-2.18.9V14.6a1 1 0 11-2 0V13.5a5.97 5.97 0 01-2.18-.9l-.76.75a1 1 0 01-1.41-1.41l.75-.76A5.97 5.97 0 012.5 9H1.4a1 1 0 110-2H2.5a5.97 5.97 0 01.9-2.18l-.75-.76a1 1 0 011.41-1.41l.76.75A5.97 5.97 0 017 2.5V1.4A1 1 0 018 0zm0 5a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            Table Settings
          </button>
        </div>
      </div>

      {/* Spreadsheet Panel */}
      <div className="bg-table-border p-px flex-1 h-full w-full min-h-0 overflow-hidden">
      <div
        className="grid gap-x-px gap-y-px h-full w-full"
        style={{
          gridTemplateColumns: "224px repeat(4, minmax(0, 1fr)) 15px",
          gridTemplateRows: "56px 56px repeat(6, 56px) minmax(0, 1fr) 15px",
        }}
      >
        {/* Row 1, Col 1: Empty header cell spanning 2 rows */}
        <div
          className="bg-table-header-raised"
          style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}
        />

        {/* Row 1, Cols 2-5: "Selected Combination" + Contribution badge */}
        <div
          className="bg-table-header-raised flex items-center justify-center gap-[8px]"
          style={{ gridRow: "1 / 2", gridColumn: "2 / 6" }}
        >
          <span className="text-[14px] font-semibold text-text-header text-center">
            Selected Combination
          </span>
          <span className="bg-container-sunken4 rounded-full px-[8px] h-[24px] flex items-center text-[12px] text-text-header font-medium">
            Contribution
          </span>
        </div>

        {/* Row 1, Col 6: Empty scroll track header */}
        <div
          className="bg-table-header-raised"
          style={{ gridRow: "1 / 2", gridColumn: "6 / 7" }}
        />

        {/* Row 2: Column headers */}
        {columnHeaders.map((header, i) => (
          <div
            key={i}
            className="bg-table-header-raised-highest flex items-center justify-center px-[12px]"
            style={{ gridRow: "2 / 3", gridColumn: `${i + 2} / ${i + 3}` }}
          >
            <span className="text-[14px] font-semibold text-text-header text-center flex items-center gap-[4px]">
              {header}
              {i === 0 && (
                <svg
                  className="size-[14px] text-text-caption"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1 1 0 110 2 1 1 0 010-2zM7 7h2v5H7V7z" />
                </svg>
              )}
            </span>
          </div>
        ))}

        {/* Row 2, Col 6: Empty scroll track */}
        <div
          className="bg-table-header-raised-highest"
          style={{ gridRow: "2 / 3", gridColumn: "6 / 7" }}
        />

        {/* Data rows */}
        {rowLabels.map((label, ri) => (
          <div key={ri} className="contents">
            {/* Row label cell */}
            <div
              className="bg-table-cell-raised-high flex items-center pl-[24px] text-[14px] text-text-body"
              style={{ gridRow: `${ri + 3} / ${ri + 4}`, gridColumn: "1 / 2" }}
            >
              {label}
            </div>

            {/* Data cells */}
            {columnHeaders.map((_, ci) => (
              <div
                key={`cell-${ri}-${ci}`}
                className="bg-table-cell-raised-high flex items-center justify-end pr-[12px] text-[14px] text-text-body text-right"
                style={{
                  gridRow: `${ri + 3} / ${ri + 4}`,
                  gridColumn: `${ci + 2} / ${ci + 3}`,
                }}
              >
                0.00
              </div>
            ))}

            {/* Scroll track cell for this row */}
            <div
              className="bg-table-cell-raised-high"
              style={{ gridRow: `${ri + 3} / ${ri + 4}`, gridColumn: "6 / 7" }}
            />
          </div>
        ))}

        {/* Filler row (flex-1 remaining space) */}
        <div
          className="bg-table-cell-raised"
          style={{ gridRow: "9 / 10", gridColumn: "1 / 2" }}
        />
        {columnHeaders.map((_, ci) => (
          <div
            key={`filler-${ci}`}
            className="bg-table-cell-raised"
            style={{ gridRow: "9 / 10", gridColumn: `${ci + 2} / ${ci + 3}` }}
          />
        ))}
        {/* Filler row scroll track */}
        <div
          className="bg-table-cell-raised flex items-center justify-center"
          style={{ gridRow: "9 / 10", gridColumn: "6 / 7" }}
        >
          {/* Vertical scroll indicator */}
          <div className="w-[6px] h-[40px] rounded-full bg-container-sunken5" />
        </div>

        {/* Bottom scroll row */}
        <div
          className="bg-table-cell-raised"
          style={{ gridRow: "10 / 11", gridColumn: "1 / 2" }}
        />
        <div
          className="bg-table-cell-raised flex items-center justify-center"
          style={{ gridRow: "10 / 11", gridColumn: "2 / 6" }}
        >
          {/* Horizontal scroll indicator */}
          <div className="h-[6px] w-[60px] rounded-full bg-container-sunken5" />
        </div>
        <div
          className="bg-table-cell-raised"
          style={{ gridRow: "10 / 11", gridColumn: "6 / 7" }}
        />
      </div>
      </div>
    </div>
  );
}
