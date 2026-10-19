import { site } from "./site";
export const serviceOptions = [
  "Website design & development",
  "Social media",
  "Digital marketing",
  "I need guidance",
];
export const budgetOptions = () =>
  site.currency && site.budgetRanges.length
    ? [
        ...site.budgetRanges.map((range) => `${site.currency} ${range}`),
        "I need guidance",
      ]
    : ["I need guidance", "I have a budget to discuss"];
export type Brief = {
  name: string;
  email: string;
  business: string;
  website: string;
  businessType: string;
  services: string[];
  goals: string;
  deliverables: string;
  budget: string;
  timing: string;
  context: string;
  companyUrl: string;
};
export const emptyBrief: Brief = {
  name: "",
  email: "",
  business: "",
  website: "",
  businessType: "",
  services: [],
  goals: "",
  deliverables: "",
  budget: "",
  timing: "",
  context: "",
  companyUrl: "",
};
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export const stepFields: (keyof Brief)[][] = [
  ["name", "email", "business", "website", "businessType"],
  ["services", "goals", "deliverables"],
  ["budget", "timing", "context"],
];
export function validateBrief(value: Brief, step?: number): BriefErrors {
  const errors: BriefErrors = {};
  const required: (keyof Brief)[] = [
    "name",
    "email",
    "business",
    "businessType",
    "goals",
    "deliverables",
    "budget",
    "timing",
  ];
  for (const key of required)
    if (typeof value[key] !== "string" || !(value[key] as string).trim())
      errors[key] = "Please complete this field.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    errors.email = "Enter a valid email address.";
  if (value.website) {
    try {
      const url = new URL(value.website);
      if (!["http:", "https:"].includes(url.protocol)) throw Error();
    } catch {
      errors.website =
        "Enter a complete website address, starting with https:// or http://.";
    }
  }
  if (!site.businessTypes.includes(value.businessType))
    errors.businessType = "Choose your business type.";
  if (
    !Array.isArray(value.services) ||
    !value.services.length ||
    value.services.some((s) => !serviceOptions.includes(s))
  )
    errors.services = "Choose at least one service.";
  if (!budgetOptions().includes(value.budget))
    errors.budget = "Choose a budget option.";
  if (!site.timingOptions.includes(value.timing))
    errors.timing = "Choose your preferred timing.";
  for (const key of Object.keys(emptyBrief) as (keyof Brief)[]) {
    const v = value[key];
    if (
      typeof v === "string" &&
      v.length >
        (["goals", "deliverables", "context"].includes(key) ? 4000 : 300)
    )
      errors[key] = "Please shorten this answer.";
  }
  if (step !== undefined)
    return Object.fromEntries(
      Object.entries(errors).filter(([key]) =>
        stepFields[step]?.includes(key as keyof Brief),
      ),
    );
  return errors;
}
export function parseBrief(value: unknown): Brief | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  for (const key of Object.keys(emptyBrief)) {
    if (
      key === "services"
        ? !Array.isArray(source[key]) ||
          (source[key] as unknown[]).some((s) => typeof s !== "string")
        : typeof source[key] !== "string"
    )
      return null;
  }
  return Object.fromEntries(
    Object.keys(emptyBrief).map((key) => [
      key,
      key === "services"
        ? [...new Set(source[key] as string[])]
        : (source[key] as string).trim(),
    ]),
  ) as Brief;
}
