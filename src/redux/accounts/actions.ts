import { Account } from "../../components/Board/Board";

export type Actions =
  | LoadAccountsAction
  | LoadAccountsFailureAction
  | LoadAccountsSuccessAction
  | ChangeAccountTitleAction
  | AddAccountAction
  | RemoveExternalAccountAction;

export type LoadAccountsAction = { type: "LOAD_ACCOUNTS" };
export type LoadAccountsFailureAction = { type: "LOAD_ACCOUNTS_FAILURE" };
export type LoadAccountsSuccessAction = {
  type: "LOAD_ACCOUNTS_SUCCESS";
  payload: Account[];
};
export type ChangeAccountTitleAction = {
  type: "CHANGE_ACCOUNT_TITLE";
  payload: Required<Pick<Account, "id" | "customTitle">>;
};
export type AddAccountAction = { type: "ADD_ACCOUNT"; payload: Account };
export type RemoveExternalAccountAction = {
  type: "REMOVE_EXTERNAL_ACCOUNT";
  payload: Required<Pick<Account, "id">>;
};

export function loadAccountsAction(): LoadAccountsAction {
  return { type: "LOAD_ACCOUNTS" };
}

export function loadAccountsFailureAction(): LoadAccountsFailureAction {
  return { type: "LOAD_ACCOUNTS_FAILURE" };
}
export function loadAccountsSuccess(
  accounts: Account[]
): LoadAccountsSuccessAction {
  return { type: "LOAD_ACCOUNTS_SUCCESS", payload: accounts };
}
export function changeAccountTitle(
  account: Required<Pick<Account, "id" | "customTitle">>
): ChangeAccountTitleAction {
  return { type: "CHANGE_ACCOUNT_TITLE", payload: account };
}

export function addAccount(account: Account): AddAccountAction {
  return { type: "ADD_ACCOUNT", payload: account };
}

export function removeExternalAccount(
  account: Required<Pick<Account, "id">>
): RemoveExternalAccountAction {
  return { type: "REMOVE_EXTERNAL_ACCOUNT", payload: account };
}
