const segments = [
  {
    title: "Base",
    bars: [
      { label: "Constant sales\nand other factors", value: 0.8, type: "baseline" as const },
    ],
  },
  {
    title: "In Store",
    bars: [
      { label: "Weather", value: 0.12, type: "positive" as const },
      { label: "Macro-\neconomics", value: -0.15, type: "negative" as const },
      { label: "Holidays", value: 0.08, type: "positive" as const },
      { label: "Competitor\nMedia", value: -0.06, type: "negative" as const },
      { label: "Competitor\nExecution", value: -0.10, type: "negative" as const },
      { label: "Outlet\nExecution", value: 0.10, type: "positive" as const },
      { label: "Distribution", value: -0.08, type: "negative" as const },
      { label: "Pricing", value: -0.12, type: "negative" as const },
    ],
  },
  {
    title: "Activation",
    bars: [
      { label: "Customer", value: 0.55, type: "positive" as const },
      { label: "Consumer\n(Paid)", value: 0.70, type: "positive" as const },
      { label: "Consumer\n(Owned)", value: 0.85, type: "positive" as const },
    ],
  },
];

const finalBar = { label: "2025", value: 2.69 };
const maxValue = 3.2;
const yAxisSteps = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

const breadcrumbs = ["Activation Drivers", "Consumer (Paid)", "Digital Media", "Social"];

interface BarPosition {
  label: string;
  value: number;
  type: "baseline" | "positive" | "negative";
  bottom: number;
  top: number;
  segment: number;
}

function computeBarPositions(): BarPosition[] {
  let runningTotal = 0;
  const allBars: BarPosition[] = [];

  segments.forEach((seg, si) => {
    seg.bars.forEach((bar) => {
      const height = Math.abs(bar.value) / maxValue * 100;
      let bottom: number;

      if (bar.type === "baseline") {
        bottom = 0;
        runningTotal = bar.value;
      } else if (bar.type === "positive") {
        bottom = (runningTotal / maxValue) * 100;
        runningTotal += bar.value;
      } else {
        runningTotal -= Math.abs(bar.value);
        bottom = (runningTotal / maxValue) * 100;
      }

      allBars.push({ label: bar.label, value: bar.value, type: bar.type, bottom, top: bottom + height, segment: si });
    });
  });

  return allBars;
}

const barPositions = computeBarPositions();

function ConnectingLines({ bars }: { bars: BarPosition[] }) {
  const lines: { y: number; x1: number; x2: number }[] = [];
  const totalBars = bars.length;

  for (let i = 0; i < totalBars - 1; i++) {
    const current = bars[i];
    const yPct = current.type === "negative" ? current.bottom : current.top;
    const x1Pct = ((i + 0.8) / totalBars) * 100;
    const x2Pct = ((i + 1.2) / totalBars) * 100;
    lines.push({ y: yPct, x1: x1Pct, x2: x2Pct });
  }

  return (
    <>
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute h-[1px] bg-chart-divider"
          style={{
            bottom: `${line.y}%`,
            left: `${line.x1}%`,
            width: `${line.x2 - line.x1}%`,
          }}
        />
      ))}
    </>
  );
}

