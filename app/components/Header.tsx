import React from 'react';

  
const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Realtime Chat App</h1>
      </div>
      <div className="flex items-center">
        <a href="/" className="text-white px-2">Home</a>
        <a href="/profile" className="text-white px-2">Profile</a>
      </div>
    </header>
  );
};

export default Header;
