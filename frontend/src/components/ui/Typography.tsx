import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "title"
  | "body"
  | "caption";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  children: ReactNode;
}

const styles = {
  display: "text-5xl font-bold tracking-tight",
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  title: "text-xl font-semibold",
  body: "text-base text-slate-700",
  caption: "text-sm text-slate-500",
};

export default function Typography({
  variant = "body",
  className,
  children,
  ...props
}: TypographyProps) {
  const Component =
    variant === "display"
      ? "h1"
      : variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : "p";

  return (
    <Component
      className={cn(styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

