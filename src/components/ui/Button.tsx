import { type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-sans font-semibold tracking-[0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-7 text-[0.95rem]",
  }[size];

  const variants = {
    primary:
      "bg-cocoa text-bg shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
    secondary:
      "bg-gold text-bg shadow-soft hover:-translate-y-0.5 hover:bg-gold/90",
    outline:
      "border border-cocoa/15 bg-porcelain/40 text-cocoa backdrop-blur hover:border-gold/40 hover:bg-porcelain/70",
    ghost: "text-cocoa/80 hover:bg-cocoa/5 hover:text-cocoa",
  }[variant];

  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />
  );
}
