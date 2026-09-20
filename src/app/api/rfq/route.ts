import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["pdf", "xlsx", "xls", "docx", "jpg", "jpeg", "png", "webp", "zip", "ai"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Request-for-quotation endpoint (prototype).
 * Validates fields and files and returns a reference. In production this hands the
 * submission to email delivery and to the CMS/database, behind rate limiting.
 */
export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid submission." } }, { status: 400 });
  }

  // Spam protection: honeypot filled, or submitted implausibly fast. Answer as if it worked.
  const elapsed = Number(fd.get("elapsed") ?? 0);
  if (String(fd.get("company_website") ?? "").length > 0 || (elapsed > 0 && elapsed < 2500)) {
    return NextResponse.json({ ok: true, reference: "GC-000000" });
  }

  const errors: Record<string, string> = {};
  const get = (k: string) => String(fd.get(k) ?? "").trim();
  if (!get("name")) errors.name = "Please enter your name.";
  if (!get("company")) errors.company = "Please enter your company.";
  if (!EMAIL.test(get("email"))) errors.email = "Please enter a valid email address.";
  if (!get("category")) errors.category = "Please choose a product category.";
  if (!get("description")) errors.description = "Please describe the product.";
  for (const [k, max] of [
    ["name", 120],
    ["company", 160],
    ["description", 4000],
    ["materials", 2000],
    ["comments", 2000],
  ] as const) {
    if (get(k).length > max) errors[k] = "This field is too long.";
  }

  const files = fd.getAll("files").filter((f): f is File => typeof f !== "string" && f.size > 0);
  if (files.length > MAX_FILES) errors.files = `Attach up to ${MAX_FILES} files.`;
  for (const f of files) {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED.has(ext)) errors.files = `“${f.name}” is not an accepted file type.`;
    else if (f.size > MAX_BYTES) errors.files = `“${f.name}” is larger than 10 MB.`;
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const reference = "GC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return NextResponse.json({ ok: true, reference });
}
