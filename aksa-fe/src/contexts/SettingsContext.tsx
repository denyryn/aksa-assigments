import React, { createContext, useEffect, useState } from "react";
import type { Theme } from "../types/theme";

type Settings = {
  theme: Theme;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
};

const STORAGE_KEY = "settings";
const defaultSettings: Settings = { theme: "light" };

const SettingsContext = createContext<SettingsContextType | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.toggle("dark", isDark);
}

function getStoredSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;

  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(getStoredSettings);

  useEffect(() => {
    applyTheme(settings.theme);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    if (settings.theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings.theme]);

  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings: setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
