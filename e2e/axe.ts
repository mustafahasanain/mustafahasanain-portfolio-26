import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/**
 * Runs an axe accessibility scan on the current page state and fails the test
 * if any WCAG A/AA violation is found.
 */
export async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const summary = results.violations.map(
    (violation) =>
      `${violation.id} (${violation.impact ?? "unknown impact"}): ${violation.nodes
        .map((node) => node.target.join(" "))
        .join(", ")}`,
  );

  expect(summary, `axe violations found:\n${summary.join("\n")}`).toEqual([]);
}
