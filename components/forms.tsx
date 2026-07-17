import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export function CreatorForm() {
  return (
    <form className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <input type="text" placeholder="John" className={inputClasses} />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            placeholder="John@john.com"
            className={inputClasses}
          />
        </Field>
      </div>
      <Field label="Links to your social media accounts" required>
        <input
          type="text"
          placeholder="Instagram, Tiktok, Youtube, Facebook"
          className={`${inputClasses} py-4`}
        />
      </Field>
      <Field label="Message">
        <textarea
          rows={4}
          placeholder="Your message to our team..."
          className={`${inputClasses} resize-none py-4`}
        />
      </Field>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 rounded border border-primary bg-card"
        />
        <span className="text-sm text-foreground">
          I agree to the{" "}
          <Link href="https://docs.google.com/document/d/1SOeNiG9wGwNqYdjwaJipM2hAjUogCvzE/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Privacy Policy
          </Link>
          <span className="text-primary">*</span>
        </span>
      </label>
      <Button className="w-[110px]">Submit</Button>
    </form>
  );
}

export function BrandForm() {
  return (
    <form className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <input type="text" placeholder="John" className={inputClasses} />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            placeholder="John@john.com"
            className={inputClasses}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Brand/Company">
          <input type="text" placeholder="Brand" className={inputClasses} />
        </Field>
        <Field label="Website" required>
          <input
            type="url"
            placeholder="https://neocampaign.net/"
            className={inputClasses}
          />
        </Field>
      </div>
      <Field label="Budget" required>
        <select
          className="w-full appearance-none rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-muted-foreground focus:outline-none"
          defaultValue="0">
          <option value="0" disabled>
            Please select
          </option>
          <option value="1k-5k">$1K - $5K</option>
          <option value="5k-10k">$5K - $10K</option>
          <option value="10k-25k">$10K - $25K</option>
          <option value="25k-50k">$25K - $50K</option>
          <option value="50k+">$50K+</option>
        </select>
      </Field>
      <Field label="Message">
        <textarea
          rows={3}
          placeholder="Your message to our team..."
          className={`${inputClasses} resize-none`}
        />
      </Field>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 rounded border border-primary bg-card"
        />
        <span className="text-sm text-foreground">
          I agree to the{" "}
          <Link href="https://docs.google.com/document/d/1SOeNiG9wGwNqYdjwaJipM2hAjUogCvzE/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Privacy Policy
          </Link>
          <span className="text-primary">*</span>
        </span>
      </label>
      <Button className="w-[110px]">Submit</Button>
    </form>
  );
}
