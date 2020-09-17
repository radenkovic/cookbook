const store = require('../lib');

afterEach(() => {
  jest.resetModules();
});

it('dispatches action with arguments', () => {
  const mockHandler = jest.fn();
  store.register('mock-handler', mockHandler);

  store.dispatch('mock-handler', 'test', 'omitted');

  const [a, b, c] = mockHandler.mock.calls[0];
  expect(mockHandler).toBeCalledTimes(1);
  expect(a).toBe('test');
  expect(b).toBe(store);
  expect(c).toBeUndefined();
});
