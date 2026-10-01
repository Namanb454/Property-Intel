import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icons";

type ButtonVariant = "primary" | "outline" | "inverse" | "outline-inverse";
type ButtonSize = "sm" | "md" | "lg" | "tall" | "xl";
type ButtonShape = "rounded" | "pill";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  /** Render as a full-width block with a centred label. */
  block?: boolean;
  /** Icon placed after the label. */
  icon?: IconName;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:text-white",
  outline: "border border-line-strong bg-surface text-ink",
  inverse: "bg-surface text-ink hover:text-ink",
  "outline-inverse": "border border-band-border text-band-text hover:text-band-text",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-11 px-3.5 text-[0.8125rem]",
  md: "h-11 px-[1.125rem] text-sm",
  lg: "h-[2.875rem] px-5 text-sm",
  tall: "h-12 px-6 text-sm",
  xl: "h-[3.25rem] px-6 text-[0.9375rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  shape = "rounded",
  block,
}: Omit<ButtonStyleProps, "icon">) {
  return cn(
    "items-center gap-2 whitespace-nowrap font-semibold",
    block ? "flex justify-center" : "inline-flex",
    shape === "pill" ? "rounded-full" : "rounded-control",
    VARIANTS[variant],
    SIZES[size],
  );
}

function ButtonContent({ children, icon }: { children: ReactNode; icon?: IconName }) {
  return (
    <>
      {children}
      {icon && <Icon name={icon} size={14} strokeWidth={2.4} />}
    </>
  );
}

type ButtonLinkProps = ButtonStyleProps & ComponentProps<typeof Link>;

export function ButtonLink({ variant, size, shape, block, icon, className, children, ...props }: ButtonLinkProps) {
  // Bordered links keep their border outside the height, matching the design's content-box anchors.
  const bordered = variant === "outline" || variant === "outline-inverse";
  return (
    <Link
      className={cn(buttonClasses({ variant, size, shape, block }), bordered && "box-content", className)}
      {...props}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant,
  size,
  shape,
  block,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, shape, block }), className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

/** Square 2.75rem icon button with a hairline border (masthead menu / search). */
export function IconButton({
  icon,
  label,
  iconSize = 18,
  className,
  ...props
}: { icon: IconName; label: string; iconSize?: number } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex size-11 items-center justify-center rounded-control border border-line bg-surface text-ink",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
