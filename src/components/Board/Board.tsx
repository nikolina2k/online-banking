import React from "react";
import BoardItem, { AccountType } from "../BoardItem/BoardItem";
import styles from "./Board.module.css";
import itemStyles from "../BoardItem/BoardItem.module.css";
import { Currency } from "../Money/Money";

import { NavLink } from "react-router-dom";

export interface Account {
  id?: number;
  type: AccountType;
  title: string;
  customTitle?: string;
  amount?: number;
  currency?: Currency;
}

const Board: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  accounts = accounts ?? [];
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

  return (
    <div className={styles.board}>
      {sortedAccounts.map((account) => (
        <NavLink
          key={account.id}
          className={styles.link}
          activeClassName="activeItem"
          to={`/account/${account.id}`}
        >
          <BoardItem key={account.id} {...account} />
        </NavLink>
      ))}
      <NavLink
        to="/actions/add_card"
        className={styles.link}
        activeClassName="activeItem"
      >
        <div
          className={itemStyles.item + " " + itemStyles.content}
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          Привязать карту
        </div>
      </NavLink>
    </div>
  );
};

export default Board;
