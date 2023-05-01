import type { Operation } from "../../components/TimelineItem/TimelineItem";

export type Actions =
  | LoadOperationsAction
  | LoadOperationsFailureAction
  | LoadOperationsSuccess;

export type LoadOperationsAction = { type: "LOAD_OPERATIONS" };
export type LoadOperationsFailureAction = { type: "LOAD_OPERATIONS_FAILURE" };
export type LoadOperationsSuccess = {
  type: "LOAD_OPERATIONS_SUCCESS";
  payload: Operation[];
};

export function loadOperationsAction(): LoadOperationsAction {
  return { type: "LOAD_OPERATIONS" };
}

export function loadOperationsFailureAction(): LoadOperationsFailureAction {
  return { type: "LOAD_OPERATIONS_FAILURE" };
}

export function loadOperationsSuccess(
  operations: Operation[]
): LoadOperationsSuccess {
  return { type: "LOAD_OPERATIONS_SUCCESS", payload: operations };
}
