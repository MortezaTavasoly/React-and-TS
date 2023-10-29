import { createContext } from "react";
import { ProviderProps } from "./ThemeContext";

// در این قسمت زبان پیشفرض وارد شده است
import { language } from "./language";

// این قسمت تعیین کننده ی غالب کانتکست است
export type LanguageState = {
  locale: string;
  setLocale: () => void;
};

// در این قسمت کانتکست ساخته میشود و زبان پیشفرض به آن داده میشود
export const LanguageContext = createContext<LanguageState>(language);

// قسمت پروایدر برای تعیین محدوده ی قابل درسترس بودن یک داده ی گلوبال
export default function LocaleContext({ children }: ProviderProps) {
  const langState: LanguageState = language;
  return (
    <LanguageContext.Provider value={{ ...langState }}>
      {children}
    </LanguageContext.Provider>
  );
}
