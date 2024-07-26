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
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleChange = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Switch
      classNames={{
        base: cn(
          "justify-between cursor-pointer rounded-lg  border-2 border-transparent w-12",
          "border-primary",
        ),
        wrapper: "p-0 h-4  overflow-visible bg-blue ",
        thumb: cn("w-10 h-10 border-2 shadow-lg",
          "group-data-[hover=true]:border-primary",
          //selected
          "group-data-[selected=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-8",
        ),
      }}
    >
    </Switch>
  );
};
