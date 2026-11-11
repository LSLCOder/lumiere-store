import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  /** The one action that matters on the screen. Solid ink. */
  primary: "btn-primary",
  /** Supporting action. 1px ink outline. */
  secondary: "btn-secondary",
  /** On imagery or an inverse section. Solid canvas. */
  light: "btn-light",
} as const;

const sizes = {
  md: "",
  lg: "btn-lg",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Stretch to the container width (common for primary actions on mobile). */
  block?: boolean;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  block = false,
}: StyleProps = {}) {
  return cn("btn", variants[variant], sizes[size], block && "btn-block");
}

export function Button({
  variant,
  size,
  block,
  className,
  type = "button",
  ...props
}: StyleProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    />
  );
}

/** A Next.js link styled as a button. */
export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...props
}: StyleProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    />
  );
}
