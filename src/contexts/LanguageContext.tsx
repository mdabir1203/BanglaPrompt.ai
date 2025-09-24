import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "en" | "bn";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const stored = window.localStorage.getItem("promptbazaar-language");
    return stored === "bn" ? "bn" : "en";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("promptbazaar-language", language);
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
