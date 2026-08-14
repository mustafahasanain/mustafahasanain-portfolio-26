import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getDictionary } from "@/lib/dictionaries";
import { getLocaleDirection, type Locale } from "@/lib/i18n";
import { DEFAULT_THEME, themeInitializationScript } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function getLocaleMetadata(locale: Locale): Metadata {
  return getDictionary(locale).metadata;
}

export function LocaleDocument({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html
      lang={locale}
      dir={getLocaleDirection(locale)}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-start">
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        {children}
      </body>
    </html>
  );
}
