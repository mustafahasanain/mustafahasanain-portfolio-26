import { LanguageSuggestion } from "@/components/language-suggestion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitch } from "@/components/theme-switch";
import { getDictionary, type PageKey } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

interface LocalizedPageProps {
  locale: Locale;
  page: PageKey;
}

export function LocalizedPage({ locale, page }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const pageContent = dictionary.pages[page];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <LanguageSuggestion
        locale={locale}
        label={dictionary.shared.suggestionLabel}
        text={dictionary.shared.suggestionText}
        acceptLabel={dictionary.shared.suggestionAccept}
        dismissLabel={dictionary.shared.suggestionDismiss}
      />

      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            {dictionary.shared.foundationLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {pageContent.title}
          </h1>
          {page !== "home" && (
            <p className="leading-7 text-muted">{pageContent.description}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <LanguageSwitcher
            locale={locale}
            label={dictionary.shared.languageSwitchLabel}
            text={dictionary.shared.languageSwitchText}
          />
          <ThemeSwitch labels={dictionary.shared.theme} />
        </div>
      </div>

      {page === "home" && (
        <section
          aria-labelledby="locale-demo-title"
          className="space-y-4 rounded-2xl border border-border bg-surface p-6"
        >
          <h2 id="locale-demo-title" className="text-xl font-semibold">
            {dictionary.home.demoTitle}
          </h2>
          <p className="leading-7 text-muted">
            {dictionary.home.demoDescription}
          </p>
          <p className="leading-7 text-muted">
            {dictionary.home.technologyPrefix} {" "}
            <bdi dir="ltr">Next.js</bdi>, <bdi dir="ltr">React</bdi> {" "}
            {dictionary.home.technologySuffix}
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="rounded-full bg-primary px-3 py-1.5 text-primary-foreground">
              {dictionary.home.primary}
            </span>
            <span className="rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
              {dictionary.home.accent}
            </span>
            <span className="text-success">{dictionary.home.success}</span>
            <span className="text-destructive">{dictionary.home.error}</span>
          </div>
        </section>
      )}
    </main>
  );
}
