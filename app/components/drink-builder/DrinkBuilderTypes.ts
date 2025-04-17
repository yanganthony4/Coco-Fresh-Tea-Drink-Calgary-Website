// src/types.ts
export interface Drink {
    image: string;
    name: string;
    description?: string;
    calories?: string;
    price?: string;
    category: string | string[];
  }
  
  export interface SavedDrink {
    id: number;
    base: string;
    image: string;
    ice: string;
    sugar: string;
    toppings: string[];
    addOns: string;
    size: string;
    milk: string;
    date: string;
  }
  
  export enum IceLevel {
    EXTRA_ICE = "Extra Ice",
    REGULAR_ICE = "Regular Ice",
    LESS_ICE = "Less Ice",
    NO_ICE = "No Ice",
  }
  
  export enum SugarLevel {
    EXTRA_SUGAR = "Extra Sugar",
    HUNDRED_PERCENT = "100% Sugar",
    SEVENTY = "70% Sugar",
    FIFTY = "50% Sugar",
    THIRTY = "30% Sugar",
    NO_SUGAR = "No Sugar",
  }

  export const AvailableToppings:string[] =[
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
  ]
  