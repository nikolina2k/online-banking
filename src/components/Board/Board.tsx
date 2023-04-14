import React from "react";
import BoardItem, { AccountType } from "../BoardItem/BoardItem";
import styles from "./Board.module.css";
import { Currency } from "../Money/Money";

export interface Account {
  id?: number;
  type: AccountType;
  title: string;
  customTitle?: string;
  amount?: number;
  currency?: Currency;
}

const Board: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const sortedAccounts = accounts.slice().sort((a, b) => {
    const typeOrder: Record<AccountType, number> = {
      debit: 1,
      credit: 2,
      external: 3,
      saving: 4,
      loan: 5,
    };

    const currencyOrder: Record<Currency, number> = {
      RUB: 1,
      USD: 2,
      EUR: 3,
      GBP: 4,
    };

    if (typeOrder[a.type] !== typeOrder[b.type]) {
      return typeOrder[a.type] - typeOrder[b.type];
    } else if (a.currency && b.currency) {
      return currencyOrder[a.currency] - currencyOrder[b.currency];
    } else {
      return 0;
    }
  });
  console.log(sortedAccounts);

  return (
    <div className={styles.board}>
      {sortedAccounts.map((account) => (
        <BoardItem key={account.id} {...account} />
      ))}
    </div>
  );
};

export default Board;
