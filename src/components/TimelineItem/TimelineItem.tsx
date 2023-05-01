import React from "react";
import Money from "../Money/Money";
import styles from "./TimelineItem.module.css";

export interface Operation {
  id: number
  title: string;
  date: number;
  amount: number;
  currency: "RUB" | "EUR" | "GBP" | "USD";
}

const TimelineItem: React.FC<Operation> = ({
  title,
  date,
  amount,
  currency,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.date}>{formattedDate}</div>
        <Money value={amount} currency={currency} />
      </div>
    </div>
  );
};

export default TimelineItem;
