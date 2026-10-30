import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "NGN", symbol: "₦", rate: 1600 },
  { code: "GBP", symbol: "£", rate: 0.78 },
  { code: "EUR", symbol: "€", rate: 0.92 },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export function formatPrice(amountUSD: number, currencyCode: CurrencyCode = "USD") {
  const currency = currencies.find((c) => c.code === currencyCode) || currencies[0];
  const converted = amountUSD * currency.rate;
  if (currencyCode === "NGN") {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currency.symbol}${converted.toFixed(2)}`;
}
