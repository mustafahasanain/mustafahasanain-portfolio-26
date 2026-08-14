"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocalizedPath,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  text: string;
}

export function persistLocaleChoice(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Navigation still works when storage is unavailable.
  }
}

export function LanguageSwitcher({
  locale,
  label,
  text,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "ar" : "en";
  const href = getLocalizedPath(pathname, targetLocale);

  return (
    <Link
      href={href}
      hrefLang={targetLocale}
      lang={targetLocale}
      dir={targetLocale === "ar" ? "rtl" : "ltr"}
      aria-label={label}
      onClick={() => persistLocaleChoice(targetLocale)}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
    >
      <span aria-hidden="true">{text}</span>
    </Link>
  );
}
