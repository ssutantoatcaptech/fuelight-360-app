// Drivers taxonomy for the Table Settings drawer.
// Ported verbatim from the Chart-settings blueprint (bulk-edit-modal-market.html).
// L1 → L2 → L3 → L4 (arrays at L4).

export type Taxonomy = {
  l1: string[];
  children: Record<string, Record<string, Record<string, string[]>>>;
};

export const DRIVERS_TAXONOMY: Taxonomy = {
  l1: [
    "Base & All Other",
    "Brand Equity",
    "Competitor Execution",
    "Competitor Media",
    "Consumer (Owned)",
    "Consumer (Paid)",
    "Customer",
    "Distribution",
    "Experiment Investment Consumer (Paid)",
    "Experiment Investment Customer",
    "Holidays",
    "Macroeconomics",
    "Market & Brand Trends",
    "Non-Visible",
    "Outlet Execution",
    "Pricing",
    "Weather",
    "World Events",
  ],
  children: {
    "Base & All Other": {
      "Base & All Other": {
        "Base & All Other": [
          "Base & All Other",
          "Pricing Min/Max Adjustment",
          "Residuals",
          "Temperature Min/Max Adjustment",
          "Weighted distribution Min/Max Adjustment",
        ],
      },
    },
    "Brand Equity": {
      "Brand Equity": {
        "Brand Equity": ["Brand Awareness"],
      },
    },
    "Competitor Execution": {
      Distribution: {
        "Weighted Distribution": ["Weighted Distribution"],
      },
      Pricing: {
        Pricing: ["Pricing"],
      },
      "Promotions & Shopper Marketing": {
        "Consumer Promo": ["Shopper Investment"],
      },
    },
    "Competitor Media": {
      "Competitor Media": {
        "Competitor Media": ["Competitor Media"],
      },
      "Paid Marketing": {
        Adstock: ["Competitor Spend Adstock"],
        Digital: [
          "National Media",
          "Online Display, Video, VOD-CTV",
          "Social",
        ],
        Traditional: [
          "Cinema",
          "Magazines",
          "Newspapers",
          "Out of Home",
          "Radio",
          "Television",
        ],
      },
    },
    "Consumer (Owned)": {
      "Digital Media": {
        Social: [
          "Facebook",
          "Instagram",
          "LinkedIn",
          "TikTok",
          "X (Twitter)",
          "Youtube",
        ],
      },
    },
    "Consumer (Paid)": {
      "Digital Media": {
        "Digital Media": ["Digital Media"],
        "Digital Radio, Voice, Podcast": [
          "Amazon DSP",
          "DV360",
          "Other Audio",
          "Pandora",
          "Spotify",
          "The Trade Desk",
        ],
        Fee: ["Google", "Other Fee", "The Trade Desk"],
        Mobile: ["All Other Digital Media"],
        "Online Display Banner": [
          "Amazon DSP",
          "DV360",
          "Google",
          "Google Ads",
          "Google Display Network",
          "Other Display",
          "The Trade Desk",
          "Warner",
          "Youtube",
        ],
        "Online Video": [
          "Amazon DSP",
          "DV360",
          "Google",
          "Other Video",
          "The Trade Desk",
          "Twitch",
          "YouTube",
        ],
        Other: ["All Other Digital Media"],
        Search: ["Amazon", "Bing", "Google", "Other Search"],
        Social: [
          "Meta",
          "Other Social",
          "Pinterest",
          "Snapchat",
          "TikTok",
          "X (Twitter)",
        ],
        "VOD-CTV": [
          "Hulu",
          "ITVX",
          "Netflix",
          "Other Connected TV",
          "Roku",
        ],
      },
      "Media Synergy": {
        "Media Synergy": ["Media Synergy"],
      },
      "Other Media": {
        "Other Media": ["Other Media"],
      },
      "Retail Media": {
        "Retail Media": ["Retail Media"],
      },
      "Traditional Media": {
        Cinema: ["Cinema"],
        Other: ["All Other Traditional Media"],
        "Out of Home": ["Out of Home"],
        Print: ["Print"],
        Radio: ["Radio"],
        Television: [
          "Broadcast",
          "Fixed & Flex Television",
          "Fixed Television",
          "Flex Television",
          "Other",
          "Television",
        ],
      },
    },
    Customer: {
      "Outlet Equipment": {
        "Cooler Doors": ["Cooler Doors"],
        "Functional equipment": ["Functional equipment"],
        "Menu communication": ["Menu communication"],
        "Outdoor equipment ": ["Outdoor equipment "],
        Umbrellas: ["Umbrellas"],
      },
      "Promotions & Shopper Marketing": {
        "Consumer Promo": [
          "Shopper Investment",
          "Shopper Investment (Modern Trade)",
          "Shopper Investment (Traditional Trade)",
        ],
        "Customer Price Promos": ["Customer Promo", "Sampling"],
        "Customer Promo": ["Special Promotions"],
      },
    },
    Distribution: {
      "Weighted Distribution": {
        "Weighted Distribution": ["Weighted Distribution"],
      },
    },
    "Experiment Investment Consumer (Paid)": {
      "Experiment Investment Consumer (Paid)": {
        "Experiment Investment Consumer (Paid)": [
          "Experiment Investment Consumer (Paid)",
        ],
      },
    },
    "Experiment Investment Customer": {
      "Experiment Investment Customer": {
        "Experiment Investment Customer": [
          "Experiment Investment Customer",
        ],
      },
    },
    Holidays: {
      Holidays: {
        Holidays: ["Holidays"],
      },
    },
    Macroeconomics: {
      "CPI (seasonally adjusted)": {
        "CPI (seasonally adjusted)": ["CPI (seasonally adjusted)"],
      },
      Macroeconomics: {
        Macroeconomics: ["Macroeconomics"],
      },
      "PCE (YoY % change)": {
        "PCE (YoY % change)": ["PCE (YoY % change)"],
      },
      "Real Private Consumption": {
        "Real Private Consumption": ["Real Private Consumption"],
      },
      "Unemployment Rate": {
        "Unemployment Rate": ["Unemployment Rate"],
      },
    },
    "Market & Brand Trends": {
      "Brand Trends": {
        "Dasani visual change": ["Dasani visual change"],
      },
      "Market Trends": {
        "Sugar-free trend": ["Sugar-free trend"],
        "Tea category growth trend": ["Tea category growth trend"],
      },
    },
    "Non-Visible": {
      Other: {
        Other: ["Other"],
      },
    },
    "Outlet Execution": {
      "Cooler Execution": {
        "Cooler Merchandizing Standard": ["Cooler Merchandizing Standard"],
        "Cooler Occupancy": ["Cooler Occupancy"],
      },
      Coolers: {
        Coolers: ["Coolers"],
      },
      "Outlet Activation Execution": {
        "Activation points": ["Activation points"],
        "Assortment Availability": ["Assortment Availability"],
        Combo: ["Combo"],
        "Menu Activation": ["Menu Activation"],
      },
      "Sales Representatives": {
        "Sales Representative Visits": ["Sales Representative Visits"],
      },
      "SOVI / SOCVI": {
        SOCVI: ["SOCVI"],
        SOVI: ["SOVI"],
        "SOVI / SOCVI": ["SOVI / SOCVI"],
      },
    },
    Pricing: {
      Pricing: {
        Pricing: ["Pricing"],
      },
    },
    Weather: {
      Precipitation: {
        Precipitation: ["Precipitation"],
      },
      Temperature: {
        Temperature: ["Temperature"],
      },
      Weather: {
        Weather: ["Weather"],
      },
    },
    "World Events": {
      "Human-caused events": {
        Boycott: ["Boycott"],
        War: ["War"],
      },
      "Natural Disasters": {
        Earthquake: ["Earthquake"],
        Flood: ["Flood"],
        Hurricane: ["Hurricane"],
      },
    },
  },
};

