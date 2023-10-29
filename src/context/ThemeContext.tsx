import { createContext } from "react";

// در اینجا مقادیر پیشفرض حالت شب و روز وارد شده است
import { theme } from "./theme";

export type ProviderProps = {
  children: React.ReactNode;
};

export type ThemeState = {
  light: {
    mainBackground: string;
    contentBackground: string;
    text: string;
  };
  dark: {
    mainBackground: string;
    contentBackground: string;
    text: string;
  };
};

export const ThemeContext = createContext<ThemeState>(theme);

export default function ThemeProvider(props: ProviderProps) {
  const themeState: ThemeState = theme;

  return (
    <ThemeContext.Provider value={{ ...themeState }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
