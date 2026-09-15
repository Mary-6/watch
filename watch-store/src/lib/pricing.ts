export function toNumber(value: number | string | { toNumber?: () => number } | null | undefined): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value);
  if (typeof (value as { toNumber: () => number }).toNumber === "function") return (value as { toNumber: () => number }).toNumber();
  return 0;
}

export function calculateSubtotal(items: { price: number | string; quantity: number }[]) {
  return items.reduce((sum, item) => sum + toNumber(item.price) * item.quantity, 0);
}

export function calculateDiscount(subtotal: number, coupon: { type: "PERCENTAGE" | "FIXED"; value: number } | null) {
  if (!coupon) return 0;
  if (coupon.type === "FIXED") return Math.min(coupon.value, subtotal);
  return Math.min(subtotal * (coupon.value / 100), subtotal);
}

export function calculateShipping(subtotal: number, base = 0) {
  if (subtotal >= 5000) return 0;
  if (subtotal >= 1500) return 25;
  return base || 45;
}

export function calculateTotal(subtotal: number, discount: number, shipping: number) {
  return Math.max(0, subtotal - discount + shipping);
}
