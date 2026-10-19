"use client";
import { useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  Brief,
  BriefErrors,
  emptyBrief,
  validateBrief,
  serviceOptions,
  budgetOptions,
  stepFields,
} from "@/lib/brief";
const steps = [
  "Your business",
  "The project",
  "Practical details",
  "Review & send",
];
const labels: Record<keyof Brief, string> = {
  name: "Your name",
  email: "Email address",
  business: "Business name",
  website: "Existing website",
  businessType: "Business type",
  services: "Services needed",
  goals: "Main challenge & project goals",
  deliverables: "Desired deliverables",
  budget: "Indicative budget",
  timing: "Preferred timing",
  context: "Additional context",
  companyUrl: "Leave this field blank",
};
export function ProjectForm({ preview }: { preview: boolean }) {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>({ ...emptyBrief });
  const [errors, setErrors] = useState<BriefErrors>({});
  const [failure, setFailure] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<"preview" | "delivered" | null>(null);
  const id = useRef<string | null>(null);
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const focusHeading = () => setTimeout(() => heading.current?.focus(), 0);
  const update = (key: keyof Brief, value: string | string[]) => {
    setBrief((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
    setFailure("");
    id.current = null;
  };
  const move = (next: number) => {
    setStep(next);
    setErrors({});
    setFailure("");
    focusHeading();
  };
  const showErrors = (found: BriefErrors) => {
    setErrors(found);
    setTimeout(() => summary.current?.focus(), 0);
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy.current) return;
    const found = validateBrief(brief, step === 3 ? undefined : step);
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }
    if (step < 3) {
      move(step + 1);
      return;
    }
    busy.current = true;
    setSending(true);
    setFailure("");
    try {
      id.current ||= crypto.randomUUID();
      const response = await fetch("/api/project-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, requestId: id.current }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const first = Object.keys(data.errors)[0] as keyof Brief;
          setStep(
            Math.max(
              0,
              stepFields.findIndex((fields) => fields.includes(first)),
            ),
          );
          showErrors(data.errors);
        }
        throw new Error(
          data.error || "We could not confirm delivery. Please try again.",
        );
      }
      if (data.mode !== "preview" && data.mode !== "delivered")
        throw new Error("We could not confirm delivery. Please try again.");
      setResult(data.mode);
      focusHeading();
    } catch (error) {
      setFailure(
        error instanceof TypeError || error instanceof DOMException
          ? "We could not confirm delivery. Your answers are still here. Please try again shortly."
          : error instanceof Error
            ? error.message
            : "We could not confirm delivery. Please try again.",
      );
    } finally {
      busy.current = false;
      setSending(false);
    }
  }
  function field(
    key: keyof Brief,
    options: {
      optional?: boolean;
      type?: string;
      textarea?: boolean;
      hint?: string;
    } = {},
  ) {
    return (
      <div className={`form-field ${options.textarea ? "full-width" : ""}`}>
        <label htmlFor={key}>
          {labels[key]}{" "}
          <span>{options.optional ? "(optional)" : "(required)"}</span>
        </label>
        {options.hint && (
          <p id={`${key}-hint`} className="field-hint">
            {options.hint}
          </p>
        )}
        {options.textarea ? (
          <textarea
            id={key}
            name={key}
            value={brief[key] as string}
            onChange={(e) => update(key, e.target.value)}
            maxLength={4000}
            rows={4}
            aria-required={!options.optional}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={
              [
                options.hint ? `${key}-hint` : "",
                errors[key] ? `${key}-error` : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
        ) : (
          <input
            id={key}
            name={key}
            type={options.type || "text"}
            value={brief[key] as string}
            onChange={(e) => update(key, e.target.value)}
            maxLength={300}
            autoComplete={
              key === "name"
                ? "name"
                : key === "email"
                  ? "email"
                  : key === "business"
                    ? "organization"
                    : key === "website"
                      ? "url"
                      : "off"
            }
            aria-required={!options.optional}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={
              [
                options.hint ? `${key}-hint` : "",
                errors[key] ? `${key}-error` : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
        )}
        {errors[key] && (
          <p className="field-error" id={`${key}-error`}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  function select(
    key: "businessType" | "budget" | "timing",
    options: string[],
  ) {
    return (
      <div className="form-field full-width">
        <label htmlFor={key}>
          {labels[key]} <span>(required)</span>
        </label>
        <select
          id={key}
          value={brief[key]}
          onChange={(e) => update(key, e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        >
          <option value="">Choose an option</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {errors[key] && (
          <p className="field-error" id={`${key}-error`}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  function download() {
    const content =
      `PROJECT BRIEF — ${result === "preview" ? "NOT DELIVERED" : "DELIVERED"}\n\n` +
      Object.entries(brief)
        .filter(([k]) => k !== "companyUrl")
        .map(
          ([k, v]) =>
            `${labels[k as keyof Brief]}: ${Array.isArray(v) ? v.join(", ") : v || "Not provided"}`,
        )
        .join("\n\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-brief.txt";
    link.click();
    URL.revokeObjectURL(url);
  }
  if (result)
    return (
      <div className="form-result">
        <span className="result-icon" aria-hidden="true">
          {result === "preview" ? "↗" : "✓"}
        </span>
        <p className="eyebrow">
          {result === "preview"
            ? "Preview complete / Not delivered"
            : "Brief received"}
        </p>
        <h2 ref={heading} tabIndex={-1}>
          {result === "preview"
            ? "Your brief is ready. It hasn’t been sent."
            : "The next conversation starts here."}
        </h2>
        <p>
          {result === "preview"
            ? "This website is in preview mode and no delivery service is connected. Download a copy for your records. Your brief has not been delivered to the agency."
            : "Your brief has been accepted by our delivery service. We’ll review your goals and use the email you provided to discuss the next step."}
        </p>
        <div className="result-actions">
          <button className="button" onClick={download}>
            Download your brief ↓
          </button>
          {result === "preview" && (
            <button
              className="text-button"
              onClick={() => {
                setResult(null);
                move(3);
              }}
            >
              Return to your brief
            </button>
          )}
        </div>
        {site.email && (
          <a className="text-link" href={`mailto:${site.email}`}>
            Email {site.email} ↗
          </a>
        )}
      </div>
    );
  const hasErrors = Object.values(errors).some(Boolean);
  return (
    <div className="brief-form-wrap">
      <ol className="form-progress" aria-label="Project brief progress">
        {steps.map((s, i) => (
          <li
            key={s}
            className={i <= step ? "reached" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i < step ? "✓" : String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      {preview && (
        <div className="preview-notice">
          <strong>Preview mode</strong>
          <span>
            You can complete and download a brief. Submissions are not
            delivered.
          </span>
        </div>
      )}
      <form noValidate onSubmit={submit}>
        <div className="form-heading">
          <p className="micro">STEP {step + 1} OF 4</p>
          <h2 ref={heading} tabIndex={-1}>
            {steps[step]}
          </h2>
          <p>
            {
              [
                "Let’s start with the people and business behind the idea.",
                "Tell us what needs to change. An early idea is a good starting point.",
                "A little context helps us shape a realistic proposal.",
                "Check the details before taking the next step.",
              ][step]
            }
          </p>
        </div>
        {hasErrors && (
          <div
            className="error-summary"
            ref={summary}
            tabIndex={-1}
            role="alert"
          >
            <strong>A few details need your attention.</strong>
            <ul>
              {Object.entries(errors)
                .filter(([, v]) => v)
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(key)?.focus();
                      }}
                    >
                      {labels[key as keyof Brief]}: {value}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="companyUrl">Leave this field blank</label>
          <input
            id="companyUrl"
            tabIndex={-1}
            autoComplete="off"
            value={brief.companyUrl}
            onChange={(e) => update("companyUrl", e.target.value)}
          />
        </div>
        <div className="form-fields">
          {step === 0 && (
            <>
              {field("name")}
              {field("email", { type: "email" })}
              {field("business")}
              {field("website", {
                optional: true,
                type: "url",
                hint: "For example, https://yourwebsite.com",
              })}
              {select("businessType", site.businessTypes)}
            </>
          )}
          {step === 1 && (
            <>
              <fieldset
                className="service-checkboxes full-width"
                id="services"
                tabIndex={-1}
                aria-describedby={
                  errors.services ? "services-error" : undefined
                }
              >
                <legend>
                  Services needed{" "}
                  <span>(required · select all that apply)</span>
                </legend>
                {serviceOptions.map((s) => (
                  <label key={s}>
                    <input
                      type="checkbox"
                      checked={brief.services.includes(s)}
                      onChange={(e) =>
                        update(
                          "services",
                          e.target.checked
                            ? [...brief.services, s]
                            : brief.services.filter((v) => v !== s),
                        )
                      }
                    />
                    <span>{s}</span>
                    <span aria-hidden="true">↗</span>
                  </label>
                ))}
                {errors.services && (
                  <p id="services-error" className="field-error">
                    {errors.services}
                  </p>
                )}
              </fieldset>
              {field("goals", {
                textarea: true,
                hint: "What is getting in the way, and what would you like to achieve?",
              })}
              {field("deliverables", {
                textarea: true,
                hint: "What would you like us to make? It’s fine to say you need help deciding.",
              })}
            </>
          )}
          {step === 2 && (
            <>
              {select("budget", budgetOptions())}
              {select("timing", site.timingOptions)}
              {field("context", {
                textarea: true,
                optional: true,
                hint: "Anything else we should know? Please avoid passwords, financial details, or other sensitive information.",
              })}
            </>
          )}
          {step === 3 && (
            <div className="review full-width">
              {stepFields.map((keys, i) => (
                <section key={i}>
                  <div className="review-title">
                    <h3>{steps[i]}</h3>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => move(i)}
                    >
                      Edit<span className="sr-only"> {steps[i]}</span> ↗
                    </button>
                  </div>
                  <dl>
                    {keys.map((key) => (
                      <div key={key}>
                        <dt>{labels[key]}</dt>
                        <dd>
                          {Array.isArray(brief[key])
                            ? (brief[key] as string[]).join(", ")
                            : brief[key] || "Not provided"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
              <p className="privacy-note">
                {preview
                  ? "Preview mode: your answers are validated, but not stored or sent to an agency. They remain in this page until you leave or reload."
                  : "Your details will be sent to our enquiry service so we can respond to your project. They will not subscribe you to marketing emails. Please do not include sensitive information."}
              </p>
            </div>
          )}
        </div>
        {failure && (
          <div className="error-summary" role="alert">
            {failure}
            {site.email && (
              <>
                {" "}
                You can also{" "}
                <a href={`mailto:${site.email}`}>email us directly</a>.
              </>
            )}
          </div>
        )}
        <div className="form-actions">
          {step > 0 ? (
            <button
              className="text-button"
              type="button"
              disabled={sending}
              onClick={() => move(step - 1)}
            >
              ← Back
            </button>
          ) : (
            <span className="micro">A GOOD IDEA STARTS HERE.</span>
          )}
          <button className="button" type="submit" disabled={sending}>
            {sending
              ? "Sending…"
              : step === 3
                ? preview
                  ? "Finish preview"
                  : "Send project brief"
                : "Next step"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className="form-footnote">
          Your answers stay here as you move between steps. Reloading clears
          them.
        </p>
      </form>
    </div>
  );
}
