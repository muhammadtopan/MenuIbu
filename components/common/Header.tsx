import React from 'react';
import { Icons } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto py-4 px-4 md:px-8 flex items-center justify-center">
        <Icons.Logo className="h-10 w-10 text-emerald-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 ml-3">
          MenuIbu
        </h1>
      </div>
    </header>
  );
};

export default Header;
