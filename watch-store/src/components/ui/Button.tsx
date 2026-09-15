import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-none px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300";
  const variants = {
    primary: "bg-ink text-cream hover:bg-brass",
    secondary: "bg-brass text-cream hover:bg-rust",
    outline: "border border-ink/20 bg-transparent text-ink hover:border-brass hover:text-brass",
    ghost: "bg-transparent text-ink hover:text-brass",
  };

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
