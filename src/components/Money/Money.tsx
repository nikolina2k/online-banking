import React from "react";

export type Currency = "RUB" | "EUR" | "GBP" | "USD";
interface MoneyProps {
  value: number;
  currency?: Currency;
}

export const currencies: Record<Currency, string> = {
  EUR: "€",
  GBP: "£",
  RUB: "₽",
  USD: "$",
};

const Money: React.FC<MoneyProps> = ({ value, currency }) => {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: currency && "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const numberParts = formatter.formatToParts(value);
  const integerPart = numberParts
    .filter((part) => part.type === "integer")
    .map((part) => part.value)
    .join("");
  const decimalPart = numberParts
    .filter((part) => part.type === "fraction")
    .map((part) => part.value)
    .join("");

  return (
    <span>
      <span>{integerPart}</span>
      {decimalPart !== "00" && <span>,{decimalPart}</span>}
      {currency && <span>{currencies[currency]}</span>}
    </span>
  );
};

export default Money;
