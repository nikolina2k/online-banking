import store from './store';

describe('Проверяем что store создается корректно', () => {
    it('инициализация без ошибок', () => {
        expect(store.getState()).toEqual({
            accounts: [],
            operations: [],
        });
    });

    it('асинхронные actions работают', () => {
        const testFunc = jest.fn();
        store.dispatch(testFunc);
        expect(testFunc).toHaveBeenCalled();
    });
});
