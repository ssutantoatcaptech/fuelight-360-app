const chartHeight = 400;
const chartWidth = 960;
const padX = 40;
const padY = 20;

// Marginal ROI curve (decreasing from upper-left to lower-right)
const roiPath = `M${padX},${padY + 40} C${padX + 80},${padY + 60} ${padX + 160},${padY + 100} ${padX + 280},${padY + 150} S${padX + 480},${padY + 220} ${padX + 640},${padY + 270} S${chartWidth - padX - 80},${padY + 310} ${chartWidth - padX},${padY + 330}`;

// Contribution S-curve (rising from lower-left to upper-right)
const contribPath = `M${padX},${chartHeight - padY - 20} C${padX + 60},${chartHeight - padY - 40} ${padX + 140},${chartHeight - padY - 100} ${padX + 280},${chartHeight - padY - 180} S${padX + 480},${chartHeight - padY - 260} ${padX + 640},${chartHeight - padY - 290} S${chartWidth - padX - 80},${chartHeight - padY - 310} ${chartWidth - padX},${chartHeight - padY - 320}`;

// Fill area below contribution curve
const contribFillPath = `${contribPath} L${chartWidth - padX},${chartHeight - padY} L${padX},${chartHeight - padY} Z`;

const priorX = padX + 220;
const currentX = padX + 360;

// Intercept Y positions at Prior Year
const roiPriorY = padY + 130;
const contribPriorY = chartHeight - padY - 160;

// Intercept Y positions at Current
const roiCurrentY = padY + 165;
const contribCurrentY = chartHeight - padY - 220;

