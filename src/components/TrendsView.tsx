import { useState } from "react";

const weekLabels = [
  "7/7/25", "7/14/25", "7/21/25", "7/28/25", "8/4/25", "8/11/25", "8/18/25",
  "8/25/25", "9/1/25", "9/8/25", "9/15/25", "9/22/25", "9/29/25", "10/6/25",
];

const investmentData = [
  0.28, 0.24, 0.23, 0.23, 0.24, 0.24, 0.22,
  0.18, 0.17, 0.16, 0.17, 0.18, 0.17, 0.16,
];

const contributionData = [
  0.80, 0.90, 0.95, 0.98, 1.02, 1.08, 0.98,
  0.92, 0.85, 0.92, 0.95, 0.78, 0.88, 0.92,
];

const leftYTicks = [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35];
const rightYTicks = [0.00, 0.20, 0.40, 0.60, 0.80, 1.00, 1.20];
const leftMax = 0.35;
const rightMax = 1.20;
const chartHeight = 380;
const chartPadX = 20;
const verticalDividerIndex = 4;

function getCoords(data: number[], max: number, width: number) {
  const segW = (width - chartPadX * 2) / (data.length - 1);
  return data.map((val, i) => ({
    x: chartPadX + i * segW,
    y: chartHeight - (val / max) * chartHeight,
  }));
}

export default function TrendsView() {
  const [timeframe, setTimeframe] = useState<"Week" | "Month" | "Quarter">("Week");
  const svgWidth = 960;

  const investCoords = getCoords(investmentData, leftMax, svgWidth);
  const contribCoords = getCoords(contributionData, rightMax, svgWidth);

  const dividerX = chartPadX + (verticalDividerIndex * (svgWidth - chartPadX * 2)) / (weekLabels.length - 1);

  return (
    <div className="flex flex-col flex-1 gap-[24px] items-start w-full min-h-0 mt-0 pt-0">
      {/* Context Header Row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[12px]">
          <h2 className="text-[20px] leading-[1.4] font-medium text-text-header font-[family-name:var(--font-title)]">
            Performance Trends
          </h2>
          <span className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-full bg-container-sunken4 text-[13px] text-text-body">
            <span className="flex items-center justify-center size-[18px] rounded-full bg-input-border text-[10px] font-medium text-text-header">
              7
            </span>
            Brand
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="text-[13px] text-text-caption">
            ⊕ Temperature
          </span>
          <button className="flex items-center gap-[6px] h-[36px] px-[12px] border border-input-border rounded-[8px] text-[13px] font-medium text-text-header bg-input-bg">
            <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3h12v1H2V3zm0 4h12v1H2V7zm0 4h8v1H2v-1z" />
            </svg>
            Chart Settings
          </button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[4px] text-[13px] text-text-caption">
          <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z" />
          </svg>
          <span>Activation Drivers</span>
          <span className="mx-[2px]">&gt;</span>
          <span>Consumer (Paid)</span>
          <span className="mx-[2px]">&gt;</span>
          <span>Digital Media</span>
          <span className="mx-[2px]">&gt;</span>
          <span className="text-text-header font-medium">Social</span>
        </div>
        <span className="text-[13px] text-text-caption">Figures in millions</span>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col flex-1 min-h-0 w-full bg-chart-bg rounded-[8px] pt-[40px] px-[24px] pb-[20px]">
        {/* Legend row at top center */}
        <div className="flex items-center justify-center gap-[24px] w-full mb-[24px]">
          <div className="flex items-center gap-[6px]">
            <span className="size-[12px] bg-chart-line-investment" />
            <span className="text-[12px] font-['Avenir_Next'] text-text-body">
              Driver Input – Investment (£M)
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="size-[12px] bg-chart-line-contribution" />
            <span className="text-[12px] font-['Avenir_Next'] text-text-body">
              Driver Contribution – Sell-Out Volume (MUC)
            </span>
          </div>
        </div>

        {/* Chart with Y-axes */}
        <div className="flex flex-1 w-full min-h-0">
          {/* Left Y-axis label (rotated) */}
          <div className="flex items-center justify-center w-[24px] h-full min-h-[380px]">
            <span className="text-[12px] font-['Avenir_Next'] text-text-header -rotate-90 whitespace-nowrap">
              Driver Input – Investment (£M)
            </span>
          </div>

          {/* Left Y-axis ticks */}
          <div className="flex flex-col justify-between w-[40px] h-full min-h-[380px] py-[4px] text-right pr-[6px]">
            {[...leftYTicks].reverse().map((tick) => (
              <span key={tick} className="text-[11px] font-['Avenir_Next'] text-text-caption leading-none">
                {tick.toFixed(2)}
              </span>
            ))}
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative h-full min-h-[380px]">
            {/* Horizontal grid lines */}
            {leftYTicks.map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-chart-divider"
                style={{ bottom: `${(tick / leftMax) * 100}%` }}
              />
            ))}

            {/* SVG line plots */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${svgWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Vertical dashed divider */}
              <line
                x1={dividerX}
                y1={0}
                x2={dividerX}
                y2={chartHeight}
                stroke="var(--color-chart-divider)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />

              {/* Investment line */}
              <polyline
                points={investCoords.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
                fill="none"
                stroke="var(--color-chart-line-investment)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {investCoords.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="var(--color-chart-line-investment)"
                />
              ))}

              {/* Contribution line */}
              <polyline
                points={contribCoords.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
                fill="none"
                stroke="var(--color-chart-line-contribution)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {contribCoords.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="var(--color-chart-line-contribution)"
                />
              ))}
            </svg>
          </div>

          {/* Right Y-axis ticks */}
          <div className="flex flex-col justify-between w-[40px] h-full min-h-[380px] py-[4px] text-left pl-[6px]">
            {[...rightYTicks].reverse().map((tick) => (
              <span key={tick} className="text-[11px] font-['Avenir_Next'] text-text-caption leading-none">
                {tick.toFixed(2)}
              </span>
            ))}
          </div>

          {/* Right Y-axis label (rotated) */}
          <div className="flex items-center justify-center w-[24px] h-full min-h-[380px]">
            <span className="text-[12px] font-['Avenir_Next'] text-text-header rotate-90 whitespace-nowrap">
              Driver Contribution – Sell-Out Volume (MUC)
            </span>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex items-start w-full mt-[8px]">
          <div className="w-[64px]" />
          <div className="flex-1 flex justify-between">
            {weekLabels.map((label, i) => (
              <span key={i} className="text-[11px] font-['Avenir_Next'] text-text-caption">
                {label}
              </span>
            ))}
          </div>
          <div className="w-[64px]" />
        </div>

        {/* Timeframe View Toggle */}
        <div className="flex items-center justify-center gap-[12px] w-full mt-[20px]">
          <span className="text-[13px] text-text-body">Timeframe View</span>
          <div className="flex items-center gap-[2px]">
            {(["Week", "Month", "Quarter"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`h-[32px] px-[16px] text-[13px] rounded-[8px] ${
                  timeframe === t
                    ? "bg-container-sunken4 text-text-header font-medium"
                    : "text-text-caption"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
