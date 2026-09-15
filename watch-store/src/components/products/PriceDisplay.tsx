import { formatCurrency } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  salePrice?: number | null;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({ price, salePrice, size = "md" }: PriceDisplayProps) {
  const sizeClasses = { sm: "text-sm", md: "text-2xl", lg: "text-3xl" };
  return (
    <div className={`flex items-center gap-3 ${sizeClasses[size]}`}>
      {salePrice ? (
        <>
          <span className="font-display font-medium text-brass">{formatCurrency(salePrice)}</span>
          <span className="text-sm text-stone line-through">{formatCurrency(price)}</span>
        </>
      ) : (
        <span className="font-display font-medium">{formatCurrency(price)}</span>
      )}
    </div>
  );
}
