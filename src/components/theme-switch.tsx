"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  isTheme,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

function getThemeFromDocument(): Theme {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : DEFAULT_THEME;
}

function getStoredTheme(): Theme {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(theme) ? theme : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function subscribeToTheme(onThemeChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    applyTheme(isTheme(event.newValue) ? event.newValue : DEFAULT_THEME);
    onThemeChange();
  }

  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function persistTheme(theme: Theme) {
  applyTheme(theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still applies for this page when storage is blocked.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeFromDocument,
    () => DEFAULT_THEME,
  );
  const nextTheme = theme === "dark" ? "light" : "dark";

  useLayoutEffect(() => {
    // React Strict Mode can restore the server attribute during development.
    // Reapplying the stored value keeps development and production equivalent.
    applyTheme(getStoredTheme());
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
      onClick={() => persistTheme(nextTheme)}
      aria-label={`Current theme: ${theme}. Switch to ${nextTheme} theme`}
    >
      <span aria-hidden="true">Use {nextTheme} theme</span>
    </button>
  );
}
