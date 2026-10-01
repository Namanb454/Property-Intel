import { cn } from "@/lib/utils";

/** Round initials badge for desks and authors. */
export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-fill font-bold text-text-strong",
        size === "md" ? "size-8 text-xs" : "size-[1.625rem] text-[0.625rem]",
      )}
    >
      {initials}
    </span>
  );
}
