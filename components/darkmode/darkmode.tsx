import React, { useState, useEffect } from 'react';
import LightModeImage from '@/public/light1.jpg';
import DarkModeImage from '@/public/dark1.jpg';

function DarkMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const element = document.documentElement;

    if (theme === 'dark') {
      element.classList.add('dark');
      element.classList.remove('light');
    } else {
      element.classList.add('light');
      element.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        src={LightModeImage}
        alt="Light Mode"
        className={`w-12 cursor-pointer absolute right-0 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-100'
        } transition-all duration-300`}
      />
      <img
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        src={DarkModeImage}
        alt="Dark Mode"
        className={`w-12 cursor-pointer `}
      />
    </div>
  );
}

export default DarkMode;
