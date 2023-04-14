import React, { useState } from "react";
import MaskedInput from "react-maskedinput";
import Button from "../Button/Button";
import styles from "./NewAccountForm.module.css";
import { Account } from "../Board/Board";

interface ValidThruFieldsetProps {
  children: React.ReactNode;
  labelText: string;
}

const ValidThruFieldset = ({
  children,
  labelText,
}: Readonly<ValidThruFieldsetProps>) => (
  <label>
    <p className={styles.label}>{labelText}</p>
    <div className={styles.validThruFieldset}>{children}</div>
  </label>
);

interface NewAccountFormProps {
  handleSubmit: (account: Account) => void;
}

const NewAccountForm = ({ handleSubmit }: Readonly<NewAccountFormProps>) => {
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      new RegExp("^[0-9]{16}$").test(cardNumber.split(" ").join("")) &&
      new RegExp("^[0-9]{2}$").test(month) &&
      new RegExp("^[0-9]{2}$").test(year)
    ) {
      handleSubmit({
        id: undefined,
        type: "external",
        title: `Привязанная карта *${cardNumber.slice(-4)}`,
      });
      setCardNumber("");
      setMonth("");
      setYear("");
    }
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumber(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Привязка банковской карты</h2>
      <div className={styles.cardForm}>
        <MaskedInput
          mask="1111 1111 1111 1111"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Номер карты"
          className={styles.input}
          required
        />

        <ValidThruFieldset labelText={"VALID THRU"}>
          <MaskedInput
            mask="11"
            name="month"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            className={`${styles.input} ${styles.inputDate}`}
            required
          />
          <span>/</span>
          <MaskedInput
            mask="11"
            name="year"
            value={year}
            onChange={handleYearChange}
            placeholder="YY"
            className={`${styles.input} ${styles.inputDate}`}
            required
          />
        </ValidThruFieldset>

        <Button type="submit" disabled={!cardNumber && !month && !year}>
          Привязать
        </Button>
      </div>
    </form>
  );
};

export default NewAccountForm;
