export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_CHANGE_EVENT = "portfolio-theme-change";

export const DEFAULT_THEME = "dark";

export type Theme = "dark" | "light";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export const themeInitializationScript = `
  (function () {
    var theme = "${DEFAULT_THEME}";

    try {
      var savedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
      if (savedTheme === "dark" || savedTheme === "light") {
        theme = savedTheme;
      }
    } catch (error) {}

    document.documentElement.setAttribute("data-theme", theme);
  })();
`;
