import React from 'react';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-semibold text-emerald-700">{text}</p>
      <p className="mt-2 text-sm text-gray-500">Mohon tunggu sebentar...</p>
    </div>
  );
};

export default Loader;
