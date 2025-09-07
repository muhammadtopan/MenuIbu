import React, { useState } from 'react';
import { MenuPlan, Meal } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { Icons } from './common/Icons';

interface MenuDisplayProps {
  menuPlan: MenuPlan;
  onGenerateList: () => void;
  onStartOver: () => void;
}

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left p-4">
        <p className="text-xs text-emerald-600 font-semibold">{meal.mealType}</p>
        <h4 className="font-bold text-gray-800">{meal.recipeName}</h4>
        <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
          <span className="flex items-center"><Icons.Clock className="w-4 h-4 mr-1" /> {meal.cookingTimeInMinutes} min</span>
          <span className="flex items-center"><Icons.Fire className="w-4 h-4 mr-1" /> {meal.caloriesPerServing} kkal</span>
        </div>
        <p className="text-xs text-gray-600 mt-2 italic">"{meal.description}"</p>
        {meal.tags && meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {meal.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </button>
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fade-in">
          <h5 className="font-semibold mb-1">Bahan-bahan:</h5>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
            {meal.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.name}</li>)}
          </ul>
          <h5 className="font-semibold mb-1">Cara Memasak:</h5>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            {meal.instructions.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
};


const MenuDisplay: React.FC<MenuDisplayProps> = ({ menuPlan, onGenerateList, onStartOver }) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Rencana Menu Keluarga Anda</h2>
        <p className="text-gray-600">Ini dia rencana menu untuk seminggu ke depan. Selamat memasak, Bu!</p>
      </div>

      <div className="space-y-8">
        {DAYS_OF_WEEK.map(dayName => {
          const dayPlan = menuPlan.find(p => p.day === dayName);
          if (!dayPlan) return null;

          return (
            <div key={dayName} className="bg-white p-5 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-emerald-700">{dayName}</h3>
                <p className="text-sm font-medium text-gray-500">Total: {dayPlan.dailyCalorieTotal} kkal</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dayPlan.meals.map((meal, index) => (
                  <MealCard key={`${dayName}-${index}`} meal={meal} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button 
            onClick={onStartOver}
            className="w-full md:w-auto flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Buat Rencana Baru
        </button>
        <button 
            onClick={onGenerateList}
            className="w-full md:w-auto flex-1 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105"
        >
          Buatkan Daftar Belanja Pintar
        </button>
      </div>
    </div>
  );
};

export default MenuDisplay;
