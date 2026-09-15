"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="flex h-12 items-center border border-ink/10">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="h-full w-12 border-r border-ink/10 text-center text-lg transition hover:text-brass disabled:opacity-30"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(Math.max(n, min), max));
        }}
        className="h-full w-16 border-none bg-transparent text-center text-sm outline-none"
      />
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="h-full w-12 border-l border-ink/10 text-center text-lg transition hover:text-brass disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
