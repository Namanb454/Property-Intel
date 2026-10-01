import { cn } from "@/lib/utils";

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
}

interface ChoiceGroupProps<T extends string> {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  /** Light pills sit on the page; dark pills sit on the black band. */
  tone?: "light" | "dark";
  className?: string;
}

const PILL = "h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm";
const PILL_TONES = {
  light: {
    on: "border-ink bg-ink font-semibold text-white",
    off: "border-line-strong bg-surface font-medium text-text-strong",
  },
  dark: {
    on: "border-band-text bg-band-text font-bold text-ink",
    off: "border-band-chip bg-transparent font-medium text-band-chip-text",
  },
};

/** A row of toggle pills where exactly one is selected. */
export function PillGroup<T extends string>({
  options,
  value,
  onChange,
  label,
  tone = "light",
  className,
}: ChoiceGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "noscroll flex flex-wrap gap-2 max-sm:-mx-4 max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:px-4",
        className,
      )}
    >
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.value)}
            className={cn(PILL, on ? PILL_TONES[tone].on : PILL_TONES[tone].off)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const SEGMENT_TRACKS = {
  light: "bg-fill-tag",
  muted: "bg-fill-segment",
  dark: "noscroll max-w-full overflow-x-auto border border-band-line bg-band-sunken",
};

const SEGMENT_TONES = {
  light: {
    on: "px-[1.125rem] bg-surface font-bold text-ink shadow-segment",
    off: "px-[1.125rem] bg-transparent font-semibold text-text",
  },
  dark: {
    on: "px-4 bg-surface font-bold text-ink",
    off: "px-4 bg-transparent font-semibold text-band-segment",
  },
};

/** A segmented control: options share one track and the selected one is raised. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  tone = "light",
  track = tone === "dark" ? "dark" : "light",
  className,
}: ChoiceGroupProps<T> & { track?: keyof typeof SEGMENT_TRACKS }) {
  const styles = SEGMENT_TONES[tone];
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex gap-1 self-start rounded-tile p-1", SEGMENT_TRACKS[track], className)}
    >
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.value)}
            className={cn("h-11 whitespace-nowrap rounded-[0.625rem] text-sm", on ? styles.on : styles.off)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
