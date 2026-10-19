import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { parseBrief, validateBrief } from "@/lib/brief";
import { deliverBrief } from "@/lib/delivery";
export const runtime = "nodejs";
const completed = new Map<
  string,
  { hash: string; at: number; mode: "preview" | "delivered" }
>();
const inFlight = new Set<string>();
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    // Next's internal URL can use the bind hostname. Compare the browser's
    // origin with the incoming public Host instead, including its port.
    let sameOrigin = false;
    try {
      const source = new URL(origin);
      sameOrigin =
        source.host === request.headers.get("host") &&
        source.protocol === request.nextUrl.protocol;
    } catch {
      /* Malformed or opaque origins are rejected. */
    }
    if (!sameOrigin)
      return NextResponse.json(
        { error: "Please submit your brief from this website." },
        { status: 403 },
      );
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Send a JSON project brief." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return NextResponse.json(
      { error: "Your brief is too long. Please shorten it." },
      { status: 413 },
    );
  let payload;
  try {
    const raw = await request.text();
    if (raw.length > 24000)
      return NextResponse.json(
        { error: "Your brief is too long. Please shorten it." },
        { status: 413 },
      );
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "We could not read your brief. Please try again." },
      { status: 400 },
    );
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return NextResponse.json(
      { error: "Please send a project brief." },
      { status: 400 },
    );
  const brief = parseBrief(payload.brief);
  if (
    !brief ||
    typeof payload.requestId !== "string" ||
    !/^[\da-f-]{36}$/i.test(payload.requestId)
  )
    return NextResponse.json(
      { error: "Please check your brief and try again." },
      { status: 400 },
    );
  if (brief.companyUrl)
    return NextResponse.json(
      { error: "This submission could not be accepted." },
      { status: 400 },
    );
  const errors = validateBrief(brief);
  if (Object.keys(errors).length)
    return NextResponse.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  const hash = createHash("sha256").update(JSON.stringify(brief)).digest("hex");
  const id = payload.requestId;
  for (const [key, value] of completed)
    if (Date.now() - value.at > 3600000) completed.delete(key);
  const previous = completed.get(id);
  if (previous)
    return previous.hash === hash
      ? NextResponse.json({ mode: previous.mode })
      : NextResponse.json(
          { error: "This brief changed. Please review and submit again." },
          { status: 409 },
        );
  if (inFlight.has(id))
    return NextResponse.json(
      {
        error:
          "This brief is already being processed. Please wait a moment before trying again.",
      },
      { status: 409 },
    );
  inFlight.add(id);
  try {
    const result = await deliverBrief(brief, id);
    if (completed.size > 1000) completed.delete(completed.keys().next().value!);
    completed.set(id, { hash, at: Date.now(), mode: result.mode });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not confirm delivery. Your answers are still here. Please try again shortly.",
      },
      { status: 502 },
    );
  } finally {
    inFlight.delete(id);
  }
}