export default function WaterfallView() {
  const inStoreBars = barPositions.filter((b) => b.segment === 1);
  const activationBars = barPositions.filter((b) => b.segment === 2);

  return (
    <div className="flex flex-col flex-1 gap-0 items-start w-full min-h-0 mt-0 pt-0 rounded-none">
      {/* Row 1: Primary Context Line */}
      <div className="flex items-center justify-between w-full mt-0 pt-0 rounded-none">
        <div className="flex items-center">
          <span className="text-[20px] font-medium text-text-header font-[family-name:var(--font-title)]">
            All Drivers
          </span>
          <span className="ml-[12px] h-[28px] px-[12px] rounded-full bg-container-sunken4 text-[13px] font-medium text-text-body flex items-center">
            7 Brand
          </span>
        </div>
        <button className="flex items-center gap-[6px] h-[36px] px-[12px] border border-input-border rounded-[8px] text-[13px] font-medium text-text-header bg-input-bg">
          <svg className="size-[14px]" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a1 1 0 011 1v1.07a5.97 5.97 0 012.18.9l.76-.75a1 1 0 011.41 1.41l-.75.76c.44.66.75 1.4.9 2.18H14.6a1 1 0 110 2H13.5a5.97 5.97 0 01-.9 2.18l.75.76a1 1 0 01-1.41 1.41l-.76-.75a5.97 5.97 0 01-2.18.9V14.6a1 1 0 11-2 0V13.5a5.97 5.97 0 01-2.18-.9l-.76.75a1 1 0 01-1.41-1.41l.75-.76A5.97 5.97 0 012.5 9H1.4a1 1 0 110-2H2.5a5.97 5.97 0 01.9-2.18l-.75-.76a1 1 0 011.41-1.41l.76.75A5.97 5.97 0 017 2.5V1.4A1 1 0 018 0zm0 5a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
          Chart Settings
        </button>
      </div>

      {/* Row 2: Performance Summary Strip */}
      <div className="flex items-center gap-[12px] w-full py-[8px] mt-0 rounded-none">
        <span className="text-[14px] text-text-body">Total Sell-out Volume</span>
        <span className="text-[14px] font-bold text-text-header">XX.XX MUC</span>
        <span className="text-[13px] font-medium text-success">+0.0% vs. Prior Year</span>
      </div>

      {/* Row 3: Breadcrumb Row */}
      <div className="flex items-center justify-between w-full py-[4px] mt-0 rounded-none">
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

      {/* Chart Viewport */}
      <div className="flex flex-1 min-h-0 w-full mt-[16px] rounded-none bg-chart-bg p-[24px]">
        {/* Y-Axis rotated label */}
        <div className="flex items-center justify-center w-[24px] shrink-0">
          <span className="text-[10px] text-text-caption -rotate-90 whitespace-nowrap">
            Sell-Out Volume (MUC)
          </span>
        </div>

        {/* Y-Axis values */}
        <div className="flex flex-col justify-between items-end pr-[12px] shrink-0 w-[48px]">
          {[...yAxisSteps].reverse().map((step, i) => (
            <span key={i} className="text-[11px] leading-[1] text-text-caption whitespace-nowrap">
              {step.toFixed(2)}M
            </span>
          ))}
        </div>

        {/* Main plot area */}
        <div className="flex flex-1 flex-col min-h-0 rounded-none overflow-visible">
          {/* Segment headers */}
          <div className="flex w-full pb-[12px]">
            {segments.map((seg, si) => (
              <div
                key={si}
                className={`text-center text-[16px] font-medium text-text-header font-[family-name:var(--font-title)] ${
                  si === 0 ? "flex-[1]" : si === 1 ? "flex-[8]" : "flex-[3]"
                } ${si < segments.length - 1 ? "border-r border-chart-divider" : ""}`}
              >
                {seg.title}
              </div>
            ))}
            <div className="w-[56px] shrink-0" />
          </div>

          {/* Plot grid + bars */}
          <div className="relative flex flex-1 w-full min-h-[280px] rounded-none">
            {/* Grid lines */}
            {yAxisSteps.map((step, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-[1px] bg-chart-divider opacity-40"
                style={{ bottom: `${(step / maxValue) * 100}%` }}
              />
            ))}

            {/* Segment: Base */}
            <div className="flex flex-[1] items-end relative border-r border-chart-divider px-[12px]">
              {barPositions
                .filter((b) => b.segment === 0)
                .map((bar, i) => (
                  <div key={i} className="flex-1 relative h-full">
                    <div
                      className="absolute inset-x-[4px] rounded-none bg-chart-bar-baseline"
                      style={{ height: `${bar.top - bar.bottom}%`, bottom: `${bar.bottom}%` }}
                    />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold text-text-caption whitespace-nowrap"
                      style={{ bottom: `${bar.top}%`, marginBottom: "4px" }}
                    >
                      0.80
                    </span>
                  </div>
                ))}
            </div>

            {/* Segment: In Store */}
            <div className="flex flex-[8] items-end relative border-r border-chart-divider px-[12px] gap-[8px]">
              <ConnectingLines bars={inStoreBars} />
              {inStoreBars.map((bar, i) => (
                <div key={i} className="flex-1 relative h-full">
                  <div
                    className={`absolute inset-x-[2px] rounded-none ${
                      bar.type === "positive" ? "bg-success" : "bg-chart-bar-negative"
                    }`}
                    style={{ height: `${bar.top - bar.bottom}%`, bottom: `${bar.bottom}%` }}
                  />
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold whitespace-nowrap ${
                      bar.type === "positive" ? "text-success" : "text-error"
                    }`}
                    style={{ bottom: `${bar.top}%`, marginBottom: "4px" }}
                  >
                    {bar.type === "positive" ? "+" : "-"}{Math.abs(bar.value).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Segment: Activation */}
            <div className="flex flex-[3] items-end relative px-[12px] gap-[8px]">
              <ConnectingLines bars={activationBars} />
              {activationBars.map((bar, i) => (
                <div key={i} className="flex-1 relative h-full">
                  <div
                    className="absolute inset-x-[2px] rounded-none bg-success"
                    style={{ height: `${bar.top - bar.bottom}%`, bottom: `${bar.bottom}%` }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold text-success whitespace-nowrap"
                    style={{ bottom: `${bar.top}%`, marginBottom: "4px" }}
                  >
                    +{Math.abs(bar.value).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Final: 2025 summary pillar */}
            <div className="w-[56px] shrink-0 relative">
              <div
                className="absolute inset-x-[8px] rounded-none bg-chart-bar-baseline"
                style={{ height: `${(finalBar.value / maxValue) * 100}%`, bottom: "0%" }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold text-text-caption whitespace-nowrap"
                style={{ bottom: `${(finalBar.value / maxValue) * 100}%`, marginBottom: "4px" }}
              >
                {finalBar.value.toFixed(2)}
              </span>
            </div>
          </div>

          {/* X-Axis labels */}
          <div className="flex w-full pt-[8px]">
            <div className="flex flex-[1] px-[12px] border-r border-chart-divider">
              {segments[0].bars.map((bar, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-[10px] leading-[1.3] text-text-caption whitespace-pre-line">{bar.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-[8] px-[12px] gap-[8px] border-r border-chart-divider">
              {segments[1].bars.map((bar, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-[10px] leading-[1.3] text-text-caption whitespace-pre-line">{bar.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-[3] px-[12px] gap-[8px]">
              {segments[2].bars.map((bar, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-[10px] leading-[1.3] text-text-caption whitespace-pre-line">{bar.label}</span>
                </div>
              ))}
            </div>
            <div className="w-[56px] shrink-0 text-center">
              <span className="text-[10px] leading-[1.3] text-text-caption">2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
