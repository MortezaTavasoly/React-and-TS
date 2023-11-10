import { createContext } from "react";
import { ProviderProps } from "./ThemeContext";

import { language } from "./language";

export type LanguageState = {
  locale: string;
  setLocale: () => void;
};

export const LanguageContext = createContext<LanguageState>(language);

export default function LocaleContext({ children }: ProviderProps) {
  const langState: LanguageState = language;
  return (
    <LanguageContext.Provider value={{ ...langState }}>
      {children}
    </LanguageContext.Provider>
  );
}
