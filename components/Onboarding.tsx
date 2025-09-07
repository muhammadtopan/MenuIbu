import React, { useState } from 'react';
import { UserPreferences, CookingTime, Equipment, SpecialNeeds } from '../types';
import { COOKING_TIME_OPTIONS, EQUIPMENT_OPTIONS, SPECIAL_NEEDS_OPTIONS } from '../constants';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({
    dailyCalories: 2000,
    cookingTime: CookingTime.Under30,
    equipment: [Equipment.Stove, Equipment.RiceCooker],
    specialNeeds: [],
    allergies: '',
    tastePreferences: ''
  });

  const handleCheckboxChange = <T,>(field: keyof UserPreferences, value: T) => {
    setPrefs(prev => {
      const currentValues = (prev[field] as T[] || []) as T[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // weeklyBudget will be set in the next step
    onComplete({ ...prefs, weeklyBudget: 0 } as UserPreferences);
  };
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-emerald-800 mb-2">Selamat Datang di MenuIbu!</h2>
      <p className="text-gray-600 mb-6">Yuk, atur preferensi keluarga Ibu agar kami bisa memberikan rekomendasi menu terbaik.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2">Preferensi Rasa atau Makanan Favorit Keluarga</label>
          <input
            type="text"
            placeholder="Contoh: Suka pedas, suka masakan Sunda, anak-anak suka ayam goreng"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            onChange={e => setPrefs(p => ({ ...p, tastePreferences: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2">Alergi Makanan (jika ada)</label>
          <input
            type="text"
            placeholder="Contoh: Alergi udang, kacang, produk susu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            onChange={e => setPrefs(p => ({ ...p, allergies: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="calories" className="block text-md font-semibold text-gray-700 mb-2">Estimasi Kebutuhan Kalori Harian per Orang</label>
          <div className="flex items-center gap-4">
            <input
              id="calories"
              type="range"
              min="1200"
              max="3000"
              step="100"
              value={prefs.dailyCalories}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              onChange={e => setPrefs(p => ({ ...p, dailyCalories: parseInt(e.target.value) }))}
            />
            <span className="font-semibold text-emerald-700 w-24 text-center">{prefs.dailyCalories} kkal</span>
          </div>
        </div>
        
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2">Waktu Masak Maksimal per Hidangan</label>
          <div className="flex flex-wrap gap-2">
            {COOKING_TIME_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setPrefs(p => ({ ...p, cookingTime: opt }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${prefs.cookingTime === opt ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2">Peralatan Masak yang Tersedia</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {EQUIPMENT_OPTIONS.map(opt => (
              <label key={opt} className={`flex items-center p-3 rounded-lg cursor-pointer border-2 transition-all ${prefs.equipment?.includes(opt) ? 'bg-emerald-100 border-emerald-500' : 'bg-white border-gray-200'}`}>
                <input
                  type="checkbox"
                  checked={prefs.equipment?.includes(opt)}
                  onChange={() => handleCheckboxChange('equipment', opt)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2">Kebutuhan Diet Khusus (opsional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SPECIAL_NEEDS_OPTIONS.map(opt => (
              <label key={opt} className={`flex items-center p-3 rounded-lg cursor-pointer border-2 transition-all ${prefs.specialNeeds?.includes(opt) ? 'bg-emerald-100 border-emerald-500' : 'bg-white border-gray-200'}`}>
                <input
                  type="checkbox"
                  checked={prefs.specialNeeds?.includes(opt)}
                  onChange={() => handleCheckboxChange('specialNeeds', opt)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          Lanjut ke Stok Dapur & Anggaran
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
