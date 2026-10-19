import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyBrief, parseBrief, validateBrief } from "../lib/brief";
import { deliverBrief } from "../lib/delivery";
const valid = {
  ...emptyBrief,
  name: "Alex",
  email: "alex@example.com",
  business: "Example",
  businessType: "Local or service business",
  services: ["Website design & development"],
  goals: "Make services clearer",
  deliverables: "A new website",
  budget: "I need guidance",
  timing: "Flexible",
};
test("complete brief passes; empty brief requires meaningful fields", () => {
  assert.deepEqual(validateBrief(valid), {});
  assert.ok(Object.keys(validateBrief(emptyBrief)).length >= 9);
});
test("validates email, website scheme, selection allowlists, and text bounds", () => {
  const errors = validateBrief({
    ...valid,
    email: "bad",
    website: "javascript:alert(1)",
    services: ["Unknown"],
    budget: "Invented price",
    goals: "x".repeat(4001),
  });
  for (const key of ["email", "website", "services", "budget", "goals"])
    assert.ok(errors[key as keyof typeof errors]);
});
test("steps validate only the currently relevant fields", () => {
  const errors = validateBrief(emptyBrief, 1);
  assert.deepEqual(Object.keys(errors).sort(), [
    "deliverables",
    "goals",
    "services",
  ]);
});
test("parsing rejects malformed values and excludes unexpected fields", () => {
  assert.equal(parseBrief({ ...valid, services: "Website" }), null);
  const result = parseBrief({ ...valid, name: " Alex ", extra: "ignore" });
  assert.equal(result?.name, "Alex");
  assert.equal("extra" in result!, false);
});
test("unconfigured delivery is explicitly preview and makes no outbound request", async () => {
  delete process.env.PROJECT_BRIEF_WEBHOOK_URL;
  const original = global.fetch;
  global.fetch = async () => {
    throw Error("Must not call network");
  };
  try {
    assert.deepEqual(await deliverBrief(valid, "id"), { mode: "preview" });
  } finally {
    global.fetch = original;
  }
});
test("configured adapter sends idempotency key and secret server-side; excludes honeypot", async () => {
  process.env.PROJECT_BRIEF_WEBHOOK_URL = "https://forms.example.com/brief";
  process.env.PROJECT_BRIEF_WEBHOOK_TOKEN = "test-only-token";
  const original = global.fetch;
  global.fetch = async (_url, init) => {
    assert.equal(
      (init?.headers as Record<string, string>)["Idempotency-Key"],
      "request-id",
    );
    assert.equal(
      (init?.headers as Record<string, string>).Authorization,
      "Bearer test-only-token",
    );
    assert.equal(
      "companyUrl" in JSON.parse(init?.body as string).project,
      false,
    );
    return new Response("{}", { status: 200 });
  };
  try {
    assert.deepEqual(await deliverBrief(valid, "request-id"), {
      mode: "delivered",
    });
  } finally {
    global.fetch = original;
    delete process.env.PROJECT_BRIEF_WEBHOOK_URL;
    delete process.env.PROJECT_BRIEF_WEBHOOK_TOKEN;
  }
});
test("delivery rejection propagates instead of reporting success", async () => {
  process.env.PROJECT_BRIEF_WEBHOOK_URL = "https://forms.example.com/brief";
  const original = global.fetch;
  global.fetch = async () => new Response("", { status: 500 });
  try {
    await assert.rejects(() => deliverBrief(valid, "id"));
  } finally {
    global.fetch = original;
    delete process.env.PROJECT_BRIEF_WEBHOOK_URL;
  }
});
test("non-HTTPS configured endpoint is rejected", async () => {
  process.env.PROJECT_BRIEF_WEBHOOK_URL = "http://forms.example.com/brief";
  try {
    await assert.rejects(() => deliverBrief(valid, "id"));
  } finally {
    delete process.env.PROJECT_BRIEF_WEBHOOK_URL;
  }
});
