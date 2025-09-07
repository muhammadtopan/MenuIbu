import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, MenuPlan, ShoppingList } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const menuPlanSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      day: { type: Type.STRING, description: "Nama hari (contoh: Senin)" },
      dailyCalorieTotal: { type: Type.NUMBER, description: "Total kalori untuk hari itu" },
      meals: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            mealType: { type: Type.STRING, description: "Jenis makanan (Sarapan, Makan Siang, Makan Malam, Camilan)" },
            recipeName: { type: Type.STRING, description: "Nama resep masakan Indonesia" },
            description: { type: Type.STRING, description: "Deskripsi singkat dan menarik" },
            cookingTimeInMinutes: { type: Type.NUMBER, description: "Waktu memasak dalam menit" },
            caloriesPerServing: { type: Type.NUMBER, description: "Estimasi kalori per porsi" },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.STRING }
                }
              }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Tag relevan seperti 'Porsi Besar', 'Bisa untuk Besok', 'Rendah Gula', dll."
            }
          }
        }
      }
    }
  }
};

export const generateMenuPlan = async (preferences: UserPreferences, pantry: string): Promise<MenuPlan> => {
  const prompt = `
    Anda adalah 'MenuIbu', asisten kuliner ahli untuk ibu rumah tangga di Indonesia.
    Tugas Anda adalah membuat rencana menu mingguan (7 hari) yang HALAL, lezat, sehat, dan hemat.
    
    Berikut adalah preferensi pengguna:
    - Alergi: ${preferences.allergies || 'Tidak ada'}
    - Selera: ${preferences.tastePreferences || 'Suka masakan rumahan Indonesia pada umumnya'}
    - Batas Kalori Harian per Orang: ${preferences.dailyCalories} kkal
    - Waktu Masak Maksimal per Hidangan: ${preferences.cookingTime}
    - Peralatan Masak yang Tersedia: ${preferences.equipment.join(', ')}
    - Kebutuhan Khusus: ${preferences.specialNeeds.join(', ') || 'Tidak ada'}
    - Anggaran Mingguan: Rp ${preferences.weeklyBudget.toLocaleString('id-ID')}
    - Bahan yang Sudah Ada di Dapur (prioritaskan untuk dipakai): ${pantry || 'Tidak ada'}

    Instruksi:
    1. Buat rencana menu untuk 7 hari (Senin-Minggu).
    2. Setiap hari harus ada Sarapan, Makan Siang, Makan Malam, dan satu Camilan.
    3. Semua resep harus menggunakan bahan-bahan yang mudah ditemukan di pasar tradisional atau supermarket di Indonesia.
    4. Berikan saran untuk memasak porsi besar (batch cooking) dan cara mengolah sisa makanan (leftovers) untuk menu hari berikutnya untuk menghemat waktu dan biaya. Tandai dengan tag yang sesuai.
    5. Jika ada bahan yang sulit ditemukan, secara proaktif sarankan bahan pengganti lokal yang umum di deskripsi.
    6. Pastikan total biaya bahan untuk seminggu (di luar yang sudah ada di dapur) tidak melebihi anggaran.
    7. Prioritaskan menu masakan rumahan khas Indonesia.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: menuPlanSchema,
      temperature: 0.7,
    }
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText);
};


const shoppingListSchema = {
  type: Type.OBJECT,
  properties: {
    'Sayuran & Buah': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
    'Daging & Ikan': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
     'Produk Susu & Telur': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
    'Bumbu Dapur': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
    'Bahan Kering': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
    'Lainnya': {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          quantity: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER }
        }
      }
    },
    totalEstimatedCost: { type: Type.NUMBER, description: "Total estimasi biaya belanja dalam Rupiah (IDR)" }
  }
};


export const generateShoppingList = async (menuPlan: MenuPlan, pantry: string): Promise<ShoppingList> => {
  const prompt = `
    Berdasarkan Rencana Menu Mingguan berikut dan daftar bahan yang sudah ada di dapur, buatlah daftar belanja yang terperinci.

    Bahan yang Sudah Ada di Dapur (jangan dimasukkan ke daftar belanja):
    ${pantry}

    Rencana Menu:
    ${JSON.stringify(menuPlan, null, 2)}

    Instruksi:
    1. Akumulasi semua bahan yang dibutuhkan dari seluruh resep dalam rencana menu.
    2. Kurangi bahan yang sudah ada di dapur dari daftar total.
    3. Kelompokkan sisa bahan yang perlu dibeli ke dalam kategori berikut: 'Sayuran & Buah', 'Daging & Ikan', 'Produk Susu & Telur', 'Bumbu Dapur', 'Bahan Kering' (beras, terigu, dll.), dan 'Lainnya'.
    4. Untuk setiap item, berikan nama item, kuantitas yang dibutuhkan (misal: "250 gr", "1 ikat", "3 siung"), dan estimasi harga dalam Rupiah (IDR) berdasarkan harga pasar umum di Indonesia.
    5. Hitung total estimasi biaya untuk semua item dalam daftar belanja.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: shoppingListSchema,
      temperature: 0.2,
    }
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText);
};
