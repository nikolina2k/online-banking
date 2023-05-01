import { Reducer } from "redux";
import { Account } from "../../components/Board/Board";
import { Actions } from "./actions";

type State = Account[] | null;

const reducer: Reducer<State, Actions> = function reducer(state = [], action) {
  switch (action.type) {
    case "LOAD_ACCOUNTS":
      return null;
    case "LOAD_ACCOUNTS_FAILURE":
      return null;
    case "LOAD_ACCOUNTS_SUCCESS":
      return action.payload;
    case "CHANGE_ACCOUNT_TITLE":
      return (
        state?.map((acc) =>
          acc.id === action.payload.id
            ? { ...acc, customTitle: action.payload.customTitle }
            : acc
        ) ?? null
      );
    case "ADD_ACCOUNT":
      return [...(state ?? []), action.payload];
    case "REMOVE_EXTERNAL_ACCOUNT":
      return (
        state?.filter(
          (acc) => acc.type !== "external" || acc.id !== action.payload.id
        ) ?? null
      );
    default:
      return state;
  }
};

export default reducer;
