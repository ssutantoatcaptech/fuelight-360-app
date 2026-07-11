import { useState } from "react";
import TableSettingsDrawer from "./TableSettingsDrawer";

const rowLabels = ["Customer", "Consumer (Paid)", "Consumer (Owned)"];

const columnHeaders = [
  { label: "Full Year", locked: false, calendar: false },
  { label: "YTD", locked: true, calendar: false },
  { label: "YTG", locked: false, calendar: false },
  { label: "6/1 -6/7", locked: true, calendar: true },
  { label: "6/8 -6/14", locked: true, calendar: true },
  { label: "6/15 -6/21", locked: true, calendar: true },
  { label: "6/22 -6/28", locked: true, calendar: true },
  { label: "6/29 -7/5", locked: true, calendar: true },
  { label: "7/6 -7/12", locked: true, calendar: true },
  { label: "7/13 -7/19", locked: true, calendar: true },
];

export default function GlobalEditView() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col flex-1 h-full w-full min-h-0 overflow-hidden gap-[8px] rounded-t-[16px] bg-table-surface px-[48px] py-[32px]">
      {/* Context Header Row */}
      <div className="flex items-center justify-between w-full shrink-0">
        <div className="flex items-center gap-[6px] pt-[4px]">
          <svg className="size-[16px] text-text-caption" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h4v4H2V2zm0 6h4v4H2V8zm6-6h4v4H8V2zm0 6h4v4H8V8z" />
          </svg>
          <span className="text-[14px] text-text-header">
            Activation Drivers
          </span>
        </div>
        <div className="flex items-center gap-[24px]">
          <span className="text-[12px] text-text-caption">Values in Millions</span>
          <div className="flex items-center gap-[4px]">
            <svg className="size-[10px] text-text-caption" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0V7H2a1 1 0 010-2h3V2a1 1 0 011-1z" />
            </svg>
            <span className="text-[12px] text-text-caption">Selected timeframe</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <svg className="size-[10px] text-text-caption" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm1 3v4H4V6h2V3h1z" />
            </svg>
            <span className="text-[12px] text-text-caption">View-only</span>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] bg-input-bg border border-input-border text-[14px] text-text-header">
            <svg className="size-[13px] text-text-header" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a1 1 0 011 1v1.07a5.97 5.97 0 012.18.9l.76-.75a1 1 0 011.41 1.41l-.75.76c.44.66.75 1.4.9 2.18H14.6a1 1 0 110 2H13.5a5.97 5.97 0 01-.9 2.18l.75.76a1 1 0 01-1.41 1.41l-.76-.75a5.97 5.97 0 01-2.18.9V14.6a1 1 0 11-2 0V13.5a5.97 5.97 0 01-2.18-.9l-.76.75a1 1 0 01-1.41-1.41l.75-.76A5.97 5.97 0 012.5 9H1.4a1 1 0 110-2H2.5a5.97 5.97 0 01.9-2.18l-.75-.76a1 1 0 011.41-1.41l.76.75A5.97 5.97 0 017 2.5V1.4A1 1 0 018 0zm0 5a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            Table Settings
          </button>
        </div>
      </div>

      {/* Table Grid — frozen left column + horizontally scrollable data */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* Frozen left column */}
        <div
          className="grid shrink-0 gap-y-px bg-table-border"
          style={{
            gridTemplateColumns: "224px",
            gridTemplateRows: "56px 56px 56px repeat(3, 56px) minmax(0, 1fr)",
            width: "225px",
          }}
        >
          <div className="bg-table-header-raised" style={{ gridRow: "1 / 4" }} />
          {rowLabels.map((label, ri) => (
            <div
              key={ri}
              className="bg-table-cell-raised-high flex items-center pl-[24px] text-[14px] text-text-body"
            >
              {label}
            </div>
          ))}
          <div className="bg-table-cell-raised" />
        </div>

        {/* Scrollable data columns */}
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden bg-table-border">
          <div
            className="grid gap-x-px gap-y-px h-full"
            style={{
              gridTemplateColumns: `repeat(${columnHeaders.length}, minmax(120px, 1fr))`,
              gridTemplateRows: "56px 56px 56px repeat(3, 56px) minmax(0, 1fr)",
              minWidth: `${columnHeaders.length * 120}px`,
            }}
          >
            {/* Row 1: "Coca-Cola" spanning all columns */}
            <div
              className="bg-table-header-raised flex items-center px-[8px]"
              style={{ gridColumn: `1 / ${columnHeaders.length + 1}` }}
            >
              <span className="text-[14px] font-semibold text-text-header">
                Coca-Cola
              </span>
            </div>

            {/* Row 2: "2025" spanning all columns */}
            <div
              className="bg-table-header-raised flex items-center px-[8px]"
              style={{ gridColumn: `1 / ${columnHeaders.length + 1}` }}
            >
              <span className="text-[14px] font-semibold text-text-header">
                2025
              </span>
            </div>

            {/* Row 3: Column headers */}
            {columnHeaders.map((col, i) => (
              <div
                key={i}
                className="bg-table-header-raised-highest flex items-center justify-center px-[8px]"
              >
                <span className="text-[14px] font-semibold text-text-header text-center flex items-center gap-[4px] whitespace-nowrap">
                  {col.locked && (
                    <svg className="size-[13px] text-text-caption shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a4 4 0 00-4 4v2H3a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm2 6V5a2 2 0 10-4 0v2h4z" />
                    </svg>
                  )}
                  {col.label}
                  {col.calendar && (
                    <svg className="size-[13px] text-text-caption shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5 0a1 1 0 011 1v1h4V1a1 1 0 112 0v1h2a1 1 0 011 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h2V1a1 1 0 011-1zM3 6v8h10V6H3z" />
                    </svg>
                  )}
                </span>
              </div>
            ))}

            {/* Data rows */}
            {rowLabels.map((_, ri) =>
              columnHeaders.map((__, ci) => (
                <div
                  key={`cell-${ri}-${ci}`}
                  className="bg-table-cell-raised-high flex items-center justify-end pr-[8px] text-[14px] text-right"
                >
                  <span className={ci < 3 ? "text-text-body" : "text-text-disabled"}>
                    0.00
                  </span>
                </div>
              ))
            )}

            {/* Filler row */}
            {columnHeaders.map((_, ci) => (
              <div
                key={`filler-${ci}`}
                className="bg-table-cell-raised"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between w-full pt-[8px] shrink-0">
        <div className="flex items-center gap-[4px]">
          <button className="flex items-center justify-center size-[36px] rounded-[8px] opacity-70">
            <svg className="size-[19px] text-text-caption" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </svg>
          </button>
          <button className="flex items-center justify-center size-[36px] rounded-[8px] opacity-70">
            <svg className="size-[19px] text-text-caption" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-[16px]">
          <button className="flex items-center justify-center h-[36px] min-w-[80px] px-[12px] rounded-[8px] text-[14px] text-text-caption">
            Cancel
          </button>
          <button className="flex items-center justify-center h-[36px] min-w-[80px] px-[12px] rounded-[8px] bg-container-sunken4 text-[14px] text-text-disabled opacity-70">
            Save
          </button>
        </div>
      </div>
    </div>

    <TableSettingsDrawer
      open={settingsOpen}
      onClose={() => setSettingsOpen(false)}
      onApply={(s) => {
        console.log("Table Settings applied:", s);
        setSettingsOpen(false);
      }}
    />
    </>
  );
}
