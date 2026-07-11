import Icon from "./ui/Icon";

interface LaunchCard {
  icon: string; // approved Icon name
  title: string;
  description: string;
}

const PRIMARY_CARDS: LaunchCard[] = [
  {
    icon: "logo-360",
    title: "Market",
    description:
      "Evaluate and optimize holistically across brands and activations types on system level.",
  },
  {
    icon: "logo-cxp",
    title: "Channel x Customer x Pack",
    description:
      "Evaluate and optimize customer x pack-level performance across retail media, promo, and executions.",
  },
  {
    icon: "logo-media",
    title: "Media",
    description:
      "Optimize media spend and evaluate performance across sub-channels.",
  },
];

const SUPPORTING_CARDS: LaunchCard[] = [
  {
    icon: "logo-data-quality",
    title: "Data Quality",
    description:
      "Evaluate data quality for e.g., monthly refreshes by validating completion, compliance and stability.",
  },
  {
    icon: "logo-model-observer",
    title: "Model Observer",
    description:
      "Assess model output quality, including statistical validation and face-validity checks.",
  },
];

interface Props {
  username?: string;
  onLaunch?: (title: string) => void;
}

export default function LaunchpadView({
  username = "[username]",
  onLaunch,
}: Props) {
  return (
    <div className="flex w-full max-w-[1136px] flex-col items-center gap-[80px]">
      {/* TCCCRainbowAngled gradient (135deg) — shared def for card icons */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="tccc-rainbow-angled" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-rainbow-stop-1)" />
            <stop offset="33%" stopColor="var(--color-rainbow-stop-2)" />
            <stop offset="66%" stopColor="var(--color-rainbow-stop-3)" />
            <stop offset="100%" stopColor="var(--color-rainbow-stop-4)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Welcome header */}
      <div className="flex flex-col items-center gap-[16px] text-center">
        <h1 className="text-[30px] font-medium leading-[1.4] text-text-header font-[family-name:var(--font-title)]">
          Welcome back, {username}.
        </h1>
        <p className="text-[20px] leading-[1.6] text-text-body">
          Insights to evaluate and optimize your investments.
        </p>
      </div>

      {/* Primary card row */}
      <CardRow cards={PRIMARY_CARDS} onLaunch={onLaunch} />

      {/* Supporting Tools */}
      <div className="flex w-full flex-col items-center gap-[32px]">
        <h2 className="text-[20px] font-medium leading-[1.4] text-text-header font-[family-name:var(--font-title)]">
          Supporting Tools
        </h2>
        <CardRow cards={SUPPORTING_CARDS} centered onLaunch={onLaunch} />
      </div>
    </div>
  );
}

function CardRow({
  cards,
  centered = false,
  onLaunch,
}: {
  cards: LaunchCard[];
  centered?: boolean;
  onLaunch?: (title: string) => void;
}) {
  return (
    <div
      className={`flex w-full items-stretch gap-[16px] ${
        centered ? "justify-center" : ""
      }`}
    >
      {cards.map((card) => (
        <LaunchpadCard key={card.title} card={card} onLaunch={onLaunch} />
      ))}
    </div>
  );
}

function LaunchpadCard({
  card,
  onLaunch,
}: {
  card: LaunchCard;
  onLaunch?: (title: string) => void;
}) {
  return (
    <div className="flex min-w-px flex-1 max-w-[368px] flex-col items-center justify-between gap-[16px] rounded-[16px] bg-container-sunken4 px-[32px] py-[32px]">
      <div className="flex w-full flex-col items-center gap-[16px]">
        <Icon name={card.icon} size={40} gradientId="tccc-rainbow-angled" />
        <div className="flex w-full flex-col items-center gap-[8px] text-center">
          <p className="text-[20px] font-medium leading-[1.4] text-text-header font-[family-name:var(--font-title)]">
            {card.title}
          </p>
          <p className="text-[14px] leading-[1.6] text-text-body">
            {card.description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onLaunch?.(card.title)}
        className="flex items-center justify-center gap-[8px] border-0 bg-transparent text-[14px] leading-none text-text-caption hover:text-text-header"
      >
        Launch
        <svg
          className="size-[20px] shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 10h11M11 6l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}
