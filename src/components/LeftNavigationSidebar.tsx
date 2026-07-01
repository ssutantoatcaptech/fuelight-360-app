import { useState } from "react";
import { useTheme } from "../ThemeContext";
import Icon from "./ui/Icon";

const recentScenarios = [
  { label: "Coca-Cola Brands High Inflation", active: true, icon: "scenario" },
  { label: "Coca-Cola Brands Low Inflation", active: false, icon: "loader" },
  { label: "Sprite Holiday 2025", active: false, icon: "scenario", hasNotification: true },
  { label: "Coke Zero Q126 Spring Campaign", active: false, icon: "scenario" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function LeftNavigationSidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const { theme: themeMode, setTheme: setThemeMode } = useTheme();

  return (
    <div className="flex h-full w-full flex-col gap-[24px] items-center px-0 py-[24px] overflow-hidden">
      {/* Top section */}
      <div className="flex flex-1 min-h-0 flex-col gap-0 items-start w-full">
        {/* Logo + Drawer Toggle */}
        <div className="flex flex-col gap-0 items-center w-full shrink-0">
          {/* Logo */}
          <div className="flex items-center justify-center w-full pb-0">
            <div className="flex items-center justify-center size-[40px]">
              <div className="relative size-[31.5px]">
                <div className="absolute h-[20px] w-[20px] rounded-full bg-tccc-orange-600 opacity-90" style={{ top: 0, left: 0 }} />
                <div className="absolute h-[20px] w-[20px] rounded-full bg-brand-primary opacity-90" style={{ bottom: 0, right: 0 }} />
              </div>
            </div>
          </div>
          {/* Drawer toggle — clickable strip */}
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-end gap-[4px] h-[40px] w-full px-[2px] py-[8px] rounded-[4px] cursor-pointer"
          >
            <svg
              className={`w-[26px] h-[10px] text-sidebar-icon transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              viewBox="0 0 26 10"
              fill="currentColor"
            >
              <path d="M16 5l-6-4v8l6-4z" />
            </svg>
            <div className="w-[3px] h-full rounded-full bg-sidebar-icon" />
          </button>
        </div>

        {/* Menu sections */}
        <div className={`flex flex-1 min-h-0 flex-col gap-[16px] items-center w-full ${collapsed ? "px-[8px]" : "px-[16px]"}`}>
          {/* Top menu */}
          <div className="flex flex-col gap-[8px] items-center w-full pb-[16px] border-b border-sidebar-border">
            <SidebarItem label="Launchpad" icon="plus" collapsed={collapsed} />
            <SidebarItem label="My Scenarios" icon="folder" collapsed={collapsed} />
          </div>

          {/* Recent items */}
          <div className="flex flex-1 min-h-0 flex-col gap-[8px] items-center w-full">
            {recentScenarios.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedScenario(i)}
                className={`flex h-[40px] w-full items-center rounded-[8px] relative ${
                  collapsed ? "justify-center px-[8px]" : "gap-[8px] px-[8px]"
                } ${
                  selectedScenario === i
                    ? "bg-sidebar-item-selected"
                    : "bg-sidebar-bg hover:bg-sidebar-item-selected/30"
                }`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center size-[24px] shrink-0 relative">
                  {s.icon === "spinner" ? (
                    <Icon name="loader" size={16} className={`animate-spin ${selectedScenario === i ? "text-white" : "text-sidebar-icon"}`} />
                  ) : (
                    <Icon name="scenario" size={19.5} className={selectedScenario === i ? "text-white" : "text-sidebar-icon"} />
                  )}
                  {s.hasNotification && (
                    <div className="absolute top-[-2px] right-[-2px] size-[8px] rounded-[4px] bg-brand-primary" />
                  )}
                </div>
                {/* Label */}
                {!collapsed && (
                  <span className={`flex-1 min-w-0 text-[14px] leading-[1.4] truncate ${
                    selectedScenario === i ? "text-sidebar-text-selected" : "text-sidebar-text"
                  }`}>
                    {s.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom options */}
      <div className={`flex flex-col gap-[4px] items-center w-full shrink-0 ${collapsed ? "px-[8px]" : "px-[16px]"}`}>
        <SidebarItem label="Nexus AI" icon="nexus-ai" badge="New" collapsed={collapsed} />
        <SidebarItem label="Fuelight Handbook" icon="help" collapsed={collapsed} />
        <SidebarItem label="Release Notes" icon="notification" collapsed={collapsed} />
        <SidebarItem label="Feedback & Support" icon="feedback" collapsed={collapsed} />
      </div>

      {/* Mode toggle */}
      {collapsed ? (
        <div className="flex flex-col gap-[4px] items-center w-full px-[8px] shrink-0">
          <button
            onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
            className="flex items-center justify-center size-[40px] rounded-[8px]"
          >
            <ModeIcon mode={themeMode} />
          </button>
        </div>
      ) : (
        <div className="flex gap-[2px] items-center h-[40px] w-[288px] p-[2px] rounded-[10px] bg-sidebar-toggle-bg shrink-0">
          {(["light", "dark", "auto"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setThemeMode(mode)}
              className={`flex flex-1 items-center justify-center gap-[8px] h-[36px] min-w-[80px] px-[12px] rounded-[8px] text-[14px] leading-none capitalize text-sidebar-text ${
                themeMode === mode
                  ? "bg-sidebar-toggle-active shadow-sm"
                  : ""
              }`}
            >
              <ModeIcon mode={mode} />
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* User profile */}
      {collapsed ? (
        <div className="flex items-center justify-center w-full shrink-0">
          <div className="relative size-[32px] rounded-full bg-sidebar-item-selected shrink-0">
            <div className="absolute top-[-2px] left-[22px] size-[12px] rounded-full bg-success border border-sidebar-bg" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-[24px] w-full shrink-0">
          <div className="flex gap-[16px] items-center w-[173px]">
            {/* Avatar */}
            <div className="relative size-[32px] rounded-full bg-sidebar-item-selected shrink-0">
              <div className="absolute top-[-2px] left-[22px] size-[12px] rounded-full bg-success border border-sidebar-bg" />
            </div>
            {/* Name */}
            <div className="flex flex-col items-start">
              <span className="text-[12px] leading-[1.4] text-input-border truncate">Firstname Lastname</span>
              <span className="text-[12px] leading-[1.6] text-sidebar-text truncate">Position Title</span>
            </div>
          </div>
          {/* Menu icon */}
          <div className="flex items-center justify-center size-[20px]">
            <Icon name="ellipsis-horiz" size={16.5} className="text-sidebar-icon" />
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ label, icon, badge, collapsed }: { label: string; icon?: string; badge?: string; collapsed?: boolean }) {
  return (
    <div className={`flex h-[40px] w-full items-center rounded-[8px] bg-sidebar-bg ${
      collapsed ? "justify-center px-[8px]" : "gap-[8px] px-[8px]"
    }`}>
      <div className="flex items-center justify-center size-[24px] shrink-0">
        {icon ? (
          <Icon name={icon} size={19.5} className="text-sidebar-icon" />
        ) : (
          <svg className="size-[19.5px] text-sidebar-icon" viewBox="0 0 20 20" fill="currentColor">
            <rect x="3" y="3" width="14" height="14" rx="2" opacity="0.6" />
          </svg>
        )}
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 min-w-0 text-[14px] leading-[1.4] text-sidebar-text truncate">
            {label}
          </span>
          {badge && (
            <div className="flex items-center justify-center h-[20px] min-w-[20px] px-[8px] rounded-[4px] bg-brand-primary">
              <span className="text-[10px] leading-[1.6] text-brand-primary-dim-low text-center whitespace-nowrap">
                {badge}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ModeIcon({ mode }: { mode: "light" | "dark" | "auto" }) {
  return (
    <svg className="size-[16px] shrink-0 text-sidebar-icon" viewBox="0 0 16 16" fill="currentColor">
      {mode === "light" && (
        <path d="M8 1a1 1 0 011 1v1a1 1 0 01-2 0V2a1 1 0 011-1zm0 10a3 3 0 100-6 3 3 0 000 6zm0 2a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM1 8a1 1 0 011-1h1a1 1 0 010 2H2a1 1 0 01-1-1zm10 0a1 1 0 011-1h1a1 1 0 010 2h-1a1 1 0 01-1-1z" />
      )}
      {mode === "dark" && (
        <path d="M7.5 1.5a6.5 6.5 0 107 7 5 5 0 01-7-7z" />
      )}
      {mode === "auto" && (
        <path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 4v8a4 4 0 000-8z" />
      )}
    </svg>
  );
}
