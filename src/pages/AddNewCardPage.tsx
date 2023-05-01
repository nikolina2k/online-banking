import React from "react";
import NewAccountForm from "../components/NewAccountForm/NewAccountForm";
import { Account } from "../components/Board/Board";

interface Props {
  handleSubmit: (acc: Account) => void;
}

const AddNewCardPage: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <div>
      <NewAccountForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddNewCardPage;
