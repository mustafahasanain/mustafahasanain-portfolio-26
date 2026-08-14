"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { persistLocaleChoice } from "@/components/language-switcher";
import {
  ARABIC_SUGGESTION_DISMISSED_KEY,
  getLocalizedPath,
  isLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n";

interface LanguageSuggestionProps {
  locale: Locale;
  label: string;
  text: string;
  acceptLabel: string;
  dismissLabel: string;
}

const SUGGESTION_CHANGE_EVENT = "portfolio-language-suggestion-change";
let dismissedForCurrentPage = false;

function browserPrefersArabic(): boolean {
  const preferredLanguages = [
    navigator.language,
    ...(navigator.languages ?? []),
  ];

  return preferredLanguages.some((language) => {
    const normalizedLanguage = language.toLowerCase();
    return normalizedLanguage === "ar" || normalizedLanguage.startsWith("ar-");
  });
}

function shouldShowSuggestion(locale: Locale): boolean {
  if (
    dismissedForCurrentPage ||
    locale !== "en" ||
    !browserPrefersArabic()
  ) {
    return false;
  }

  try {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    const wasDismissed =
      localStorage.getItem(ARABIC_SUGGESTION_DISMISSED_KEY) === "true";

    return !isLocale(savedLocale) && !wasDismissed;
  } catch {
    return true;
  }
}

function subscribeToSuggestion(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SUGGESTION_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SUGGESTION_CHANGE_EVENT, onChange);
  };
}

export function LanguageSuggestion({
  locale,
  label,
  text,
  acceptLabel,
  dismissLabel,
}: LanguageSuggestionProps) {
  const pathname = usePathname();
  const isVisible = useSyncExternalStore(
    subscribeToSuggestion,
    () => shouldShowSuggestion(locale),
    () => false,
  );

  if (!isVisible) {
    return null;
  }

  const arabicPath = getLocalizedPath(pathname, "ar");

  function dismissSuggestion() {
    dismissedForCurrentPage = true;

    try {
      localStorage.setItem(ARABIC_SUGGESTION_DISMISSED_KEY, "true");
    } catch {
      // The suggestion can still be dismissed for this page view.
    }

    window.dispatchEvent(new Event(SUGGESTION_CHANGE_EVENT));
  }

  return (
    <aside
      aria-label={label}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="leading-7 text-foreground">{text}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={arabicPath}
          hrefLang="ar"
          onClick={() => persistLocaleChoice("ar")}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          {acceptLabel}
        </Link>
        <button
          type="button"
          onClick={dismissSuggestion}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
        >
          {dismissLabel}
        </button>
      </div>
    </aside>
  );
}
