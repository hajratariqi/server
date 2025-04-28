import React from 'react';
import { LogOut, LogIn } from 'lucide-react';

const Header = ({user}) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <header className="px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-2xl">Task Tracker</h1>
        {user ? (
        <button onClick={logout} className="flex items-center gap-2 bg-[#4e342e] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#6d4c41] transition-all duration-300"><LogOut size={20} /> Logout</button>
      ):(
        <button onClick={logout} className="flex items-center gap-2 bg-[#4e342e] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#6d4c41] transition-all duration-300"><LogIn  size={20} /> Get started</button> 
      )}
      </div>
    </header>
  );
};

export default Header;
