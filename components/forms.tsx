"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Button } from "@/components/ui/button";
import {
  creatorSchema,
  brandSchema,
  type CreatorInput,
  type BrandInput,
} from "@/lib/schemas";

export const inputClasses =
  "w-full rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none";

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-foreground">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

function SubmitStatus({ status }: { status: "success" | "error" | null }) {
  if (!status) return null;
  return (
    <p
      className={`text-sm ${status === "success" ? "text-green-500" : "text-destructive"}`}>
      {status === "success"
        ? "Thank you! We'll get back to you soon."
        : "Something went wrong. Please try again."}
    </p>
  );
}

export function CreatorForm() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatorInput>({
    resolver: standardSchemaResolver(creatorSchema),
  });

  async function onSubmit(data: CreatorInput) {
    setStatus(null);
    const res = await fetch("/api/submit/creator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <input
            type="text"
            placeholder="John"
            className={inputClasses}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            placeholder="John@john.com"
            className={inputClasses}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </Field>
      </div>
      <Field label="Links to your social media accounts" required>
        <input
          type="text"
          placeholder="Instagram, Tiktok, Youtube, Facebook"
          className={`${inputClasses} py-4`}
          {...register("socialMedia")}
        />
        <FieldError message={errors.socialMedia?.message} />
      </Field>
      <Field label="Message">
        <textarea
          rows={4}
          placeholder="Your message to our team..."
          className={`${inputClasses} resize-none py-4`}
          {...register("message")}
        />
      </Field>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 rounded border border-primary bg-card"
          {...register("privacy")}
        />
        <span className="text-sm text-foreground">
          I agree to the{" "}
          <Link
            href="https://docs.google.com/document/d/1SOeNiG9wGwNqYdjwaJipM2hAjUogCvzE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline">
            Privacy Policy
          </Link>
          <span className="text-primary">*</span>
        </span>
      </label>
      <FieldError message={errors.privacy?.message} />
      <SubmitStatus status={status} />
      <Button type="submit" disabled={isSubmitting} className="w-[110px]">
        {isSubmitting ? "..." : "Submit"}
      </Button>
    </form>
  );
}

export function BrandForm() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandInput>({
    resolver: standardSchemaResolver(brandSchema),
  });

  async function onSubmit(data: BrandInput) {
    setStatus(null);
    const res = await fetch("/api/submit/brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <input
            type="text"
            placeholder="John"
            className={inputClasses}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            placeholder="John@john.com"
            className={inputClasses}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Brand/Company">
          <input
            type="text"
            placeholder="Brand"
            className={inputClasses}
            {...register("company")}
          />
        </Field>
        <Field label="Website" required>
          <input
            type="url"
            placeholder="https://neocampaign.net/"
            className={inputClasses}
            {...register("website")}
          />
          <FieldError message={errors.website?.message} />
        </Field>
      </div>
      <Field label="Budget" required>
        <select
          className="w-full appearance-none rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm placeholder:text-muted-foreground text-foreground focus:outline-none"
          {...register("budget")}>
          <option value="">Please select</option>
          <option value="1k-5k">$1K - $5K</option>
          <option value="5k-10k">$5K - $10K</option>
          <option value="10k-25k">$10K - $25K</option>
          <option value="25k-50k">$25K - $50K</option>
          <option value="50k+">$50K+</option>
        </select>
        <FieldError message={errors.budget?.message} />
      </Field>
      <Field label="Message">
        <textarea
          rows={3}
          placeholder="Your message to our team..."
          className={`${inputClasses} resize-none`}
          {...register("message")}
        />
      </Field>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 rounded border border-primary bg-card"
          {...register("privacy")}
        />
        <span className="text-sm text-foreground">
          I agree to the{" "}
          <Link
            href="https://docs.google.com/document/d/1SOeNiG9wGwNqYdjwaJipM2hAjUogCvzE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline">
            Privacy Policy
          </Link>
          <span className="text-primary">*</span>
        </span>
      </label>
      <FieldError message={errors.privacy?.message} />
      <SubmitStatus status={status} />
      <Button type="submit" disabled={isSubmitting} className="w-[110px]">
        {isSubmitting ? "..." : "Submit"}
      </Button>
    </form>
  );
}
