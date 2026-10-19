import { test, expect, type Page } from "@playwright/test";
const routes = [
  "/",
  "/services",
  "/services/website-design-development",
  "/services/social-media",
  "/services/digital-marketing",
  "/who-we-help",
  "/work",
  "/about",
  "/start-a-project",
];
async function fillBrief(page: Page) {
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Business name").fill("Example studio");
  await page
    .getByLabel("Business type")
    .selectOption("Local or service business");
  await page.getByRole("button", { name: "Next step" }).click();
  await page
    .getByRole("checkbox", {
      name: "Website design & development",
      exact: true,
    })
    .check();
  await page
    .getByLabel("Main challenge & project goals")
    .fill("Help customers understand our services.");
  await page
    .getByLabel("Desired deliverables")
    .fill("Website and an enquiry journey.");
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByLabel("Indicative budget").selectOption("I need guidance");
  await page.getByLabel("Preferred timing").selectOption("Flexible");
  await page.getByRole("button", { name: "Next step" }).click();
}
test("all routes, metadata, internal links and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${m.text()} ${m.location().url}`);
  });
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{30}/,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")!)))
      links.add(href);
  }
  for (const href of links) {
    const path = href.split("#")[0];
    expect(routes).toContain(path);
    if (href.includes("#")) {
      await page.goto(href);
      await expect(page.locator(`[id="${href.split("#")[1]}"]`)).toHaveCount(1);
    }
  }
  expect(errors).toEqual([]);
});
for (const size of [
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 700 },
]) {
  test(`responsive layouts ${size.width}`, async ({ page }) => {
    await page.setViewportSize(size);
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        route,
      ).toBe(true);
    }
    await page.goto("/");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.screenshot({
      path: `test-results/home-${size.width}.png`,
      fullPage: true,
    });
  });
}
test("keyboard service explorer, hero, mobile menu, FAQ and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const tab = page.getByRole("tab").first();
  await tab.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("Social strategy");
  await page.getByRole("button", { name: "03 Action" }).click();
  await expect(page.locator(".stage-description")).toHaveText(
    "Search and campaigns that lead to a considered next step.",
  );
  await page.getByText("Do we need all three services?").click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu +" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu +" })).toBeFocused();
  await expect(page.getByRole("button", { name: "Menu +" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
test("cinematic controls and concept gallery work with keyboard and touch", async ({ page }) => {
  await page.goto("/");
  const motion = page.getByRole("button", { name: "Pause ambient motion" });
  await motion.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Resume ambient motion" })).toHaveAttribute("aria-pressed", "true");
  expect(await page.locator(".cinema-image img").evaluate(element => getComputedStyle(element).animationPlayState)).toBe("paused");
  await page.getByRole("button", { name: "02 Attention" }).click();
  await expect(page.locator(".film-caption")).toContainText("Social content with a point of view");
  await expect(page.locator(".film-caption a")).toHaveAttribute("href", "/services/social-media");
  const relay = page.getByRole("button", { name: /02.*Technology startup.*Relay/ });
  await relay.focus();
  await page.keyboard.press("Enter");
  await expect(relay).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".gallery-frame")).toContainText("Room for");
  await expect(page.getByRole("link", { name: "Inside the concept" })).toHaveAttribute("href", "/work#relay");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /01.*Local landscape studio.*Fieldwork/ }).click();
  await expect(page.locator(".gallery-frame img")).toBeVisible();
  await expect(page.getByRole("link", { name: "Inside the concept" })).toHaveAttribute("href", "/work#fieldwork");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".cinema-image img").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.getByRole("button", { name: "Resume ambient motion" })).not.toBeVisible();
});
test("editorial copy and navigation remain available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("A presence");
  await page.locator(".manifesto h2").scrollIntoViewIfNeeded();
  await expect(page.locator(".manifesto h2")).toBeVisible();
  await expect(page.getByRole("link", { name: "Inside the concept" })).toHaveAttribute("href", "/work#fieldwork");
  await context.close();
});
test("form validates, preserves back navigation, handles failure, and reports preview honestly", async ({
  page,
}) => {
  await page.goto("/start-a-project");
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.locator(".error-summary")).toContainText("A few details");
  await expect(page.locator(".error-summary")).toBeFocused();
  await fillBrief(page);
  await page.getByRole("button", { name: "Edit Your business" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("Alex Example");
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.getByLabel("Main challenge & project goals")).toHaveValue(
    "Help customers understand our services.",
  );
  await page.getByRole("button", { name: "Back", exact: false }).click();
  await expect(page.getByLabel("Business name")).toHaveValue("Example studio");
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByRole("button", { name: "Next step" }).click();
  await page.route("**/api/project-brief", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Delivery unavailable. Please try again.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Finish preview" }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "Delivery unavailable",
  );
  await expect(page.locator(".review")).toContainText("Alex Example");
  await page.unroute("**/api/project-brief");
  await page.getByRole("button", { name: "Finish preview" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your brief is ready. It hasn’t been sent.",
    }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download your brief" }).click();
  expect((await download).suggestedFilename()).toBe("project-brief.txt");
});
test("API rejects malformed and invalid submissions, blocks cross-origin, deduplicates", async ({
  request,
}) => {
  expect(
    (await request.post("/api/project-brief", { data: {} })).status(),
  ).toBe(400);
  const brief = {
    name: "Alex",
    email: "alex@example.com",
    business: "Example",
    website: "",
    businessType: "Local or service business",
    services: ["Website design & development"],
    goals: "Clearer services",
    deliverables: "Website",
    budget: "I need guidance",
    timing: "Flexible",
    context: "",
    companyUrl: "",
  };
  const requestId = crypto.randomUUID();
  const payload = { brief, requestId };
  expect(
    (
      await request.post("/api/project-brief", {
        data: payload,
        headers: { origin: "https://other.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/project-brief", {
        data: { ...payload, brief: { ...brief, email: "invalid" } },
      })
    ).status(),
  ).toBe(422);
  const response = await request.post("/api/project-brief", {
    data: payload,
    headers: { origin: "http://127.0.0.1:3100" },
  });
  expect(await response.json()).toEqual({ mode: "preview" });
  expect(
    await (await request.post("/api/project-brief", { data: payload })).json(),
  ).toEqual({ mode: "preview" });
  expect(
    (
      await request.post("/api/project-brief", {
        data: { ...payload, brief: { ...brief, name: "Changed" } },
      })
    ).status(),
  ).toBe(409);
});
test("preview SEO excludes indexing, and missing routes return 404", async ({
  request,
}) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "<url>",
  );
  expect((await request.get("/not-a-page")).status()).toBe(404);
});

test("automated accessibility checks on all routes and form steps", async ({
  page,
}) => {
  // Measure final rendered colors, rather than intermediate reveal opacity.
  await page.emulateMedia({ reducedMotion: "reduce" });
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const path of routes) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
  }
  await fillBrief(page);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
