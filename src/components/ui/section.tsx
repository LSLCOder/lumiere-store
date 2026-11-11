import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  /** Ink band with canvas text, for campaign or service strips. */
  inverse: "bg-ink text-canvas",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Background tone. Separate stacked sections by tone or a border-t. */
  tone?: keyof typeof tones;
  /** Apply the standard responsive vertical padding. */
  spaced?: boolean;
};

export function Section({
  tone = "canvas",
  spaced = true,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], spaced && "section-y", className)}
      {...props}
    />
  );
}
