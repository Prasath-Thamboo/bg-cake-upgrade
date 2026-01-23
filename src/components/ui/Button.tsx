import { type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cocoa/25";

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-6 text-base",
  }[size];

  const variants = {
    primary:
      "bg-cocoa text-bg shadow-soft hover:shadow-md hover:-translate-y-0.5",
    secondary:
      "bg-sand/80 text-cocoa shadow-soft hover:bg-sand hover:-translate-y-0.5",
    outline:
      "border border-cocoa/15 bg-white/35 text-cocoa backdrop-blur hover:bg-white/55",
  }[variant];

  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />
  );
}
