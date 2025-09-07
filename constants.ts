import { CookingTime, Equipment, SpecialNeeds } from './types';

export const COOKING_TIME_OPTIONS: CookingTime[] = Object.values(CookingTime);
export const EQUIPMENT_OPTIONS: Equipment[] = Object.values(Equipment);
export const SPECIAL_NEEDS_OPTIONS: SpecialNeeds[] = Object.values(SpecialNeeds);

export const DAYS_OF_WEEK: ('Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu')[] = [
  'Senin', 
  'Selasa', 
  'Rabu', 
  'Kamis', 
  'Jumat', 
  'Sabtu', 
  'Minggu'
];
