"use client";

import { useId, useState, type ChangeEvent } from "react";
import { routes } from "@/config/navigation";
import { calculateEmi, cn, formatINR, formatINRShort } from "@/lib/utils";
import { ButtonLink, RailHeading } from "@/components/ui";

interface SliderSpec {
  key: "principal" | "years" | "annualRatePct";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}

const SLIDERS: SliderSpec[] = [
  { key: "principal", label: "Loan amount", min: 1_000_000, max: 50_000_000, step: 500_000, format: formatINRShort },
  { key: "years", label: "Tenure", min: 5, max: 30, step: 1, format: (v) => `${v} years` },
  {
    key: "annualRatePct",
    label: "Interest rate",
    min: 6.5,
    max: 12,
    step: 0.05,
    format: (v) => `${v.toFixed(2).replace(/0$/, "")}%`,
  },
];

const DEFAULTS = { principal: 7_500_000, years: 20, annualRatePct: 8 };

interface EmiCalculatorProps {
  /** "compact" is the homepage rail card; "full" is the standalone tool. */
  variant?: "compact" | "full";
}

export function EmiCalculator({ variant = "compact" }: EmiCalculatorProps) {
  const [inputs, setInputs] = useState(DEFAULTS);
  const id = useId();
  const emi = calculateEmi(inputs);

  const update = (key: SliderSpec["key"]) => (e: ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }));

  const sliders = SLIDERS.map((slider) => (
    <div key={slider.key} className="flex flex-col gap-1">
      <label htmlFor={`${id}-${slider.key}`} className="flex justify-between text-[0.8125rem] text-text-soft">
        {slider.label}
        <strong className="font-bold text-ink">{slider.format(inputs[slider.key])}</strong>
      </label>
      <input
        id={`${id}-${slider.key}`}
        type="range"
        min={slider.min}
        max={slider.max}
        step={slider.step}
        value={inputs[slider.key]}
        onChange={update(slider.key)}
        className="m-0 h-7 w-full cursor-pointer accent-accent"
      />
    </div>
  ));

  const result = (
    <div aria-live="polite" className="flex flex-col gap-1 rounded-tile bg-accent-tint px-[1.125rem] py-4">
      <span className="text-xs font-semibold text-accent-deep">Your monthly EMI</span>
      <span
        className={cn(
          "font-serif font-semibold leading-[1.05] tracking-[-0.02em] text-ink",
          variant === "full" ? "text-5xl" : "text-4xl",
        )}
      >
        {formatINR(emi.monthly)}
      </span>
      <span className="text-xs text-text-subtle">
        Total interest {formatINRShort(emi.totalInterest)} over {inputs.years} years
      </span>
    </div>
  );

  if (variant === "full") {
    return (
      <div className="grid gap-8 rounded-panel border border-line bg-surface p-[clamp(1.25rem,3vw,2rem)] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">{sliders}</div>
        <div className="flex flex-col gap-4">
          {result}
          <dl className="m-0 grid grid-cols-2 gap-4 rounded-tile border border-line-soft p-4">
            <Figure label="Principal" value={formatINR(inputs.principal)} />
            <Figure label="Total interest" value={formatINR(emi.totalInterest)} />
            <Figure label="Total payment" value={formatINR(emi.totalPayment)} />
            <Figure label="Interest share" value={`${Math.round((emi.totalInterest / emi.totalPayment) * 100)}%`} />
          </dl>
          <p className="m-0 text-xs text-text-muted">
            Indicative only. Your lender&apos;s rate depends on your credit profile and loan-to-value ratio.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <RailHeading>Quick EMI check</RailHeading>
        <span className="text-[0.6875rem] text-text-muted">Rates vary by lender</span>
      </div>
      {result}
      {sliders}
      <ButtonLink href={routes.tool("emi-calculator")} variant="outline" block icon="arrow-right">
        Open the full calculator
      </ButtonLink>
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[.07em] text-text-muted">{label}</dt>
      <dd className="m-0 mt-1 text-base font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
