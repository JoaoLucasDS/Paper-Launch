// components/ThemeSwitcher.js
import { useState, useEffect } from 'react';
import { Switch, cn } from "@nextui-org/react";
import { useTheme } from 'next-themes';

import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

const ThemeSwitcher = () => {

};
export const ThemeSwitch = ({
}) => {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'light');

    // Initialize the state based on the theme
    useEffect(() => {
      setIsDarkMode(theme === 'dark');
    }, [theme]);
  

  const handleChange = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    setEnabled(!enabled)
  };

  const [enabled, setEnabled] = useState(theme === 'light' ? false : true);

  return (
    <div
      className={`w-16 h-7 flex items-center cursor-pointer border-3 ${
        isDarkMode ? 'bg-black border-white' : 'bg-white border-black'
      }`}
      onClick={handleChange}
    >
      <div
        className={`w-8 h-6 ${isDarkMode ? 'bg-white' : 'bg-black'} border-black transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-0' : 'translate-x-7'
        }`}
      />
    </div>
  );
};
