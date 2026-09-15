import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export default function Select({ options, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full cursor-pointer border-b border-ink/10 bg-transparent py-3 pr-8 text-sm outline-none focus:border-brass",
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