// Activation = marketing investment drivers the user actively pulls.
export const ACTIVATION_L1 = [
  "Consumer (Paid)",
  "Consumer (Owned)",
  "Customer",
  "Experiment Investment Consumer (Paid)",
  "Experiment Investment Customer",
];

// Contextual = external / structural drivers.
export const CONTEXTUAL_L1 = [
  "Base & All Other",
  "Brand Equity",
  "Competitor Execution",
  "Competitor Media",
  "Distribution",
  "Holidays",
  "Macroeconomics",
  "Market & Brand Trends",
  "Non-Visible",
  "Outlet Execution",
  "Pricing",
  "Weather",
  "World Events",
];

// Contextual L1s that expose Brand + Customer + Pack; everything else = Brand only.
export const BCP_CONTEXTUAL_L1S = ["Pricing", "Distribution"];

export const BRANDS = [
  "Coca-Cola",
  "Coca-Cola Zero",
  "Diet Coke / Coca-Cola Light",
  "Pepsi",
  "Pepsi Max",
  "Sprite",
  "Fanta",
  "Dr Pepper",
  "Mountain Dew",
  "7UP",
  "Schweppes",
  "Powerade",
  "Gatorade",
  "Minute Maid",
];

export const CUSTOMERS = [
  "Asda",
  "Tesco",
  "Sainsbury’s",
  "Morrisons",
  "Waitrose",
  "Aldi",
  "Lidl",
  "Co-op",
  "Ocado",
  "Iceland",
];

export const PACKS = [
  "All Packs",
  "330ml Can",
  "500ml Bottle",
  "1L Bottle",
  "1.5L Bottle",
  "2L Bottle",
  "6x330ml Multipack",
  "12x330ml Multipack",
  "24x330ml Multipack",
];

export const TABLE_VIEWS = ["Full Calendar", "Scenario Timeframe", "Prior Period"];
export const TIME_PERIODS = ["Week", "Month", "Quarter", "Year"];
export const VIEW_LEVELS = ["Activation Drivers", "Contextual Drivers"];