export default function CurvesView() {
  return (
    <div className="flex flex-col flex-1 items-start w-full min-h-0 mt-0 pt-0">
      {/* Context Header Row */}
      <div className="flex items-center justify-between w-full mb-[24px]">
        <div className="flex items-center gap-[12px]">
          <h2 className="text-[20px] leading-[1.4] font-medium text-text-header font-[family-name:var(--font-title)]">
            Saturation Curves
          </h2>
          <span className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-full bg-container-sunken4 text-[13px] text-text-body">
            <span className="flex items-center justify-center size-[18px] rounded-full bg-input-border text-[10px] font-medium text-text-header">
              7
            </span>
            Brand
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="text-[13px] text-text-caption">⊕ Investment Source</span>
          <span className="text-[13px] text-text-caption">⊕ Marginal ROI</span>
          <button className="flex items-center gap-[6px] h-[36px] px-[12px] border border-input-border rounded-[8px] text-[13px] font-medium text-text-header bg-input-bg">
            <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3h12v1H2V3zm0 4h12v1H2V7zm0 4h8v1H2v-1z" />
            </svg>
            Chart Settings
          </button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="flex items-center justify-between w-full mb-[24px]">
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
        <div className="flex items-center gap-[16px]">
          <span className="text-[12px] text-text-caption">
            Scroll to zoom • Drag to pan • Double-click to reset
          </span>
          <span className="text-[13px] text-text-caption">Figures in millions</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col flex-1 min-h-0 w-full rounded-[8px] bg-chart-bg pt-[40px] px-[24px] pb-[20px]">
        {/* Top Legend Row */}
        <div className="flex items-center justify-center gap-[24px] w-full mb-[16px]">
          <div className="flex items-center gap-[6px]">
            <span className="size-[12px] rounded-none bg-chart-line-investment" />
            <span className="text-[12px] text-text-body">Marginal ROI</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="size-[12px] rounded-none bg-chart-line-contribution" />
            <span className="text-[12px] text-text-body">
              Driver Contribution – Sell-Out Volume (MUC)
            </span>
          </div>
        </div>

        {/* Chart with axes */}
        <div className="flex flex-1 w-full min-h-0">
          {/* Left Y-axis label */}
          <div className="flex items-center justify-center w-[20px] h-full min-h-[400px]">
            <span className="text-[11px] text-text-header -rotate-90 whitespace-nowrap">
              Driver Contribution – Sell-Out Volume (MUC)
            </span>
          </div>

          {/* Left Y-axis ticks */}
          <div className="flex flex-col justify-between w-[32px] h-full min-h-[400px] py-[4px] text-right pr-[4px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-[11px] text-text-caption leading-none">[x]</span>
            ))}
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative h-full min-h-[400px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Fill area below contribution curve */}
              <path
                d={contribFillPath}
                fill="var(--color-chart-line-contribution)"
                opacity="0.08"
              />

              {/* Prior Year vertical dashed line */}
              <line
                x1={priorX}
                y1={padY}
                x2={priorX}
                y2={chartHeight - padY}
                stroke="var(--color-input-border)"
                strokeWidth="2"
                strokeDasharray="8 4"
              />

              {/* Current vertical dashed line */}
              <line
                x1={currentX}
                y1={padY}
                x2={currentX}
                y2={chartHeight - padY}
                stroke="var(--color-input-border)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Marginal ROI curve (gold, decreasing) */}
              <path
                d={roiPath}
                fill="none"
                stroke="var(--color-chart-line-investment)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Contribution S-curve (aqua, rising) */}
              <path
                d={contribPath}
                fill="none"
                stroke="var(--color-chart-line-contribution)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Prior Year intercept markers (filled circles, 14px = r7) */}
              <circle cx={priorX} cy={roiPriorY} r="7" fill="var(--color-chart-line-investment)" />
              <circle cx={priorX} cy={contribPriorY} r="7" fill="var(--color-chart-line-contribution)" />

              {/* Current intercept markers (open circles, 8px = r4) */}
              <circle cx={currentX} cy={roiCurrentY} r="4" fill="none" stroke="var(--color-chart-line-investment)" strokeWidth="2" />
              <circle cx={currentX} cy={contribCurrentY} r="4" fill="none" stroke="var(--color-chart-line-contribution)" strokeWidth="2" />
            </svg>

            {/* Floating tooltip labels at Prior Year */}
            <div
              className="absolute flex items-center h-[22px] px-[8px] rounded-[4px] bg-chart-line-investment text-white text-[11px] font-medium"
              style={{ left: `${(priorX / chartWidth) * 100}%`, top: `${(roiPriorY / chartHeight) * 100}%`, transform: "translate(10px, -50%)" }}
            >
              £xx.xx
            </div>
            <div
              className="absolute flex items-center h-[22px] px-[8px] rounded-[4px] bg-chart-line-contribution text-white text-[11px] font-medium"
              style={{ left: `${(priorX / chartWidth) * 100}%`, top: `${(contribPriorY / chartHeight) * 100}%`, transform: "translate(10px, -50%)" }}
            >
              xx.xx MUC
            </div>
          </div>

          {/* Right Y-axis ticks */}
          <div className="flex flex-col justify-between w-[32px] h-full min-h-[400px] py-[4px] text-left pl-[4px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-[11px] text-text-caption leading-none">[x]</span>
            ))}
          </div>

          {/* Right Y-axis label */}
          <div className="flex items-center justify-center w-[20px] h-full min-h-[400px]">
            <span className="text-[11px] text-text-header rotate-90 whitespace-nowrap">
              Marginal ROI (Based on Sell-out Volume)
            </span>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex items-start w-full mt-[8px]">
          <div className="w-[52px]" />
          <div className="flex-1 flex justify-between px-[40px]">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="text-[11px] text-text-caption">[x]</span>
            ))}
          </div>
          <div className="w-[52px]" />
        </div>

        {/* X-axis title */}
        <div className="flex justify-center w-full mt-[8px]">
          <span className="text-[12px] text-text-body font-medium">Spend in £</span>
        </div>

        {/* Bottom Legend Panel */}
        <div className="grid grid-cols-3 gap-[24px] w-full mt-[16px] pt-[16px] border-t border-input-border">
          {/* Prior Year */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[8px]">
              <span className="w-[16px] h-[2px] border-t-2 border-dashed border-text-caption" />
              <span className="text-[12px] font-medium text-text-header">Prior Year [Time period]</span>
            </div>
            <span className="text-[12px] text-text-body">£[x] Spend</span>
            <span className="text-[12px] text-text-body">[x] [Metric]</span>
            <span className="text-[12px] text-text-body">[x] [Metric] per £ invested</span>
          </div>

          {/* Current */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[8px]">
              <span className="w-[16px] h-[2px] border-t-2 border-dotted border-text-caption" />
              <span className="text-[12px] font-medium text-text-header">Current [Time period]</span>
            </div>
            <span className="text-[12px] text-text-body">£[x] Spend</span>
            <span className="text-[12px] text-text-body">[x] [Metric]</span>
            <span className="text-[12px] text-text-body">[x] [Metric] per £ invested</span>
          </div>

          {/* Legend Keys */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[8px]">
              <span className="w-[16px] h-[2px] bg-chart-line-investment" />
              <span className="text-[12px] text-text-body">Marginal ROI (Based on Sell-out Volume)</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="w-[16px] h-[2px] bg-chart-line-contribution" />
              <span className="text-[12px] text-text-body">Sell-out Volume</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <svg className="w-[16px] h-[8px]" viewBox="0 0 16 8">
                <line x1="0" y1="4" x2="5" y2="4" stroke="var(--color-chart-line-contribution)" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="8" cy="4" r="3" fill="none" stroke="var(--color-chart-line-contribution)" strokeWidth="1.5" />
                <line x1="11" y1="4" x2="16" y2="4" stroke="var(--color-chart-line-contribution)" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>
              <span className="text-[12px] text-text-body">Point of diminishing return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
