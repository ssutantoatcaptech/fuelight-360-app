# Chart Settings Side Panel Drawer — Full UI Specification

## Context

Analysis of the Chart Settings drawer from `bulk-edit-modal-market.html` (lines 5335–6146) for creating a Claude Design reference document. This is a self-contained vanilla JS/CSS component rendered as a fixed-position side panel overlay.

---

## Panel Container & Positioning

| Property | Value |
|----------|-------|
| Position | `fixed; top: 12px; right: 14px; z-index: 9999` |
| Width | `clamp(286px, 29vw, 356px)` |
| Max-width | `calc(100vw - 20px)` |
| Min-width | `min(286px, calc(100vw - 20px))` |
| Height | `calc(100vh - 24px)` |
| Border-radius | `clamp(14px, 1.6vw, 20px)` |
| Background | `#202020` |
| Border | `1px solid rgba(255,255,255,.04)` |
| Box-shadow | `0 24px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.03)` |
| Font family | Inter, ui-sans-serif, system-ui |
| Text color | `#f2f2f2` |

**Backdrop**: Full-screen transparent overlay (`position: fixed; inset: 0; z-index: 9998`) — click-to-dismiss.

**Responsive (≤860px)**: Width collapses to `min(320px, calc(100vw - 16px))`, insets to 8px, border-radius 16px.

---

## Internal Layout (Flexbox Column, 3 Zones)

### 1. Header (`.v3c-table-settings-header`)

| Property | Value |
|----------|-------|
| Layout | `display: flex; align-items: center` |
| Gap | `clamp(9px, 1vw, 13px)` |
| Padding | `clamp(18px, 2.4vh, 24px) clamp(16px, 1.8vw, 22px) clamp(14px, 1.9vh, 18px)` |

**Contents (left to right):**
1. **Settings icon** — SVG (two stacked rectangles with divider lines), `clamp(16px, 1.25vw, 20px)` square, color `#eeeeee`
2. **Title** — `<h2>` "Chart Settings", font-size `clamp(17px, 1.45vw, 21px)`, weight 800, color `#f5f5f5`, line-height 1

---

### 2. Scrollable Body (`.v3c-table-settings-scroll`)

| Property | Value |
|----------|-------|
| Flex | `1 1 auto` |
| Overflow | `overflow-y: auto; overflow-x: hidden` |
| Padding | `0 clamp(20px, 2.25vw, 30px) clamp(10px, 1.4vh, 14px) clamp(16px, 1.8vw, 22px)` |
| Scrollbar | Custom: track `#f4f4f4`, thumb `#858585`, width 14px, thumb border-radius 999px |

#### Content sections (separated by dividers):

**Divider** — 1px, `rgba(255,255,255,.16)`, margin `clamp(18px, 2.35vh, 25px) 0`

---

#### Section A: View Settings

**Section label**: "VIEW SETTINGS"
- Font-size: `clamp(9px, .85vw, 11px)`, weight 800, uppercase, color `#8d8d8d`
- Margin-bottom: `clamp(16px, 2.2vh, 24px)`

**Toggle row: "Values in Thousands"**
- Layout: flex, space-between, items-center
- Label: color `#f1f1f1`, font-size 14px, weight 500
- Toggle switch: 34px x 18px, border-radius 999px
  - Off: background `#3a3a3e`, dot at left
  - On: background `#237a8c`, dot translates 16px right
  - Dot: 14px circle, `#e5e5e5` (off) / `#fff` (on), 2px inset from edges
  - Transition: 150ms ease

---

#### Section B: Table View & Time Period (after divider)

**Field: "Table View"**
- Label: font-size `clamp(13px, 1.15vw, 16px)`, weight 700, color `#f4f4f4`
- Gap between label and select: 9px
- Margin-bottom: `clamp(16px, 2.15vh, 24px)`
- **Dropdown trigger**: height `clamp(34px, 4.2vh, 42px)`, background `#303030`, border-radius 8px, font-size `clamp(13px, 1.15vw, 16px)`, weight 600, color `#eeeeee`, padding `0 clamp(10px, 1.1vw, 14px)`, inner shadow `inset 0 1px 0 rgba(255,255,255,.03)`
- Chevron: `clamp(12px, 1vw, 15px)` square, color `#d8d8d8`, rotates 180deg when open
- Options: `['Full Calendar', 'Scenario Timeframe', 'Prior Period']`
- Default: "Scenario Timeframe"

**Field: "Time Period"**
- Same styling as Table View
- Options: `['Week', 'Month', 'Quarter', 'Year']`
- Default: "Week"

---

#### Section C: View Level (after divider)

**Section label**: "VIEW LEVEL" (same style as above)

