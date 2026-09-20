"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { rfqCategories } from "@/lib/content";
import { Button } from "./Button";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["pdf", "xlsx", "xls", "docx", "jpg", "jpeg", "png", "webp", "zip", "ai"];

type Status = "idle" | "sending" | "done" | "error";

function fmt(n: number) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

const field =
  "peer w-full border-0 border-b border-[var(--line-light)] bg-transparent px-0 pb-3 pt-2 text-[16px] text-ink placeholder:text-ink/30 focus:border-green-deep focus:outline-none focus:ring-0 transition-colors";
const label = "eyebrow block text-moss";

function Field({
  id,
  name,
  children,
  required,
  hint,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {name}
        {required && <span className="text-green-deep"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] text-moss">{hint}</p>}
    </div>
  );
}

export function RfqForm() {
  const params = useSearchParams();
  const preset = params.get("garment") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");
  const [drag, setDrag] = useState(false);
  const started = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const category = useMemo(() => rfqCategories.find((c) => c.value === preset)?.value ?? "", [preset]);

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list);
    const next = [...files];
    let err: string | null = null;
    for (const f of incoming) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED.includes(ext)) {
        err = `“${f.name}” is not an accepted file type.`;
        continue;
      }
      if (f.size > MAX_BYTES) {
        err = `“${f.name}” is larger than 10 MB.`;
        continue;
      }
      if (next.length >= MAX_FILES) {
        err = `You can attach up to ${MAX_FILES} files.`;
        break;
      }
      next.push(f);
    }
    setFiles(next);
    setFileError(err);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    for (const [k, msg] of [
      ["name", "Please enter your name."],
      ["company", "Please enter your company."],
      ["email", "Please enter a valid email address."],
      ["category", "Please choose a product category."],
      ["description", "Please describe the product."],
    ] as const) {
      const v = String(fd.get(k) ?? "").trim();
      if (!v || (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))) errs[k] = msg;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
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
          className="border border-[var(--line-light)] bg-ivory p-8 md:p-14"
          role="status"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <motion.circle cx="28" cy="28" r="26" stroke="var(--green-deep)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
            <motion.path d="M16 29l8 8 16-18" stroke="var(--green-deep)" strokeWidth="2.2" strokeLinecap="square" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
          </svg>
          <h2 className="font-display mt-8 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05]">
            Thank you. Your enquiry has been received.
          </h2>
          <p className="eyebrow mt-6 text-moss">Reference {reference}</p>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-ink/70">
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
          onSubmit={onSubmit}
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

          <fieldset className="space-y-8">
            <legend className="eyebrow mb-8 flex items-center gap-3 text-ink">
              <span className="font-display text-2xl italic normal-case tracking-normal text-moss/60">01</span>
              About you
            </legend>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <Field id="name" name="Full name" required>
                <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1.5 text-[13px] text-red-700">{errors.name}</p>}
              </Field>
              <Field id="company" name="Company" required>
                <input id="company" name="company" autoComplete="organization" className={field} aria-invalid={!!errors.company} />
                {errors.company && <p className="mt-1.5 text-[13px] text-red-700">{errors.company}</p>}
              </Field>
              <Field id="email" name="Email" required>
                <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1.5 text-[13px] text-red-700">{errors.email}</p>}
              </Field>
              <Field id="phone" name="Phone / WhatsApp">
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
              </Field>
              <Field id="country" name="Country">
                <input id="country" name="country" autoComplete="country-name" className={field} />
              </Field>
              <Field id="website" name="Website">
                <input id="website" name="website" type="url" placeholder="https://" className={field} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-8">
            <legend className="eyebrow mb-8 flex items-center gap-3 text-ink">
              <span className="font-display text-2xl italic normal-case tracking-normal text-moss/60">02</span>
              The product
            </legend>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <Field id="category" name="Product category" required>
                <select id="category" name="category" defaultValue={category} className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2306120e%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px] bg-[right_2px_center] bg-no-repeat pr-6`} aria-invalid={!!errors.category}>
                  <option value="" disabled>
                    Select a category
                  </option>
                  {rfqCategories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1.5 text-[13px] text-red-700">{errors.category}</p>}
              </Field>
              <Field id="quantity" name="Estimated order quantity">
                <input id="quantity" name="quantity" className={field} placeholder="e.g. per style / per programme" />
              </Field>
              <Field id="target_price" name="Target price">
                <input id="target_price" name="target_price" className={field} placeholder="Currency and unit price" />
              </Field>
              <Field id="delivery" name="Target delivery date">
                <input id="delivery" name="delivery" type="date" className={field} />
              </Field>
            </div>
            <Field id="description" name="Product description" required>
              <textarea id="description" name="description" rows={4} className={`${field} resize-none`} aria-invalid={!!errors.description} />
              {errors.description && <p className="mt-1.5 text-[13px] text-red-700">{errors.description}</p>}
            </Field>
            <Field id="materials" name="Fabric / material requirements">
              <textarea id="materials" name="materials" rows={3} className={`${field} resize-none`} />
            </Field>
            <Field id="comments" name="Additional comments">
              <textarea id="comments" name="comments" rows={3} className={`${field} resize-none`} />
            </Field>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-8 flex items-center gap-3 text-ink">
              <span className="font-display text-2xl italic normal-case tracking-normal text-moss/60">03</span>
              Tech pack &amp; references
            </legend>

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
              className={`relative border border-dashed p-10 text-center transition-colors duration-300 ${
                drag ? "border-green-deep bg-green/10" : "border-ink/30 bg-parchment/40"
              }`}
            >
              <input
                ref={inputRef}
                id="files"
                type="file"
                multiple
                accept={ALLOWED.map((e) => "." + e).join(",")}
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <p className="font-display text-[1.6rem] leading-tight">Drag files here</p>
              <p className="mt-2 text-[14px] text-moss">
                or{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="text-ink underline decoration-green decoration-2 underline-offset-[6px] hover:text-green-deep"
                >
                  browse your computer
                </button>
              </p>
              <p className="eyebrow mt-5 text-moss">
                Tech packs · PDF · XLSX · images · specification documents · up to {MAX_FILES} files, 10 MB each
              </p>
            </div>

            {fileError && (
              <p className="mt-3 text-[13px] text-red-700" role="alert">
                {fileError}
              </p>
            )}
            {files.length > 0 && (
              <ul className="mt-4 divide-y divide-[var(--line-light)] border-y border-[var(--line-light)]">
                {files.map((f, i) => (
                  <li key={f.name + i} className="flex items-center justify-between gap-4 py-3 text-[14.5px]">
                    <span className="truncate">{f.name}</span>
                    <span className="flex shrink-0 items-center gap-5">
                      <span className="eyebrow text-moss">{fmt(f.size)}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${f.name}`}
                        onClick={() => setFiles(files.filter((_, j) => j !== i))}
                        className="eyebrow text-ink hover:text-green-deep"
                      >
                        Remove
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>

          <div className="flex flex-col gap-6 border-t border-[var(--line-light)] pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-[13px] leading-relaxed text-moss">
              Your files are validated for type and size and delivered securely to Green Channels. We use
              your details only to respond to this enquiry. See our Privacy Policy.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Button type="submit" tone="dark" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send request"}
              </Button>
              {status === "error" && (
                <p className="text-[13px] text-red-700" role="alert">
                  Something went wrong. Please check the form and try again.
                </p>
              )}
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
