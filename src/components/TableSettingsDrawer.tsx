import { useEffect, useRef, useState } from "react";
import Icon from "./ui/Icon";
import {
  DRIVERS_TAXONOMY,
  ACTIVATION_L1,
  CONTEXTUAL_L1,
  BCP_CONTEXTUAL_L1S,
  BRANDS,
  CUSTOMERS,
  PACKS,
  TABLE_VIEWS,
  TIME_PERIODS,
  VIEW_LEVELS,
} from "../data/driversTaxonomy";

export interface SettingsState {
  valuesInThousands: boolean;
  tableView: string;
  timePeriod: string;
  viewLevel: string;
  levels: string[];
  brand: string;
  customer: string;
  pack: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (state: SettingsState) => void;
}

const DEFAULT_STATE: SettingsState = {
  valuesInThousands: true,
  tableView: "Scenario Timeframe",
  timePeriod: "Week",
  viewLevel: "Activation Drivers",
  levels: ["Consumer (Paid)"],
  brand: "Coca-Cola",
  customer: "Asda",
  pack: "All Packs",
};

// Inline SVGs — chevron / check / search glyphs are not in the approved Icon set.
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`size-[15px] text-text-caption shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CheckGlyph = () => (
  <svg
    className="size-[16px] text-success shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SearchGlyph = () => (
  <svg
    className="size-[16px] text-text-caption shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export default function TableSettingsDrawer({ open, onClose, onApply }: Props) {
  const [state, setState] = useState<SettingsState>(DEFAULT_STATE);
  // openMenu identifies the currently open dropdown: a select id ("tableView",
  // "brand", …) or a level index encoded as "level:<idx>".
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Reset to a clean state each time the drawer opens (matches prototype:
  // state re-initializes on open, not persisted between opens).
  useEffect(() => {
    if (open) {
      setState(DEFAULT_STATE);
      setOpenMenu(null);
      setSearch("");
    }
  }, [open]);

  if (!open) return null;

  const l1Pool = () => {
    const pool =
      state.viewLevel === "Contextual Drivers" ? CONTEXTUAL_L1 : ACTIVATION_L1;
    const have = new Set(DRIVERS_TAXONOMY.l1);
    return pool.filter((k) => have.has(k));
  };

  const optionsForLevel = (idx: number): string[] => {
    if (idx === 0) return l1Pool();
    const l1 = state.levels[0];
    if (!l1 || !DRIVERS_TAXONOMY.children[l1]) return [];
    if (idx === 1) return Object.keys(DRIVERS_TAXONOMY.children[l1]);
    const l2 = state.levels[1];
    if (!l2 || !DRIVERS_TAXONOMY.children[l1][l2]) return [];
    if (idx === 2) return Object.keys(DRIVERS_TAXONOMY.children[l1][l2]);
    const l3 = state.levels[2];
    if (!l3 || !DRIVERS_TAXONOMY.children[l1][l2][l3]) return [];
    if (idx === 3) return DRIVERS_TAXONOMY.children[l1][l2][l3] || [];
    return [];
  };

  const showsBrandCustomerPack = () =>
    state.viewLevel === "Contextual Drivers" &&
    BCP_CONTEXTUAL_L1S.includes(state.levels[0]);

  const toggleMenu = (id: string) => {
    setSearch("");
    setOpenMenu((cur) => (cur === id ? null : id));
  };

  const selectValue = (id: string, val: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (id === "viewLevel") {
        next.viewLevel = val;
        const pool =
          val === "Contextual Drivers" ? CONTEXTUAL_L1 : ACTIVATION_L1;
        const have = new Set(DRIVERS_TAXONOMY.l1);
        const filtered = pool.filter((k) => have.has(k));
        next.levels = [
          filtered.includes(prev.levels[0]) ? prev.levels[0] : filtered[0] || "",
        ];
      } else if (id === "tableView") next.tableView = val;
      else if (id === "timePeriod") next.timePeriod = val;
      else if (id === "brand") next.brand = val;
      else if (id === "customer") next.customer = val;
      else if (id === "pack") next.pack = val;
      return next;
    });
    setOpenMenu(null);
  };

  const selectLevel = (idx: number, val: string) => {
    setState((prev) => {
      const levels = prev.levels.slice(0, idx + 1);
      levels[idx] = val;
      return { ...prev, levels };
    });
    setOpenMenu(null);
  };

  const addLevel = () => {
    const nextIdx = state.levels.length;
    const opts = optionsForLevel(nextIdx);
    if (!opts.length) return;
    setState((prev) => ({ ...prev, levels: [...prev.levels, opts[0]] }));
  };

  const removeLevel = (idx: number) => {
    setState((prev) => ({ ...prev, levels: prev.levels.slice(0, idx) }));
    setOpenMenu(null);
  };

  const canAdd =
    state.levels.length < 4 && optionsForLevel(state.levels.length).length > 0;

  return (
    <>
      {/* Backdrop — click to dismiss */}
      <div className="fixed inset-0 z-[9998] bg-transparent" onClick={onClose} />

      {/* Panel — full-height, left corners rounded 12px */}
      <div className="fixed top-0 right-0 z-[9999] flex h-screen w-[356px] max-w-[calc(100vw-20px)] flex-col overflow-hidden rounded-l-[12px] border-l border-input-border bg-container-sunken2 font-[family-name:var(--font-body)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        {/* Header */}
        <div className="flex shrink-0 items-center gap-[12px] px-[22px] pt-[24px] pb-[16px]">
          <Icon name="settings" size={20} className="text-text-header" />
          <h2 className="m-0 text-[20px] font-bold leading-none text-text-header font-[family-name:var(--font-title)]">
            Table Settings
          </h2>
        </div>

        {/* Scroll body */}
        <div className="subtle-scroll flex-1 min-h-0 overflow-y-auto px-[22px] pb-[14px]">
          {/* View Settings */}
          <SectionLabel>View Settings</SectionLabel>
          <ToggleRow
            label="Values in Thousands"
            on={state.valuesInThousands}
            onToggle={() =>
              setState((p) => ({
                ...p,
                valuesInThousands: !p.valuesInThousands,
              }))
            }
          />

          <Divider />

          {/* Table View */}
          <Field label="Table View">
            <SelectControl
              value={state.tableView}
              open={openMenu === "tableView"}
              onToggle={() => toggleMenu("tableView")}
            />
            {openMenu === "tableView" && (
              <Menu
                items={TABLE_VIEWS}
                current={state.tableView}
                onSelect={(v) => selectValue("tableView", v)}
              />
            )}
          </Field>

          {/* Time Period */}
          <Field label="Time Period">
            <SelectControl
              value={state.timePeriod}
              open={openMenu === "timePeriod"}
              onToggle={() => toggleMenu("timePeriod")}
            />
            {openMenu === "timePeriod" && (
              <Menu
                items={TIME_PERIODS}
                current={state.timePeriod}
                onSelect={(v) => selectValue("timePeriod", v)}
              />
            )}
          </Field>

          <Divider />

          {/* View Level */}
          <SectionLabel>View Level</SectionLabel>
          <div className="relative">
            <SelectControl
              value={state.viewLevel}
              open={openMenu === "viewLevel"}
              onToggle={() => toggleMenu("viewLevel")}
            />
            {openMenu === "viewLevel" && (
              <Menu
                items={VIEW_LEVELS}
                current={state.viewLevel}
                onSelect={(v) => selectValue("viewLevel", v)}
              />
            )}
          </div>

          <div className="mt-[12px] flex flex-col gap-[12px]">
            {state.levels.map((lvl, i) => {
              const isLast = i === state.levels.length - 1;
              const canRemove = i > 0 && isLast;
              const menuId = `level:${i}`;
              return (
                <div
                  key={i}
                  className="grid items-center gap-[9px]"
                  style={{
                    gridTemplateColumns: canRemove
                      ? "24px minmax(0,1fr) 24px"
                      : "24px minmax(0,1fr)",
                  }}
                >
                  <span className="flex size-[22px] items-center justify-center rounded-full border-[1.5px] border-input-border text-[9px] font-bold text-text-caption">
                    L{i + 1}
                  </span>
                  <div className="relative min-w-0">
                    <SelectControl
                      value={lvl || "—"}
                      open={openMenu === menuId}
                      onToggle={() => toggleMenu(menuId)}
                    />
                    {openMenu === menuId && (
                      <Menu
                        items={optionsForLevel(i)}
                        current={lvl}
                        onSelect={(v) => selectLevel(i, v)}
                      />
                    )}
                  </div>
                  {canRemove && (
                    <button
                      type="button"
                      aria-label="Remove level"
                      onClick={() => removeLevel(i)}
                      className="flex size-[22px] items-center justify-center rounded-full border-[1.5px] border-input-border text-text-caption hover:text-text-header"
                    >
                      <Icon name="remove" size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!canAdd}
            onClick={addLevel}
            className={`mt-[12px] flex items-center gap-[10px] bg-transparent border-0 py-[6px] text-[14px] font-medium text-text-caption ${
              canAdd ? "hover:text-text-header" : "opacity-70 cursor-not-allowed"
            }`}
          >
            <span className="flex size-[22px] items-center justify-center rounded-full border-[1.5px] border-input-border">
              <Icon name="plus" size={12} />
            </span>
            Add Granularity
          </button>

          <Divider />

          {/* Dimensions */}
          <SectionLabel>Dimensions</SectionLabel>
          <Field label="Brand">
            <SelectControl
              value={state.brand}
              open={openMenu === "brand"}
              onToggle={() => toggleMenu("brand")}
            />
            {openMenu === "brand" && (
              <Menu
                items={BRANDS}
                current={state.brand}
                searchable
                search={search}
                onSearch={setSearch}
                onSelect={(v) => selectValue("brand", v)}
              />
            )}
          </Field>

          {showsBrandCustomerPack() && (
            <>
              <Field label="Customer">
                <SelectControl
                  value={state.customer}
                  open={openMenu === "customer"}
                  onToggle={() => toggleMenu("customer")}
                />
                {openMenu === "customer" && (
                  <Menu
                    items={CUSTOMERS}
                    current={state.customer}
                    searchable
                    search={search}
                    onSearch={setSearch}
                    onSelect={(v) => selectValue("customer", v)}
                  />
                )}
              </Field>
              <Field label="Pack">
                <SelectControl
                  value={state.pack}
                  open={openMenu === "pack"}
                  onToggle={() => toggleMenu("pack")}
                />
                {openMenu === "pack" && (
                  <Menu
                    items={PACKS}
                    current={state.pack}
                    searchable
                    search={search}
                    onSearch={setSearch}
                    onSelect={(v) => selectValue("pack", v)}
                  />
                )}
              </Field>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-center gap-[24px] bg-container-sunken2 px-[22px] pt-[12px] pb-[24px]">
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] rounded-[10px] border-0 bg-transparent px-[18px] text-[16px] font-bold text-text-header"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(state);
              onClose();
            }}
            className="h-[42px] min-w-[96px] rounded-[10px] border-0 bg-brand-primary-dim px-[18px] text-[16px] font-bold text-white"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------- Sub-components ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[24px] mt-[2px] text-[11px] font-bold uppercase leading-none text-text-caption">
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-[25px] h-px bg-input-border" />;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mb-[24px] grid gap-[9px]">
      <div className="text-[16px] font-bold leading-none text-text-header">
        {label}
      </div>
      {children}
    </div>
  );
}

function SelectControl({
  value,
  open,
  onToggle,
}: {
  value: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-[42px] w-full items-center justify-between rounded-[8px] border border-input-border bg-input-bg px-[14px] text-left text-[16px] font-semibold text-text-header"
    >
      <span className="truncate">{value}</span>
      <Chevron open={open} />
    </button>
  );
}

function Menu({
  items,
  current,
  onSelect,
  searchable = false,
  search = "",
  onSearch,
}: {
  items: string[];
  current: string;
  onSelect: (v: string) => void;
  searchable?: boolean;
  search?: string;
  onSearch?: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchable) inputRef.current?.focus();
  }, [searchable]);

  const list = search
    ? items.filter((it) => it.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div className="subtle-scroll absolute left-0 right-0 top-full z-[10000] mt-[6px] flex max-h-[260px] flex-col gap-[2px] overflow-y-auto rounded-[8px] border border-input-border bg-container-sunken3 p-[6px]">
      {searchable && (
        <div className="mb-[4px] flex items-center gap-[8px] rounded-[8px] bg-container-sunken2 px-[12px] py-[8px]">
          <SearchGlyph />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            className="flex-1 border-0 bg-transparent text-[14px] text-text-header outline-none placeholder:text-text-caption"
          />
        </div>
      )}
      {list.map((it) => {
        const selected = it === current;
        return (
          <button
            key={it}
            type="button"
            onClick={() => onSelect(it)}
            className={`flex w-full items-center justify-between rounded-[8px] border-0 bg-transparent px-[12px] py-[10px] text-left text-[14px] hover:bg-container-sunken4 ${
              selected ? "font-bold text-text-header" : "font-medium text-text-body"
            }`}
          >
            <span className="truncate">{it}</span>
            {selected && <CheckGlyph />}
          </button>
        );
      })}
    </div>
  );
}

function ToggleRow({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-medium text-text-header">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={`relative inline-flex h-[20px] w-[40px] shrink-0 items-center rounded-full border-0 transition-colors duration-150 ${
          on ? "bg-brand-primary-dim" : "bg-container-sunken5"
        }`}
      >
        <span
          className={`absolute top-[2px] size-[16px] rounded-full bg-white transition-transform duration-150 ${
            on ? "translate-x-[22px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
