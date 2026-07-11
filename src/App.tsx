import { useState } from "react";
import LeftNavigationSidebar from "./components/LeftNavigationSidebar";
import ScenarioControlStrip from "./components/ScenarioControlStrip";
import MetaFilterCapsuleRow from "./components/MetaFilterCapsuleRow";
import ViewNavigationLayer from "./components/ViewNavigationLayer";
import BusinessPerformanceSection from "./components/BusinessPerformanceSection";
import BrandPerformanceSnapshot from "./components/BrandPerformanceSnapshot";
import WaterfallView from "./components/WaterfallView";
import ComparisonView from "./components/ComparisonView";
import TrendsView from "./components/TrendsView";
import CurvesView from "./components/CurvesView";
import DetailsView from "./components/DetailsView";
import GlobalEditView from "./components/GlobalEditView";
import LaunchpadView from "./components/LaunchpadView";

export default function App() {
  const [page, setPage] = useState<"launchpad" | "scenario">("launchpad");
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "optimize">("view");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden font-[family-name:var(--font-body)]">
      {/* Sidebar */}
      <aside
        className="flex h-screen flex-shrink-0 flex-col bg-sidebar-bg border-r border-sidebar-border transition-[width] duration-300 overflow-hidden"
        style={{ width: sidebarCollapsed ? "64px" : "320px" }}
      >
        <LeftNavigationSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activePage={page}
          onNavigate={setPage}
        />
      </aside>

      {/* Main content workspace */}
      <main className="flex flex-1 flex-col items-center min-w-0">
        {page === "launchpad" ? (
          <div className="flex w-full flex-1 flex-col overflow-y-auto rounded-none bg-container-sunken6">
            <div className="flex w-full flex-1 flex-col items-center px-[64px] py-[68px]">
              <LaunchpadView onLaunch={() => setPage("scenario")} />
            </div>
          </div>
        ) : (
        <div className="flex w-full flex-1 flex-col overflow-hidden rounded-none bg-container-sunken6">
          {/* Global header — persistent across all tabs */}
          <div className="flex flex-col gap-[8px] overflow-hidden px-[64px] pt-[24px]">
            <ScenarioControlStrip viewMode={viewMode} onViewModeChange={setViewMode} />
            <MetaFilterCapsuleRow />
          </div>

          {viewMode === "edit" ? (
            <div className="flex flex-1 flex-col min-h-0 overflow-hidden pt-[40px] pb-[40px]">
              <GlobalEditView />
            </div>
          ) : (
            <>
              {/* Tab navigation */}
              <div className="pt-[16px]">
                <ViewNavigationLayer activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

              {/* Content body — contextual per active tab */}
              {activeTab === 5 ? (
                <div className="flex flex-1 flex-col min-h-0 overflow-hidden px-[64px] pt-[40px] pb-[40px]">
                  <DetailsView />
                </div>
              ) : (
                <div className="flex flex-1 flex-col gap-[48px] overflow-y-auto px-[64px] pt-[40px] pb-[40px]">
                  {activeTab === 0 && (
                    <>
                      <BusinessPerformanceSection />
                      <BrandPerformanceSnapshot />
                    </>
                  )}
                  {activeTab === 1 && <WaterfallView />}
                  {activeTab === 2 && <ComparisonView />}
                  {activeTab === 3 && <TrendsView />}
                  {activeTab === 4 && <CurvesView />}
                </div>
              )}
            </>
          )}
        </div>
        )}
      </main>
    </div>
  );
}
