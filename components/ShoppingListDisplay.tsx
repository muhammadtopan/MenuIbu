import React from 'react';
import { ShoppingList, ShoppingListItem } from '../types';
import { Icons } from './common/Icons';

interface ShoppingListDisplayProps {
  shoppingList: ShoppingList;
  onBack: () => void;
}

const ShoppingListCategory: React.FC<{ title: string; items: ShoppingListItem[] }> = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span className="text-gray-800">{item.itemName} <span className="text-gray-500">({item.quantity})</span></span>
            <span className="text-sm font-medium text-gray-600">Rp {item.estimatedPrice.toLocaleString('id-ID')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShoppingListDisplay: React.FC<ShoppingListDisplayProps> = ({ shoppingList, onBack }) => {

  const formatListForSharing = () => {
    let text = "*Daftar Belanja MenuIbu*\n\n";
    Object.entries(shoppingList).forEach(([category, items]) => {
      if (category === 'totalEstimatedCost' || (items as ShoppingListItem[]).length === 0) return;
      text += `*${category}*\n`;
      (items as ShoppingListItem[]).forEach(item => {
        text += `- ${item.itemName} (${item.quantity})\n`;
      });
      text += '\n';
    });
    text += `*Total Estimasi Biaya: Rp ${shoppingList.totalEstimatedCost.toLocaleString('id-ID')}*`;
    return encodeURIComponent(text);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-emerald-800 mb-2">Daftar Belanja Pintar Anda</h2>
      <p className="text-gray-600 mb-6">Semua sudah dikelompokkan agar belanja lebih mudah dan cepat. Hemat waktu, hemat uang!</p>
      
      <div className="space-y-6">
        <ShoppingListCategory title="Sayuran & Buah" items={shoppingList['Sayuran & Buah']} />
        <ShoppingListCategory title="Daging & Ikan" items={shoppingList['Daging & Ikan']} />
        <ShoppingListCategory title="Produk Susu & Telur" items={shoppingList['Produk Susu & Telur']} />
        <ShoppingListCategory title="Bumbu Dapur" items={shoppingList['Bumbu Dapur']} />
        <ShoppingListCategory title="Bahan Kering" items={shoppingList['Bahan Kering']} />
        <ShoppingListCategory title="Lainnya" items={shoppingList['Lainnya']} />
      </div>

      <div className="mt-8 p-4 bg-emerald-100 border-l-4 border-emerald-500 rounded-r-lg">
        <p className="text-lg font-bold text-emerald-800">
          Total Estimasi Biaya: Rp {shoppingList.totalEstimatedCost.toLocaleString('id-ID')}
        </p>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button onClick={onBack} className="w-full md:w-auto flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
          Kembali ke Rencana Menu
        </button>
        <div className="w-full md:w-auto flex-1 flex gap-4">
          <a
            href={`https://wa.me/?text=${formatListForSharing()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Icons.WhatsApp className="w-5 h-5" /> Kirim
          </a>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
             <Icons.Print className="w-5 h-5" /> Cetak/PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListDisplay;
