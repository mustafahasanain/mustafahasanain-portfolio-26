import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitch } from "@/components/theme-switch";
import { getDictionary } from "@/lib/dictionaries";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

export function LocalizedNotFound({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {dictionary.notFound.title}
      </h1>
      <p className="leading-7 text-muted">{dictionary.notFound.description}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={getLocalizedPath("/", locale)}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          {dictionary.notFound.homeLink}
        </Link>
        <LanguageSwitcher
          locale={locale}
          label={dictionary.shared.languageSwitchLabel}
          text={dictionary.shared.languageSwitchText}
        />
        <ThemeSwitch labels={dictionary.shared.theme} />
      </div>
    </main>
  );
}
