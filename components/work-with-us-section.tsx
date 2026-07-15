"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreatorForm, BrandForm } from "@/components/forms";
import { AnimatedNumber } from "@/components/animated-number";

const metrics = [
  { value: 450, prefix: "", suffix: "M+", label: "Impressions Generated" },
  { value: 300, prefix: "", suffix: "+", label: "Creators Worked With" },
  { value: 48, prefix: "", suffix: "hr", label: "Avg. Creator Match Time" },
  { value: 87, prefix: "", suffix: "%", label: "Brand Retention Rate" },
];

type FormType = "creator" | "brand";

interface WorkWithUsSectionProps {
  mode: "toggle" | "direct";
  type?: "creator" | "brand";
  variant?: "default" | "primary";
}

export function WorkWithUsSection({
  mode,
  type = "brand",
  variant = "default",
}: WorkWithUsSectionProps) {
  const [activeForm, setActiveForm] = useState<FormType | null>(null);

  function toggleForm(form: FormType) {
    setActiveForm((prev) => (prev === form ? null : form));
  }

  const isPrimary = variant === "primary";

  return (
    <section
      id="contact"
      className={
        isPrimary
          ? "bg-primar px-6 py-24"
          : "relative overflow-hidden py-24"
      }>
      <div
        className={
          isPrimary
            ? "mx-auto max-w-6xl"
            : "relative mx-auto container px-6"
        }>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2
              className={`text-4xl font-bold leading-tight tracking-tight sm:text-5xl font-heading ${
                isPrimary
                  ? "text-primary-foreground"
                  : "text-foreground"
              }`}>
              Successful
              <br />
              Campaigns Are the
              <br />
              Objective.
            </h2>
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div
                    className={`text-4xl md:text-6xl font-bold ${
                      isPrimary
                        ? "text-primary-foreground md:text-5xl"
                        : "text-foreground"
                    }`}>
                    <AnimatedNumber
                      end={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </div>
                  <div
                    className={`mt-2 h-px ${
                      isPrimary
                        ? "w-24 bg-primary-foreground/20"
                        : "bg-[#CCD0D5]"
                    }`}
                  />
                  <div
                    className={`mt-2 text-sm font-medium ${
                      isPrimary
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }`}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-aos="fade-left">
            <div
              className={`rounded-(--radius) p-8 ${
                isPrimary ? "bg-card" : "bg-background"
              }`}>
              <h3
                className={`mb-3 font-medium ${
                  isPrimary
                    ? "text-2xl text-foreground"
                    : "text-[32px] text-foreground"
                }`}>
                Work with us
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                Complete this quick form and we will get back to you as soon as
                possible.
              </p>
              {mode === "toggle" ? (
                <>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1"
                      variant={activeForm === "creator" ? "outline" : "default"}
                      onClick={() => toggleForm("creator")}>
                      I am a creator
                    </Button>
                    <Button
                      className="flex-1"
                      variant={activeForm === "brand" ? "outline" : "default"}
                      onClick={() => toggleForm("brand")}>
                      I am a brand
                    </Button>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      activeForm ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}>
                    <div className="overflow-hidden">
                      <div className="pt-8">
                        {activeForm === "creator" && <CreatorForm />}
                        {activeForm === "brand" && <BrandForm />}
                      </div>
                    </div>
                  </div>
                </>
              ) : type === "creator" ? (
                <CreatorForm />
              ) : (
                <BrandForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
