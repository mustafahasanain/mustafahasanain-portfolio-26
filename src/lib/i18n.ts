export const LOCALE_STORAGE_KEY = "portfolio-locale";
export const ARABIC_SUGGESTION_DISMISSED_KEY =
  "portfolio-arabic-suggestion-dismissed";

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getPathLocale(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

function normalizePathname(pathname: string): string {
  const pathnameOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathnameOnly.startsWith("/")
    ? pathnameOnly
    : `/${pathnameOnly}`;

  return withLeadingSlash.length > 1
    ? withLeadingSlash.replace(/\/+$/, "")
    : withLeadingSlash;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const normalizedPathname = normalizePathname(pathname);
  const currentLocale = getPathLocale(normalizedPathname);

  if (currentLocale === locale) {
    return normalizedPathname;
  }

  if (locale === "ar") {
    return normalizedPathname === "/" ? "/ar" : `/ar${normalizedPathname}`;
  }

  const englishPathname = normalizedPathname.slice(3);
  return englishPathname || "/";
}
