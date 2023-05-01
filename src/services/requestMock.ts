import { Account } from '../components/Board/Board';
import { Operation } from '../components/TimelineItem/TimelineItem';
import accounts from '../mocks/accountsMock.json';
import operations from '../mocks/operationsMock.json';

const promiseResponse = <T>(data: T) =>
	new Promise<T>(resolve => {
		setTimeout(() => {
			resolve(data);
		}, 500);
	});

export const getAccounts = () => promiseResponse(accounts as Account[]);

export const getOperations = (accountId: number) => {
	const accountOperations = operations[accountId] || [];

	return promiseResponse(accountOperations as Operation[]);
};
