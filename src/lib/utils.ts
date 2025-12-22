import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string | undefined) {
  if (amount === undefined || amount === null || amount === '-') return '₦0.00';

  const numericAmount = typeof amount === 'string'
    ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0
    : amount;

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(numericAmount).replace('NGN', '₦').trim();
}