**Top-level dropdown**: Same select button style
- Options: `['Activation Drivers', 'Contextual Drivers']`
- Default: "Activation Drivers"

**Drill-down levels list** (appears 12px below the view level select):
- Layout: grid, gap `clamp(10px, 1.45vh, 14px)`
- Each level row: grid `24px minmax(0,1fr) [24px if removable]`, gap 9px, items-center

**Level badge** (L1, L2, L3, L4):
- 22px circle, border `2px solid #464646`, color `#bebebe`, font-size 9px, weight 800

**Level select**: Same as main select but font-size `clamp(13px, 1.1vw, 15px)`

**Remove button** (shown on last level if index > 0):
- 22px circle, border `1.5px solid #5a5a5f`, color `#9a9a9f`
- Contains minus SVG (12px)
- Hover: color `#eee`, border `#888`

**Add Granularity button** (below levels):
- Margin-top 12px, inline-flex, gap 10px
- Plus circle: 22px, border `1.5px solid #6a6a6f`, contains plus SVG (12px)
- Text: font-size 14px, weight 500, color `#9a9a9f`
- Hover: color `#eee`
- Disabled: opacity .35, cursor not-allowed
- Max 4 levels; disabled when no child options available

**Level options are taxonomy-driven:**
- L1 options depend on viewLevel (Activation vs Contextual)
- L2/L3/L4 cascade from parent selection via `/drivers-taxonomy.json`
- Changing a parent level truncates children

**Activation L1 pool**: Consumer (Paid), Consumer (Owned), Customer, Experiment Investment Consumer (Paid), Experiment Investment Customer

**Contextual L1 pool**: Base & All Other, Brand Equity, Competitor Execution, Competitor Media, Distribution, Holidays, Macroeconomics, Market & Brand Trends, Non-Visible, Outlet Execution, Pricing, Weather, World Events

---

#### Section D: Dimensions (after divider)

**Section label**: "DIMENSIONS"

**Field: "Brand"** (always visible)
- Searchable dropdown
- Options: Coca-Cola, Coca-Cola Zero, Diet Coke / Coca-Cola Light, Pepsi, Pepsi Max, Sprite, Fanta, Dr Pepper, Mountain Dew, 7UP, Schweppes, Powerade, Gatorade, Minute Maid
- Default: "Coca-Cola"

**Field: "Customer"** (CONDITIONAL)
- Only shown when: viewLevel = "Contextual Drivers" AND L1 is "Pricing" or "Distribution"
- Searchable dropdown
- Options: Asda, Tesco, Sainsbury's, Morrisons, Waitrose, Aldi, Lidl, Co-op, Ocado, Iceland
- Default: "Asda"

**Field: "Pack"** (CONDITIONAL — same condition as Customer)
- Searchable dropdown
- Options: All Packs, 330ml Can, 500ml Bottle, 1L Bottle, 1.5L Bottle, 2L Bottle, 6x330ml Multipack, 12x330ml Multipack, 24x330ml Multipack
- Default: "All Packs"

---

### 3. Footer (`.v3c-table-settings-footer`)

| Property | Value |
|----------|-------|
| Layout | `flex; items-center; justify-center` |
| Gap | `clamp(20px, 3vw, 32px)` |
| Padding | `clamp(8px, 1.25vh, 12px) clamp(16px, 1.8vw, 22px) clamp(18px, 2.35vh, 24px)` |
| Background | `#202020` |

**Cancel button**: transparent background, color `#f5f5f5`, height `clamp(34px, 4.2vh, 42px)`, border-radius 10px, font-size `clamp(13px, 1.15vw, 16px)`, weight 700

**Update button**: background `#237a8c`, min-width `clamp(82px, 8vw, 96px)`, same height/radius/font as Cancel, inner shadow `inset 0 1px 0 rgba(255,255,255,.08)`

---

## Dropdown Menu Component

Opens inline below the trigger button (inserted as next sibling in DOM).

| Property | Value |
|----------|-------|
| Margin-top | 6px |
| Border | `1px solid rgba(255,255,255,.10)` |
| Border-radius | 12px |
| Background | `#1e1e20` |
| Padding | 6px |
| Max-height | 260px (scrollable) |
| Item gap | 2px |

**Menu item**: padding `10px 12px`, border-radius 8px, font-size 14px, weight 500, color `#c7c7cc`
- Hover: background `rgba(255,255,255,.04)`
- Selected: color `#f4f4f4`, weight 700, green checkmark

**Checkmark icon**: color `#2ec4a5`, 16px square

**Search input** (for Brand/Customer/Pack):
- Container: flex, gap 8px, padding `8px 12px`, border-radius 8px, background `#262628`
- Input: transparent background, color `#f0f0f2`, font-size 14px
- Search icon: color `#9a9a9f`, 16px

