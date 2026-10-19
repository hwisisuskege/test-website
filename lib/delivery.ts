import type { Brief } from "./brief";
export function deliveryConfigured() {
  return Boolean(process.env.PROJECT_BRIEF_WEBHOOK_URL);
}
/** Adapter contract: authenticated HTTPS JSON POST. The receiver must durably store the brief and honor Idempotency-Key before replying 2xx. */
export async function deliverBrief(brief: Brief, requestId: string) {
  const endpoint = process.env.PROJECT_BRIEF_WEBHOOK_URL;
  if (!endpoint) return { mode: "preview" as const };
  const url = new URL(endpoint);
  if (url.protocol !== "https:")
    throw new Error("Delivery endpoint must use HTTPS.");
  const { companyUrl: _honeypot, ...project } = brief;
  void _honeypot;
  const response = await fetch(url, {
    method: "POST",
    redirect: "error",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": requestId,
      ...(process.env.PROJECT_BRIEF_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.PROJECT_BRIEF_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      requestId,
      submittedAt: new Date().toISOString(),
      project,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok)
    throw new Error("Delivery service did not accept the brief.");
  return { mode: "delivered" as const };
}
