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
    baseColor: string;
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
    SEVENTY = "70%",
    FIFTY = "50%",
    THIRTY = "30%",
    NO_SUGAR = "No Sugar",
  }
  