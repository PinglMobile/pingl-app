import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  // const [theme, setTheme] = useState(
  // systemTheme === "dark" ? darkTheme : lightTheme
  //);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.dark ? lightTheme : darkTheme));
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
