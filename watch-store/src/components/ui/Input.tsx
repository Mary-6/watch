import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full border-b border-ink/10 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-brass placeholder:text-stone",
        className
      )}
      {...props}
    />
  );
}
