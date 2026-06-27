import LeftNavigationSidebar from "./components/LeftNavigationSidebar";

export default function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-container-sunken1 font-[family-name:var(--font-body)] text-text-body">
      {/* LeftNavigationSidebar — 320px fixed */}
      <aside className="flex h-screen w-80 flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar-default">
        <LeftNavigationSidebar />
      </aside>

      {/* MainContentWorkspace — placeholder */}
      <div className="flex flex-1 flex-col overflow-hidden bg-container-sunken1">
        <div className="flex flex-1 items-center justify-center">
          <span className="text-sm text-text-disabled">MainContentWorkspace</span>
        </div>
      </div>
    </div>
  );
}
