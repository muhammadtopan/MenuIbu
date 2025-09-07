import React, { useState, useCallback } from 'react';
import { UserPreferences, MenuPlan, ShoppingList } from './types';
import Onboarding from './components/Onboarding';
import PantryAndBudget from './components/PantryAndBudget';
import MenuDisplay from './components/MenuDisplay';
import ShoppingListDisplay from './components/ShoppingListDisplay';
import Loader from './components/common/Loader';
import Header from './components/common/Header';
import { generateMenuPlan, generateShoppingList } from './services/geminiService';

enum AppState {
  ONBOARDING,
  PANTRY_BUDGET,
  GENERATING_MENU,
  MENU_VIEW,
  GENERATING_LIST,
  LIST_VIEW,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [pantry, setPantry] = useState<string>('');
  const [menuPlan, setMenuPlan] = useState<MenuPlan | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setAppState(AppState.PANTRY_BUDGET);
  };
  
  const handlePantryAndBudgetSubmit = useCallback(async (pantryItems: string, weeklyBudget: number) => {
    if (!preferences) return;
    
    const updatedPrefs = { ...preferences, weeklyBudget };
    setPreferences(updatedPrefs);
    setPantry(pantryItems);
    setAppState(AppState.GENERATING_MENU);
    setError(null);

    try {
      const plan = await generateMenuPlan(updatedPrefs, pantryItems);
      setMenuPlan(plan);
      setAppState(AppState.MENU_VIEW);
    } catch (err) {
      console.error(err);
      setError('Maaf, terjadi kesalahan saat menyusun menu. Coba lagi nanti ya, Bu.');
      setAppState(AppState.PANTRY_BUDGET); // Go back to prev step on error
    }
  }, [preferences]);

  const handleGenerateShoppingList = useCallback(async () => {
    if (!menuPlan || !pantry) return;

    setAppState(AppState.GENERATING_LIST);
    setError(null);

    try {
      const list = await generateShoppingList(menuPlan, pantry);
      setShoppingList(list);
      setAppState(AppState.LIST_VIEW);
    } catch (err) {
      console.error(err);
      setError('Maaf, terjadi kesalahan saat membuat daftar belanja. Coba lagi nanti ya, Bu.');
      setAppState(AppState.MENU_VIEW); // Go back
    }
  }, [menuPlan, pantry]);

  const handleBackToMenu = () => {
    setAppState(AppState.MENU_VIEW);
    setShoppingList(null);
  };
  
  const handleStartOver = () => {
    setAppState(AppState.ONBOARDING);
    setPreferences(null);
    setMenuPlan(null);
    setShoppingList(null);
    setPantry('');
    setError(null);
  }

  const renderContent = () => {
    if (error) {
       return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-bold text-lg mb-2">Oops! Terjadi Masalah</p>
          <p>{error}</p>
          <button
            onClick={() => setAppState(AppState.ONBOARDING)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Mulai dari Awal
          </button>
        </div>
      );
    }

    switch (appState) {
      case AppState.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppState.PANTRY_BUDGET:
        return <PantryAndBudget onSubmit={handlePantryAndBudgetSubmit} initialBudget={preferences?.weeklyBudget || 150000} />;
      case AppState.GENERATING_MENU:
        return <Loader text="Sedang menyusun menu spesial untuk keluarga Ibu..." />;
      case AppState.MENU_VIEW:
        return menuPlan && <MenuDisplay menuPlan={menuPlan} onGenerateList={handleGenerateShoppingList} onStartOver={handleStartOver} />;
      case AppState.GENERATING_LIST:
        return <Loader text="Menghitung belanjaan dan mencari harga terbaik..." />;
      case AppState.LIST_VIEW:
        return shoppingList && <ShoppingListDisplay shoppingList={shoppingList} onBack={handleBackToMenu} />;
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        <p>&copy; 2024 MenuIbu. Dibuat dengan ❤️ untuk para Ibu hebat di Indonesia.</p>
      </footer>
    </div>
  );
};

export default App;
