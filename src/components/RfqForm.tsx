"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { rfqCategories } from "@/lib/content";
import { Button } from "./Button";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["pdf", "xlsx", "xls", "docx", "jpg", "jpeg", "png", "webp", "zip", "ai"];

type Status = "idle" | "sending" | "done" | "error";

// Fields an error can point to. Server errors for anything else (files, form) are shown as plain text.
const FIELD_NAMES = new Set([
  "name",
  "company",
  "email",
  "category",
  "description",
  "phone",
  "country",
  "website",
  "quantity",
  "target_price",
  "delivery",
  "materials",
  "comments",
]);

function fmt(n: number) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

/* Readability rules for this form: visible boxed fields, sentence-case sans labels,
   16px+ text (also stops iOS zooming in), 44px+ tap targets, "Optional" spelled out,
   and errors that say what to do, never shown by colour alone. */
const input =
  "block w-full min-h-12 rounded-none border border-ink/40 bg-white/75 px-4 py-3 text-[1.0625rem] leading-snug text-ink placeholder:text-ink/50 transition-colors hover:border-ink/70 focus:border-green-deep focus:outline-none focus:ring-2 focus:ring-green-deep/40 aria-[invalid=true]:border-red-700 aria-[invalid=true]:bg-red-50";

function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4M8 10.75v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid": boolean;
  "aria-required": boolean;
};

function Field({
  id,
  label,
  optional,
  hint,
  error,
  group,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  group?: boolean;
  children: (p: ControlProps) => ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const control = children({
    id,
    "aria-describedby": describedBy,
    "aria-invalid": !!error,
    "aria-required": !optional,
  });
  const labelCls = "flex flex-wrap items-baseline gap-x-2 text-[1.0625rem] font-semibold text-ink";
  const labelText = (
    <>
      {label}
      {optional && <span className="text-[0.9375rem] font-normal text-ink/65">Optional</span>}
    </>
  );

  return (
    <div
      role={group ? "radiogroup" : undefined}
      aria-labelledby={group ? `${id}-label` : undefined}
      aria-describedby={group ? describedBy : undefined}
      aria-required={group ? !optional : undefined}
    >
      {group ? (
        <p id={`${id}-label`} className={labelCls}>
          {labelText}
        </p>
      ) : (
        <label htmlFor={id} className={labelCls}>
          {labelText}
        </label>
      )}
      {hint && (
        <p id={hintId} className="mt-1 text-[0.9375rem] leading-snug text-ink/70">
          {hint}
        </p>
      )}
      <div className="mt-2.5">{control}</div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-[0.9375rem] font-medium text-red-700">
          <AlertIcon />
          {error}
        </p>
      )}
    </div>
  );
}

function StepHeading({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <>
      <legend className="mb-2 flex items-center gap-4 p-0">
        <span
          className="font-display flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-[1.25rem] text-ivory"
          aria-hidden="true"
        >
          {n}
        </span>
        <span className="font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-ink">
          <span className="sr-only">Step {n}: </span>
          {title}
        </span>
      </legend>
      <p className="mb-7 pl-14 text-base leading-relaxed text-ink/75">{note}</p>
    </>
  );
}

