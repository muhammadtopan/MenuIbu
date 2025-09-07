import React, { useState } from 'react';

interface PantryAndBudgetProps {
  onSubmit: (pantry: string, weeklyBudget: number) => void;
  initialBudget: number;
}

const PantryAndBudget: React.FC<PantryAndBudgetProps> = ({ onSubmit, initialBudget }) => {
  const [pantry, setPantry] = useState('');
  const [budget, setBudget] = useState(initialBudget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pantry, budget);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-emerald-800 mb-2">Stok Dapur & Anggaran</h2>
      <p className="text-gray-600 mb-6">Tinggal satu langkah lagi, Bu! Masukkan sisa bahan di dapur dan anggaran belanja mingguan.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="pantry" className="block text-md font-semibold text-gray-700 mb-2">Bahan Makanan yang Sudah Ada di Dapur</label>
          <textarea
            id="pantry"
            rows={4}
            placeholder="Contoh: Beras 2kg, telur 5 butir, bawang merah, bawang putih, minyak goreng, kecap manis"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            value={pantry}
            onChange={(e) => setPantry(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Pisahkan setiap bahan dengan koma untuk hasil yang lebih akurat.</p>
        </div>

        <div>
          <label htmlFor="budget" className="block text-md font-semibold text-gray-700 mb-2">Anggaran Belanja Mingguan (IDR)</label>
           <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rp</span>
            <input
              id="budget"
              type="number"
              min="50000"
              step="10000"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          Buatkan Rencana Menu!
        </button>
      </form>
    </div>
  );
};

export default PantryAndBudget;
