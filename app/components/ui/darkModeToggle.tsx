"use client"

import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update your app's theme
    // For example: document.body.classList.toggle('dark-mode');
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isDarkMode ? 'bg-indigo-600' : 'bg-yellow-400'
      }`}
      role="switch"
      aria-checked={isDarkMode}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`absolute inset-0.5 flex items-center justify-center w-7 h-7 rounded-full bg-white transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {isDarkMode ? (
          <Moon size={16} className="text-indigo-600" />
        ) : (
          <Sun size={16} className="text-yellow-400" />
        )}
      </span>
      <span className={`absolute ${isDarkMode ? 'left-2' : 'right-2'} text-white`}>
        {isDarkMode ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )}
      </span>
    </button>
  );
};

export default DarkModeToggle;