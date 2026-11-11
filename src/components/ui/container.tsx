import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  prose: "container-prose",
  page: "container-page",
  wide: "container-wide",
  /** Edge to edge, no gutters: campaign imagery. */
  bleed: "container-bleed",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizes;
} & ComponentPropsWithoutRef<T>;

/** Content column with responsive gutters (or full-bleed). */
export function Container<T extends ElementType = "div">({
  as,
  size = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn(sizes[size], className)} {...props} />;
}
