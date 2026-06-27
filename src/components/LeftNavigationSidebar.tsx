import { useState } from "react";

const scenarios = [
  { label: "Coca-Cola Brands High Inflation", active: true },
  { label: "Coca-Cola Brands Low Inflation", active: false },
  { label: "Sprite Holiday 2025", active: false },
  { label: "Coke Zero Q126 Spring Campaign", active: false },
];

const secondaryLinks = [
  { label: "Nexus AI", badge: "New" },
  { label: "New Fuelight Handbook", badge: null },
  { label: "Release Notes", badge: null },
  { label: "Feedback & Support", badge: null },
];

export default function LeftNavigationSidebar() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [scenariosOpen, setScenariosOpen] = useState(true);
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "auto">("auto");

  return (
    <div className="flex h-full w-full flex-col justify-between px-[var(--spacing-sidebar-h-md)] py-[var(--spacing-sidebar-v-xl)]">
      {/* Top Section */}
      <div className="flex flex-col gap-[var(--spacing-sidebar-v-xl)]">
        {/* Branding Icon */}
        <div className="flex items-center px-[var(--spacing-sidebar-h-lg)]">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute h-5 w-5 rounded-full bg-tccc-orange-600 opacity-80" style={{ top: 2, left: 2 }} />
            <div className="absolute h-5 w-5 rounded-full bg-brand-primary opacity-80" style={{ bottom: 2, right: 2 }} />
          </div>
        </div>

        {/* Primary Nav */}
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            className="flex h-[var(--size-sidebar-item)] w-full items-center rounded-[var(--radius-sidebar)] px-[var(--spacing-sidebar-h-lg)] text-left text-sm text-text-caption hover:bg-sidebar-hover"
          >
            Launchpad
          </button>
          <button
            type="button"
            onClick={() => setScenariosOpen(!scenariosOpen)}
            className="flex h-[var(--size-sidebar-item)] w-full items-center justify-between rounded-[var(--radius-sidebar)] px-[var(--spacing-sidebar-h-lg)] text-left text-sm font-medium text-text-header hover:bg-sidebar-hover"
          >
            <span className="flex items-center gap-2">
              <svg
                className={`h-3 w-3 transition-transform ${scenariosOpen ? "rotate-90" : ""}`}
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M4.5 2l4 4-4 4" />
              </svg>
              My Scenarios
            </span>
            <div className="h-4 w-8 rounded-full bg-brand-primary p-0.5">
              <div className="ml-auto h-3 w-3 rounded-full bg-white" />
            </div>
          </button>
        </div>

        {/* Scenario Sub-Group */}
        {scenariosOpen && (
          <ul className="flex flex-col gap-0.5 pl-[var(--spacing-sidebar-h-lg)]">
            {scenarios.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSelectedScenario(i)}
                  className={`flex h-[var(--size-sidebar-item)] w-full items-center justify-between rounded-[var(--radius-sidebar)] px-[var(--spacing-sidebar-h-lg)] text-left text-sm transition-colors ${
                    selectedScenario === i
                      ? "bg-sidebar-selected font-medium text-white"
                      : "text-text-caption hover:bg-sidebar-hover"
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {selectedScenario !== i && (
                    <span className="h-3.5 w-3.5 flex-shrink-0 rounded-sm border border-sidebar-border" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-[var(--spacing-sidebar-v-md)]">
        {/* Secondary Links */}
        <div className="flex flex-col gap-0.5 border-t border-sidebar-border pt-[var(--spacing-sidebar-v-md)]">
          {secondaryLinks.map((link, i) => (
            <button
              key={i}
              type="button"
              className="flex h-[var(--size-sidebar-item)] w-full items-center justify-between rounded-[var(--radius-sidebar)] px-[var(--spacing-sidebar-h-lg)] text-left text-sm text-text-caption hover:bg-sidebar-hover"
            >
              {link.label}
              {link.badge && (
                <span className="rounded bg-brand-primary-lit px-1.5 py-0.5 text-[10px] font-semibold text-brand-primary-dim-low">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="border-t border-sidebar-border pt-[var(--spacing-sidebar-v-md)]">
          <div className="flex overflow-hidden rounded-[var(--radius-sidebar)] bg-container-sunken1">
            {(["light", "dark", "auto"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setThemeMode(mode)}
                className={`flex-1 py-1.5 text-center text-xs font-medium capitalize transition-colors ${
                  themeMode === mode
                    ? "bg-container-sunken3 text-text-header"
                    : "text-text-disabled hover:text-text-caption"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-3 border-t border-sidebar-border px-[var(--spacing-sidebar-h-md)] pt-[var(--spacing-sidebar-v-md)]">
          <div className="h-8 w-8 rounded-full bg-container-sunken3" />
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-medium text-text-header">Firstname Lastname</span>
            <span className="text-[10px] text-text-disabled">Position Title</span>
          </div>
          <button type="button" className="text-text-disabled hover:text-text-caption">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="3" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="13" r="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
