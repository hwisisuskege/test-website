# FIRST/NEXT — agency website

A complete Next.js App Router website for a website design, social media, and digital marketing agency. The creative concept is “From first impression to next customer.” **FIRST/NEXT is a temporary concept wordmark, not an invented business identity.** No client results, testimonials, history, or credentials are claimed. The two work examples are visibly labeled concept projects.

## Run locally

Requires Node.js 22+ (validated on 24.19.0) and npm. Use the existing checkout; a worktree is unnecessary.

```sh
cd /workspace/test-website
npm ci
cp .env.example .env.local # only if this file does not already exist
npm run dev
```

For a production build and local server:

```sh
npm run build
npm run start
```

Port 3000 is the default. The app is not publicly deployed. Dependencies are locked in `package-lock.json`. Fonts are local WOFF/WOFF2 subsets with licenses in `public/fonts`; the visual scenes are original CSS/interface compositions, with no external asset requests or heavy animation libraries. Next.js prerenders the content routes; the project form and delivery API run on the server.

## Content and business configuration

Edit **`lib/site.ts`** for the agency name, canonical HTTPS domain, location, verified service areas, email, logo, social sharing image, currency, budget ranges, navigation, CTA, business types, and timing options. Missing facts are intentionally blank. Configure a currency before adding budget ranges; otherwise only non-numeric guidance/discussion choices appear. A configured email enables a direct email alternative.

`lib/content.ts` contains complete service categories, FAQ, working process, and structured case studies. Case study fields include brief, scope, approach, deliverables, imagery, and verified outcomes. The current examples have no verified outcomes and use purpose-built interface compositions. When adding real projects, replace the concept label only with permission and verified facts; extend the renderer to display supplied imagery/outcomes rather than inventing them.

Routes:

- `/`
- `/services`
- `/services/website-design-development`
- `/services/social-media`
- `/services/digital-marketing`
- `/who-we-help`
- `/work`
- `/about`
- `/start-a-project`

CSS tokens and responsive rules live in `app/globals.css`. Shared components live in `components/`. The architecture keeps server content separate from interactive header, hero, service explorer, and form components.

## Project brief delivery

Without `PROJECT_BRIEF_WEBHOOK_URL`, the form is **preview-only**. The UI says so before entry, on review, and after submission. Validation still runs, but there is no delivery or persistent storage. Visitors can download their brief. Answers live only in React memory, survive step navigation, and clear on reload; there is no local storage of personal information.

To connect delivery, set these in server-side environment settings or `.env.local`:

```dotenv
PROJECT_BRIEF_WEBHOOK_URL=https://your-actual-service.example/project-brief
PROJECT_BRIEF_WEBHOOK_TOKEN=your-server-side-token
```

The URL above is documentation only; supply a real endpoint. Never put secrets in `lib/site.ts`, `NEXT_PUBLIC_` variables, or source control. Restart the server after changing environment variables.

The adapter in `lib/delivery.ts` makes an authenticated HTTPS POST with:

- `Content-Type: application/json`
- `Authorization: Bearer <token>` when a token is configured
- `Idempotency-Key: <request UUID>`
- Body: `{ requestId, submittedAt, project: { name, email, business, website, businessType, services, goals, deliverables, budget, timing, context } }`

The receiver must validate the authentication, durably store or enqueue the enquiry, honor `Idempotency-Key` across retries, and return a 2xx response **only after acceptance**. Adapt this function for a provider with a different contract. The API enforces payload shape, length, allowed options, email/URL format, a same-origin browser check, and a honeypot. It never logs brief content or tokens. Outbound requests time out after 10 seconds and do not follow redirects. Failed or uncertain delivery produces an error, keeping the visitor’s answers available.

The UI prevents repeated in-flight submission. A bounded, one-hour in-process cache deduplicates accepted requests in a single server instance. It is not durable across restarts or shared across replicas: production delivery must provide durable idempotency at the receiver. Configure deployment/provider rate limiting before public launch. Ensure the deployment reverse proxy preserves the public host/protocol for the API’s origin check. Confirm the recipient and storage/retention practices and provide appropriate privacy information for the actual configured service before enabling live collection.

## SEO and launch settings

Each route has a title and description. Canonicals, Open Graph URLs, and social imagery use configured business values. Verified name + domain enable Organization structured data; no fabricated address or business history is emitted.

Preview defaults are deliberate: `noindex, nofollow`, robots disallow all, and an empty sitemap. To launch, configure the real domain and set `SITE_INDEXABLE=true`, then rebuild. This enables the page sitemap, canonicals, and indexing. Add logo/share assets and verify their paths before launch. No analytics or advertising scripts are installed; establish configuration and consent requirements before adding tracking.

## Verification

```sh
npm run lint
npm run typecheck
npm run test
npm run build
# Install Chromium once in a normal development environment:
npx playwright install chromium
npm run test:e2e
```

On this cloud machine, system Chromium is available, so browser downloads are unnecessary:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Playwright uses the production build and starts an isolated preview-only server on port 3100, with webhook credentials overridden to empty values. It never reuses a running delivery-enabled server. Build in preview mode for the preview SEO assertions. Unit tests cover validation and mocked delivery acceptance/rejection. Browser tests cover all nine routes, internal links and anchors, metadata, no horizontal overflow at 1440/768/390/320px, browser errors, keyboard service navigation, mobile menu, FAQ, reduced motion, form validation and back navigation, failure/retry, preview/download behavior, API validation and duplicate submissions, plus automated axe accessibility checks across all routes and the review step. Full-page screenshots are generated in ignored `test-results/`. Real provider delivery requires a configured endpoint and an end-to-end test to the actual recipient before launch.

## Before public launch

1. Supply the real agency name, domain, location/service areas, contact email, logo and social image in `lib/site.ts`.
2. Choose the currency and any approved budget ranges, or keep the guidance-only options.
3. Connect and verify the delivery endpoint and recipient, durable idempotency, rate limiting, and applicable privacy/retention wording.
4. Replace concept work with real work only when available; concept labels can remain if the examples are retained.
5. Configure indexing for the actual domain, rebuild, and perform a final deployment smoke test. Public deployment has not been requested or performed.

## Latest local verification

- Production build, ESLint, and TypeScript checks passed.
- 8 unit tests passed, including mocked webhook acceptance and rejection.
- 10 Chromium browser tests passed across all 9 routes and viewport widths 1440, 768, 390, and 320 pixels.
- No browser errors, broken internal links, or horizontal overflow in the tested routes and sizes.
- Automated axe WCAG A/AA checks found no violations on the checked routes and form review step. These checks supplement the keyboard and visual review; they are not an accessibility certification.
- Desktop, tablet, mobile, service, audience, work, about, and brief screenshots were inspected and layout issues corrected.
- Actual live delivery is untested because no endpoint has been supplied. No public deployment was performed.
