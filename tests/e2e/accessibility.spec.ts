import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { caseStudies } from "@/catalog/portfolio";

const screens = [
  "/",
  ...caseStudies.map((study) => `/work/${study.slug}`),
  "/resume",
  "/does-not-exist",
  "/work/does-not-exist",
];

for (const colorScheme of ["light", "dark"] as const) {
  test(`every screen passes axe in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    for (const path of screens) {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations, path).toEqual([]);
    }
  });
}
