export enum CookingTime {
  Under15 = "≤ 15 menit",
  Under30 = "≤ 30 menit",
  Under45 = "≤ 45 menit",
}

export enum Equipment {
  Stove = "Kompor",
  Oven = "Oven",
  AirFryer = "Air Fryer",
  RiceCooker = "Rice Cooker",
  Blender = "Blender",
  Microwave = "Microwave",
}

export enum SpecialNeeds {
  MPASI = "MPASI",
  LowSalt = "Rendah Garam",
  DiabetesFriendly = "Ramah Diabetes",
  LowSugar = "Rendah Gula",
  Vegetarian = "Vegetarian",
}

export interface UserPreferences {
  allergies: string;
  tastePreferences: string;
  dailyCalories: number;
  cookingTime: CookingTime;
  equipment: Equipment[];
  specialNeeds: SpecialNeeds[];
  weeklyBudget: number;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Meal {
  mealType: 'Sarapan' | 'Makan Siang' | 'Makan Malam' | 'Camilan';
  recipeName: string;
  description: string;
  cookingTimeInMinutes: number;
  caloriesPerServing: number;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
}

export interface DayPlan {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  meals: Meal[];
  dailyCalorieTotal: number;
}

export type MenuPlan = DayPlan[];

export interface ShoppingListItem {
  itemName: string;
  quantity: string;
  estimatedPrice: number;
}

export interface ShoppingList {
  'Sayuran & Buah': ShoppingListItem[];
  'Daging & Ikan': ShoppingListItem[];
  'Produk Susu & Telur': ShoppingListItem[];
  'Bumbu Dapur': ShoppingListItem[];
  'Bahan Kering': ShoppingListItem[];
  'Lainnya': ShoppingListItem[];
  totalEstimatedCost: number;
}
