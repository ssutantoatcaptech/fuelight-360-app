const brands = [
  "Coca-Cola",
  "Coca-Cola Zero",
  "Dr. Pepper",
  "Diet Dr. Pepper",
  "Fanta",
  "Fanta Zero",
  "Schweppes",
  "Sprite",
  "Sprite Zero",
];

const roiValues = [2.63, 1.53, 2.45, 1.23, 0.73, 1.02, 2.18, 1.86, 1.19];

const investmentData = [1.85, 2.05, 1.45, 1.2, 1.3, 1.25, 1.35, 1.3, 1.3];
const contributionData = [1.9, 1.95, 1.9, 1.55, 1.55, 1.55, 1.55, 1.55, 1.55];

const yTicks = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
const maxY = 3.0;

const breadcrumbs = ["Activation Drivers", "Consumer (Paid)", "Digital Media", "Social"];

export default function ComparisonView() {
  return (
    <div className="flex flex-col flex-1 w-full min-h-0">
      {/* Row 1: Context Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[12px]">
          <span className="text-[20px] font-medium text-text-header font-[family-name:var(--font-title)]">
            Scenario Comparison
          </span>
          <span className="h-[28px] px-[12px] rounded-full bg-container-sunken4 text-[13px] font-medium text-text-body flex items-center">
            7 Brand
          </span>
        </div>
        <div className="flex items-center gap-[12px]">
          <button className="flex items-center gap-[6px] h-[36px] px-[12px] border border-input-border rounded-[8px] text-[13px] font-medium text-text-header bg-input-bg">
            <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a1 1 0 011 1v1.07a5.97 5.97 0 012.18.9l.76-.75a1 1 0 011.41 1.41l-.75.76c.44.66.75 1.4.9 2.18H14.6a1 1 0 110 2H13.5a5.97 5.97 0 01-.9 2.18l.75.76a1 1 0 01-1.41 1.41l-.76-.75a5.97 5.97 0 01-2.18.9V14.6a1 1 0 11-2 0V13.5a5.97 5.97 0 01-2.18-.9l-.76.75a1 1 0 01-1.41-1.41l.75-.76A5.97 5.97 0 012.5 9H1.4a1 1 0 110-2H2.5a5.97 5.97 0 01.9-2.18l-.75-.76a1 1 0 011.41-1.41l.76.75A5.97 5.97 0 017 2.5V1.4A1 1 0 018 0zm0 5a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            Chart Settings
          </button>
        </div>
      </div>

      {/* Row 2: Breadcrumb Row */}
      <div className="flex items-center justify-between w-full py-[8px]">
        <div className="flex items-center">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`text-[13px] ${
                  i === breadcrumbs.length - 1
                    ? "font-medium text-text-header"
                    : "text-text-caption"
                }`}
              >
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span className="text-[13px] text-text-caption mx-[4px]">&gt;</span>
              )}
            </span>
          ))}
        </div>
        <span className="text-[13px] text-text-caption">Figures in millions</span>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col flex-1 min-h-0 w-full bg-chart-bg rounded-[8px] pt-[40px] px-[24px] pb-[20px] mt-[16px]">
      {/* Legend row */}
      <div className="flex items-center justify-center gap-[24px] mb-[24px]">
        <div className="flex items-center gap-[6px]">
          <span className="w-[12px] h-[12px] bg-chart-comparison-investment" />
          <span className="text-[12px] text-text-body font-['Avenir_Next']">
            Driver Input – Investment ($M)
          </span>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="w-[12px] h-[12px] bg-chart-comparison-contribution" />
          <span className="text-[12px] text-text-body font-['Avenir_Next']">
            Driver Contribution – Sell-Out Volume (MUC)
          </span>
        </div>
      </div>

      {/* ROI values row */}
      <div className="flex w-full mb-[8px]">
        <div className="w-[60px]" />
        <div
          className="flex-1 grid"
          style={{ gridTemplateColumns: `repeat(${brands.length}, 1fr)` }}
        >
          {roiValues.map((val, i) => (
            <div
              key={i}
              className="text-center text-[12px] font-semibold text-text-body"
            >
              {val.toFixed(2)}
            </div>
          ))}
        </div>
        <div className="w-[60px]" />
      </div>

      {/* Chart area with dual Y-axes */}
      <div className="flex flex-1 w-full min-h-0">
        {/* Left Y-axis label (rotated) */}
        <div className="flex flex-col items-center justify-center w-[20px]">
          <span className="text-[12px] text-text-header font-['Avenir_Next'] whitespace-nowrap -rotate-90">
            Driver Input – Investment ($M)
          </span>
        </div>

        {/* Left Y-axis tick values */}
        <div className="flex flex-col justify-between w-[40px] min-h-[320px] py-0 text-right pr-[8px]">
          {[...yTicks].reverse().map((tick) => (
            <span
              key={tick}
              className="text-[11px] text-text-caption font-['Avenir_Next'] leading-none"
            >
              {tick.toFixed(1)}
            </span>
          ))}
        </div>

        {/* Chart bars area */}
        <div className="flex-1 relative min-h-[320px]">
          {/* Horizontal grid lines */}
          {yTicks.map((tick) => (
            <div
              key={tick}
              className="absolute left-0 right-0 border-t border-dashed border-chart-divider"
              style={{ bottom: `${(tick / maxY) * 100}%` }}
            />
          ))}

          {/* Bar groups */}
          <div
            className="absolute inset-0 flex items-end justify-around"
            style={{ gap: "16px", padding: "0 8px" }}
          >
            {brands.map((_, i) => (
              <div
                key={i}
                className="flex items-end justify-center gap-[2px] h-full flex-1"
              >
                {/* Investment bar */}
                <div
                  className="relative flex items-end justify-center bg-chart-comparison-investment"
                  style={{
                    width: "32px",
                    height: `${(investmentData[i] / maxY) * 100}%`,
                  }}
                >
                  <span className="absolute bottom-[8px] text-[11px] font-medium text-white">
                    {investmentData[i].toFixed(1)}M
                  </span>
                </div>
                {/* Contribution bar */}
                <div
                  className="relative flex items-end justify-center bg-chart-comparison-contribution"
                  style={{
                    width: "32px",
                    height: `${(contributionData[i] / maxY) * 100}%`,
                  }}
                >
                  <span className="absolute bottom-[8px] text-[11px] font-medium text-white">
                    {contributionData[i].toFixed(1)}M
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Y-axis tick values */}
        <div className="flex flex-col justify-between w-[40px] min-h-[320px] py-0 text-left pl-[8px]">
          {[...yTicks].reverse().map((tick) => (
            <span
              key={tick}
              className="text-[11px] text-text-caption font-['Avenir_Next'] leading-none"
            >
              {tick.toFixed(1)}
            </span>
          ))}
        </div>

        {/* Right Y-axis label (rotated) */}
        <div className="flex flex-col items-center justify-center w-[20px]">
          <span className="text-[12px] text-text-header font-['Avenir_Next'] whitespace-nowrap rotate-90">
            Driver Contribution – Sell-Out Volume (MUC)
          </span>
        </div>
      </div>

      {/* X-axis brand labels */}
      <div className="flex w-full mt-[12px]">
        <div className="w-[60px]" />
        <div
          className="flex-1 grid"
          style={{ gridTemplateColumns: `repeat(${brands.length}, 1fr)` }}
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              className="text-center text-[14px] font-semibold text-text-body px-[2px]"
            >
              {brand}
            </div>
          ))}
        </div>
        <div className="w-[60px]" />
      </div>
      </div>
    </div>
  );
}
