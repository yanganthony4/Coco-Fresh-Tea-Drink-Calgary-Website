// src/types.ts

// ——————————————————————————————————————————————————
// 1) Toppings defined as a literal readonly tuple + union
// ——————————————————————————————————————————————————
export const AvailableToppings = [
  "Pearls",
  "Sago",
  "Pudding",
  "Red Bean",
  "Tea Jelly",
  "Fresh Taro",
  "Salty Cream",
  "Grass Jelly",
  "White Pearls",
  "Coconut Jelly",
  "Brown Sugar Pearls",
  "Popping Lychee Pearls",
  "Popping Strawberry Pearls",
] as const;

export type Topping = (typeof AvailableToppings)[number];


// ——————————————————————————————————————————————————
// 2) Enums for levels, size, milk (still available for select dropdowns)
// ——————————————————————————————————————————————————
export enum IceLevel {
  EXTRA_ICE   = "Extra Ice",
  REGULAR_ICE = "Regular Ice",
  LESS_ICE    = "Less Ice",
  NO_ICE      = "No Ice",
}

export enum SugarLevel {
  EXTRA_SUGAR     = "Extra Sugar",
  HUNDRED_PERCENT = "100% Sugar",
  SEVENTY         = "70% Sugar",
  FIFTY           = "50% Sugar",
  THIRTY          = "30% Sugar",
  NO_SUGAR        = "No Sugar",
}

export enum Size {
  SMALL  = "Small",
  MEDIUM = "Medium",
  LARGE  = "Large",
}




// ——————————————————————————————————————————————————
// 3) Core data shapes
// ——————————————————————————————————————————————————
export interface Drink {
  image:       string;
  name:        string;
  description?: string;
  calories?:   string;            // JSON provides this as string
  price?:      string;            // JSON provides this as string
  category:    string | string[]; // sometimes single string, sometimes array
}

export interface SavedDrink {
  id:        number;
  base:      string;     // the drink name
  image:     string;     // URL to the base image
  ice:       string;     // store raw string (e.g. "Regular Ice")
  sugar:     string;     // store raw string (e.g. "70% Sugar")
  toppings:  string[];   // array of topping names
  addOns:    string;     // free‑form special instructions
  size:      string;     // e.g. "Regular" or any custom label
  milk:      string;     // e.g. "Regular Milk Tea" or enum value
  date:      string;     // toLocaleDateString() output
}
