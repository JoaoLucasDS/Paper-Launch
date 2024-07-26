// components/ThemeSwitcher.js
import { useState } from 'react';
import { Switch, cn } from "@nextui-org/react";
import { useTheme } from 'next-themes';

import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

const ThemeSwitcher = () => {

};
export const ThemeSwitch = ({
}) => {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'light');

  const handleChange = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    setEnabled(!enabled)
  };

  const [enabled, setEnabled] = useState(theme === 'light' ? false : true);

  return (
    <div
      className={`w-16 h-6 flex items-center cursor-pointer border-3 ${
        enabled ? 'bg-white border-black' : 'bg-black border-white'
      }`}
      onClick={handleChange}
    >
      <div
        className={`w-8 h-5 ${enabled ? 'bg-black' : 'bg-white'} border-black transform transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </div>
  );
};