---

## Interaction & Behavior

1. **Open trigger**: Any button with text "Chart Settings", "Table Settings", or "View" (captured via document click listener in capture phase)
2. **Close**: Click backdrop outside panel, or click "Cancel"
3. **Only one menu open at a time** — opening a new one closes any existing
4. **Click outside a menu** (but inside panel) closes the menu
5. **Searchable dropdowns** auto-focus the search input
6. **Update button**: Writes state to `window.__v3cMadLib.state`, then calls `__v3cUpdateMainTable()`, `__v3cUpdatePageTitle()`, `__v4ApplySettings()`, then closes
7. **State re-initializes from global filter** every time panel opens (not persisted between opens)
8. **View level change** resets drill levels to a valid L1 for the new pool
9. **Level selection change** truncates all child levels below it
10. **Add Granularity** picks the first available child option

---

## State Model

```javascript
{
  valuesInThousands: true,       // toggle
  tableView: 'Scenario Timeframe', // select: Full Calendar | Scenario Timeframe | Prior Period
  timePeriod: 'Week',            // select: Week | Month | Quarter | Year
  viewLevel: 'Activation Drivers', // select: Activation Drivers | Contextual Drivers
  levels: ['Consumer (Paid)'],   // array[1..4] — cascading taxonomy drill
  brand: 'Coca-Cola',           // searchable select (14 options)
  customer: 'Asda',             // conditional searchable select (10 options)
  pack: 'All Packs'             // conditional searchable select (9 options)
}
```

---

## Full Drivers Taxonomy (by Driver Type)

The taxonomy is a 4-level hierarchy: **L1 > L2 > L3 > L4**. L1 options are partitioned by the selected View Level (Activation or Contextual). L2/L3/L4 cascade from the parent.

### Activation Drivers

#### Consumer (Paid)
| L2 | L3 | L4 |
|----|----|----|
| Digital Media | Digital Media | Digital Media |
| Digital Media | Digital Radio, Voice, Podcast | Amazon DSP, DV360, Other Audio, Pandora, Spotify, The Trade Desk |
| Digital Media | Fee | Google, Other Fee, The Trade Desk |
| Digital Media | Mobile | All Other Digital Media |
| Digital Media | Online Display Banner | Amazon DSP, DV360, Google, Google Ads, Google Display Network, Other Display, The Trade Desk, Warner, Youtube |
| Digital Media | Online Video | Amazon DSP, DV360, Google, Other Video, The Trade Desk, Twitch, YouTube |
| Digital Media | Other | All Other Digital Media |
| Digital Media | Search | Amazon, Bing, Google, Other Search |
| Digital Media | Social | Meta, Other Social, Pinterest, Snapchat, TikTok, X (Twitter) |
| Digital Media | VOD-CTV | Hulu, ITVX, Netflix, Other Connected TV, Roku |
| Media Synergy | Media Synergy | Media Synergy |
| Other Media | Other Media | Other Media |
| Retail Media | Retail Media | Retail Media |
| Traditional Media | Cinema | Cinema |
| Traditional Media | Other | All Other Traditional Media |
| Traditional Media | Out of Home | Out of Home |
| Traditional Media | Print | Print |
| Traditional Media | Radio | Radio |
| Traditional Media | Television | Broadcast, Fixed & Flex Television, Fixed Television, Flex Television, Other, Television |

#### Consumer (Owned)
| L2 | L3 | L4 |
|----|----|----|
| Digital Media | Social | Facebook, Instagram, LinkedIn, TikTok, X (Twitter), Youtube |

#### Customer
| L2 | L3 | L4 |
|----|----|----|
| Outlet Equipment | Cooler Doors | Cooler Doors |
| Outlet Equipment | Functional equipment | Functional equipment |
| Outlet Equipment | Menu communication | Menu communication |
| Outlet Equipment | Outdoor equipment | Outdoor equipment |
| Outlet Equipment | Umbrellas | Umbrellas |
| Promotions & Shopper Marketing | Consumer Promo | Shopper Investment, Shopper Investment (Modern Trade), Shopper Investment (Traditional Trade) |
| Promotions & Shopper Marketing | Customer Price Promos | Customer Promo, Sampling |
| Promotions & Shopper Marketing | Customer Promo | Special Promotions |

#### Experiment Investment Consumer (Paid)
| L2 | L3 | L4 |
|----|----|----|
| Experiment Investment Consumer (Paid) | Experiment Investment Consumer (Paid) | Experiment Investment Consumer (Paid) |

#### Experiment Investment Customer
| L2 | L3 | L4 |
|----|----|----|
| Experiment Investment Customer | Experiment Investment Customer | Experiment Investment Customer |

