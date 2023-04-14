import React from "react";
import cn from "classnames";

import styles from "./BoardItem.module.css";
import Money, { currencies, type Currency } from "../Money/Money";

export type AccountType = "debit" | "credit" | "external" | "saving" | "loan";

interface BoardItemProps {
  type: AccountType;
  title: string;
  customTitle?: string;
  amount?: number;
  currency?: Currency;
}

export const CurrencySymbol = ({
  currency,
}: Pick<BoardItemProps, "currency">) => {
  if (currency === undefined) {
    return null;
  }

  return <span>{currencies[currency]}</span>;
};

const BoardItem: React.FC<BoardItemProps> = ({
  type,
  title,
  customTitle,
  amount,
  currency,
}) => {
  const accountName = customTitle ?? title;
  const showBalance = type !== "external";

  return (
    <div className={styles.item}>
      <div className={cn(styles.logo, styles[`logo_${type}`])}>
        <CurrencySymbol currency={currency}></CurrencySymbol>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{accountName}</div>
        {showBalance && amount !== undefined && (
          <Money value={amount} currency={currency} />
        )}
      </div>
    </div>
  );
};

export default BoardItem;