export function RfqForm() {
  const params = useSearchParams();
  const preset = params.get("garment") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);
  const [reference, setReference] = useState("");
  const [drag, setDrag] = useState(false);
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const category = useMemo(() => rfqCategories.find((c) => c.value === preset)?.value ?? "", [preset]);

  // After a failed submit, move focus to the error summary so nobody has to hunt for what went wrong.
  const errorCount = Object.keys(errors).length;
  useEffect(() => {
    if (attempt > 0 && errorCount > 0) {
      summaryRef.current?.focus();
      summaryRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list);
    const next = [...files];
    let err: string | null = null;
    for (const f of incoming) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED.includes(ext)) {
        err = `“${f.name}” is not a file type we accept. Please use PDF, Excel, Word, an image, or a ZIP.`;
        continue;
      }
      if (f.size > MAX_BYTES) {
        err = `“${f.name}” is larger than 10 MB. Please send a smaller file.`;
        continue;
      }
      if (next.length >= MAX_FILES) {
        err = `You can attach up to ${MAX_FILES} files. Remove one to add another.`;
        break;
      }
      next.push(f);
    }
    setFiles(next);
    setFileError(err);
  };

  const clearError = (name: string) => {
    if (!errors[name]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const goTo = (name: string) => {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    for (const [k, msg] of [
      ["name", "Please enter your full name."],
      ["company", "Please enter your company name."],
      ["email", "Please enter a valid email address, like name@company.com."],
      ["category", "Please choose the product you need."],
      ["description", "Please describe the product in a sentence or two."],
    ] as const) {
      const v = String(fd.get(k) ?? "").trim();
      if (!v || (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))) errs[k] = msg;
    }
    setErrors(errs);
    setAttempt((n) => n + 1);
    if (Object.keys(errs).length) {
      setStatus("idle");
      return;
    }
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));
    fd.set("elapsed", String(Date.now() - started.current));

    setStatus("sending");
    try {
      const res = await fetch("/api/rfq", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        if (data?.errors) setErrors(data.errors);
        setAttempt((n) => n + 1);
        return;
      }
      setReference(data.reference);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border border-ink/20 bg-white/55 p-8 md:p-14"
          role="status"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <motion.circle cx="28" cy="28" r="26" stroke="var(--green-deep)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
            <motion.path d="M16 29l8 8 16-18" stroke="var(--green-deep)" strokeWidth="2.2" strokeLinecap="square" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
          </svg>
          <h2 className="font-display mt-8 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05]">
            Thank you. Your enquiry has been received.
          </h2>
          <p className="mt-6 inline-block bg-green-deep/12 px-4 py-2 text-[1.125rem] text-[#0d5c33]">
            Your reference: <strong className="font-semibold">{reference}</strong>
          </p>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ink/80">
            In the live site this submission is emailed securely to the Green Channels team and stored
            in the CMS, where it can be searched and exported. Nothing has been sent from this
            prototype.
          </p>
          <div className="mt-10">
            <Button href="/" tone="dark" arrow="right">
              Back to the homepage
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={onSubmit}
          onChange={(e) => {
            const { name } = e.target as unknown as { name?: string };
            if (name) clearError(name);
          }}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-14"
          encType="multipart/form-data"
        >
          {/* honeypot: hidden from people, irresistible to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Company website
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p className="border-l-4 border-green bg-white/50 py-3 pl-5 pr-4 text-[1.0625rem] leading-relaxed text-ink/85">
            This takes about 3 minutes. Fields marked <strong className="font-semibold text-ink">Optional</strong> can
            be left blank. Everything else helps us reply properly.
          </p>

          {(errorCount > 0 || status === "error") && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="border-2 border-red-700 bg-red-50 p-5 text-red-900 focus:outline-none md:p-6"
            >
              <p className="flex items-start gap-2 text-[1.125rem] font-semibold">
                <AlertIcon />
                {errorCount > 0
                  ? `Please fix ${errorCount === 1 ? "this" : `these ${errorCount}`} before sending`
                  : "Something went wrong. Please check the form and try again."}
              </p>
              {errorCount > 0 && (
                <ul className="mt-3 space-y-1.5 pl-7 text-base">
                  {Object.entries(errors).map(([k, msg]) => (
                    <li key={k} className="list-disc">
                      {FIELD_NAMES.has(k) ? (
                        <a
                          href={`#${k}`}
                          onClick={(e) => {
                            e.preventDefault();
                            goTo(k);
                          }}
                          className="underline underline-offset-4 hover:text-red-700"
                        >
                          {msg}
                        </a>
                      ) : (
                        msg
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <fieldset>
            <StepHeading n="1" title="About you" note="So we know who to reply to and how." />
            <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name}>
                {(p) => <input {...p} name="name" autoComplete="name" className={input} />}
              </Field>
              <Field id="company" label="Company" error={errors.company}>
                {(p) => <input {...p} name="company" autoComplete="organization" className={input} />}
              </Field>
              <Field id="email" label="Email address" error={errors.email}>
                {(p) => <input {...p} name="email" type="email" autoComplete="email" className={input} />}
              </Field>
              <Field id="phone" label="Phone or WhatsApp" optional hint="Include your country code.">
                {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" className={input} />}
              </Field>
              <Field id="country" label="Country" optional>
                {(p) => <input {...p} name="country" autoComplete="country-name" className={input} />}
              </Field>
              <Field id="website" label="Company website" optional>
                {(p) => <input {...p} name="website" type="url" placeholder="https://" className={input} />}
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <StepHeading
              n="2"
              title="What you need"
              note="Tell us about the garment. The more detail you give, the better our first reply."
            />
            <div className="space-y-7">
              <Field id="category" label="Which product?" group error={errors.category} hint="Choose the closest match.">
                {() => (
                  <div className="flex flex-wrap gap-2">
                    {rfqCategories.map((c) => (
                      <label key={c.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={c.value}
                          defaultChecked={c.value === category}
                          className="peer sr-only"
                        />
                        <span className="inline-flex min-h-11 items-center gap-2 border border-ink/35 bg-white/70 px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink/70 hover:bg-white peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-checked:[&>svg]:block peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-deep">
                          <CheckIcon className="hidden shrink-0" />
                          {c.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </Field>

              <Field
                id="description"
                label="Describe the product"
                error={errors.description}
                hint="Describe the garment and what you need from it."
              >
                {(p) => <textarea {...p} name="description" rows={5} className={`${input} resize-y`} />}
              </Field>

              <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
                <Field id="quantity" label="Estimated order quantity" optional hint="Roughly how many pieces, per style or in total.">
                  {(p) => <input {...p} name="quantity" placeholder="e.g. 2,000 pieces per style" className={input} />}
                </Field>
                <Field id="target_price" label="Target price" optional hint="Currency and price per piece.">
                  {(p) => <input {...p} name="target_price" placeholder="e.g. USD 6.50 per piece" className={input} />}
                </Field>
                <Field id="delivery" label="Target delivery date" optional hint="An approximate date is fine.">
                  {(p) => <input {...p} name="delivery" type="date" className={input} />}
                </Field>
              </div>

              <Field id="materials" label="Fabric or material requirements" optional hint="For example: weight, composition, colour.">
                {(p) => <textarea {...p} name="materials" rows={3} className={`${input} resize-y`} />}
              </Field>
              <Field id="comments" label="Anything else we should know?" optional>
                {(p) => <textarea {...p} name="comments" rows={3} className={`${input} resize-y`} />}
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <StepHeading
              n="3"
              title="Tech pack and references"
              note="Optional. Attach anything that shows what you want made. No tech pack yet? You can still send your request."
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`relative border-2 border-dashed p-8 text-center transition-colors duration-300 md:p-10 ${
                drag ? "border-green-deep bg-green/10" : "border-ink/40 bg-white/50"
              }`}
            >
              <input
                ref={inputRef}
                id="files"
                type="file"
                multiple
                accept={ALLOWED.map((e) => "." + e).join(",")}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
                onChange={(e) => {
                  if (e.target.files) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <svg viewBox="0 0 32 32" width="36" height="36" fill="none" aria-hidden="true" className="mx-auto text-green-deep">
                <path d="M16 22V7m0 0-5.5 5.5M16 7l5.5 5.5M6 22v3h20v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-display mt-3 text-[1.5rem] leading-tight">Drag your files here</p>
              <p className="mt-1 text-base text-ink/75">or</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-describedby="files-hint"
                className="mt-3 inline-flex min-h-12 items-center border border-ink bg-white px-6 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                Choose files
              </button>
              <p id="files-hint" className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink/75">
                PDF, Excel, Word, images, ZIP or Illustrator (.ai). Up to {MAX_FILES} files, 10 MB each.
              </p>
            </div>

            {fileError && (
              <p className="mt-3 flex items-start gap-2 text-[0.9375rem] font-medium text-red-700" role="alert">
                <AlertIcon />
                {fileError}
              </p>
            )}
            <div aria-live="polite">
              {files.length > 0 && (
                <>
                  <p className="mt-5 text-base font-semibold">
                    {files.length} of {MAX_FILES} files added
                  </p>
                  <ul className="mt-2 divide-y divide-ink/15 border border-ink/20 bg-white/60">
                    {files.map((f, i) => (
                      <li key={f.name + i} className="flex items-center justify-between gap-4 px-4 py-2">
                        <span className="min-w-0">
                          <span className="block truncate text-base text-ink">{f.name}</span>
                          <span className="block text-[0.875rem] text-ink/70">{fmt(f.size)}</span>
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${f.name}`}
                          onClick={() => setFiles(files.filter((_, j) => j !== i))}
                          className="inline-flex min-h-11 shrink-0 items-center gap-2 px-2 text-base font-semibold text-ink underline decoration-green decoration-2 underline-offset-[6px] hover:text-green-deep"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </fieldset>

          <div className="flex flex-col gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink/75">
              Your files are checked for type and size and delivered securely to Green Channels. We use
              your details only to reply to this enquiry. See our{" "}
              <Link href="/privacy" className="font-medium text-ink underline decoration-green decoration-2 underline-offset-4 hover:text-green-deep">
                Privacy Policy
              </Link>
              .
            </p>
            <Button type="submit" tone="dark" disabled={status === "sending"} className="w-full text-[1.0625rem]! md:w-auto">
              {status === "sending" ? "Sending…" : "Send request"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