---

### Contextual Drivers

#### Base & All Other
| L2 | L3 | L4 |
|----|----|----|
| Base & All Other | Base & All Other | Base & All Other, Pricing Min/Max Adjustment, Residuals, Temperature Min/Max Adjustment, Weighted distribution Min/Max Adjustment |

#### Brand Equity
| L2 | L3 | L4 |
|----|----|----|
| Brand Equity | Brand Equity | Brand Awareness |

#### Competitor Execution
| L2 | L3 | L4 |
|----|----|----|
| Distribution | Weighted Distribution | Weighted Distribution |
| Pricing | Pricing | Pricing |
| Promotions & Shopper Marketing | Consumer Promo | Shopper Investment |

#### Competitor Media
| L2 | L3 | L4 |
|----|----|----|
| Competitor Media | Competitor Media | Competitor Media |
| Paid Marketing | Adstock | Competitor Spend Adstock |
| Paid Marketing | Digital | National Media, Online Display, Video, VOD-CTV, Social |
| Paid Marketing | Traditional | Cinema, Magazines, Newspapers, Out of Home, Radio, Television |

#### Distribution
| L2 | L3 | L4 |
|----|----|----|
| Weighted Distribution | Weighted Distribution | Weighted Distribution |

#### Holidays
| L2 | L3 | L4 |
|----|----|----|
| Holidays | Holidays | Holidays |

#### Macroeconomics
| L2 | L3 | L4 |
|----|----|----|
| CPI (seasonally adjusted) | CPI (seasonally adjusted) | CPI (seasonally adjusted) |
| Macroeconomics | Macroeconomics | Macroeconomics |
| PCE (YoY % change) | PCE (YoY % change) | PCE (YoY % change) |
| Real Private Consumption | Real Private Consumption | Real Private Consumption |
| Unemployment Rate | Unemployment Rate | Unemployment Rate |

#### Market & Brand Trends
| L2 | L3 | L4 |
|----|----|----|
| Brand Trends | Dasani visual change | Dasani visual change |
| Market Trends | Sugar-free trend | Sugar-free trend |
| Market Trends | Tea category growth trend | Tea category growth trend |

#### Non-Visible
| L2 | L3 | L4 |
|----|----|----|
| Other | Other | Other |

#### Outlet Execution
| L2 | L3 | L4 |
|----|----|----|
| Cooler Execution | Cooler Merchandizing Standard | Cooler Merchandizing Standard |
| Cooler Execution | Cooler Occupancy | Cooler Occupancy |
| Coolers | Coolers | Coolers |
| Outlet Activation Execution | Activation points | Activation points |
| Outlet Activation Execution | Assortment Availability | Assortment Availability |
| Outlet Activation Execution | Combo | Combo |
| Outlet Activation Execution | Menu Activation | Menu Activation |
| Sales Representatives | Sales Representative Visits | Sales Representative Visits |
| SOVI / SOCVI | SOCVI | SOCVI |
| SOVI / SOCVI | SOVI | SOVI |
| SOVI / SOCVI | SOVI / SOCVI | SOVI / SOCVI |

#### Pricing
| L2 | L3 | L4 |
|----|----|----|
| Pricing | Pricing | Pricing |

#### Weather
| L2 | L3 | L4 |
|----|----|----|
| Precipitation | Precipitation | Precipitation |
| Temperature | Temperature | Temperature |
| Weather | Weather | Weather |

#### World Events
| L2 | L3 | L4 |
|----|----|----|
| Human-caused events | Boycott | Boycott |
| Human-caused events | War | War |
| Natural Disasters | Earthquake | Earthquake |
| Natural Disasters | Flood | Flood |
| Natural Disasters | Hurricane | Hurricane |

---

### Taxonomy Cascade Logic

1. When **View Level** changes (Activation <> Contextual), the L1 pool changes and levels reset to `[pool[0]]`
2. When **L1** changes, L2/L3/L4 are truncated (only L1 remains)
3. When **L2** changes, L3/L4 are truncated
4. When **L3** changes, L4 is truncated
5. **Add Granularity** is disabled when the next level has no children in the taxonomy
6. Available options at each level = keys of `TAXONOMY.children[L1][L2][L3]` (arrays at L4)

### Conditional Dimension Fields

- **Brand** field: Always visible regardless of driver type
- **Customer** + **Pack** fields: Only visible when `viewLevel === 'Contextual Drivers'` AND `L1` is one of `['Pricing', 'Distribution']`

---

## Source File

`fuelight-design/public/prototypes/bulk-edit-modal-market.html`
- CSS: lines 5335–5655
- JS (IIFE): lines 5733–6146
- Embedded taxonomy: lines 707–1106
