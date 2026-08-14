import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Theme foundation</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Mustafa Hasanain
          </h1>
        </div>
        <ThemeSwitch />
      </div>

      <section
        aria-labelledby="theme-demo-title"
        className="space-y-4 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 id="theme-demo-title" className="text-xl font-semibold">
          Dark and light, by choice
        </h2>
        <p className="leading-7 text-muted">
          Dark is the first-visit default. Your explicit selection is kept for
          later visits.
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <span className="rounded-full bg-primary px-3 py-1.5 text-primary-foreground">
            Primary
          </span>
          <span className="rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
            Accent
          </span>
          <span className="text-success">Success</span>
          <span className="text-destructive">Error</span>
        </div>
      </section>
    </main>
  );
}
