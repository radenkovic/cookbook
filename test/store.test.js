beforeEach(() => {
  jest.mock('../lib/handlers/error');
  jest.resetModules();
});

it('dispatches action with arguments', () => {
  const store = require('../lib');
  const mockHandler = jest.fn();
  const doneMock = jest.fn();
  store.done = () => doneMock;
  store.register('mock-handler', mockHandler);

  store.dispatch('mock-handler', 'test', 'omitted');

  const [a, b, c] = mockHandler.mock.calls[0];
  expect(mockHandler).toBeCalledTimes(1);
  expect(a).toBe('test');
  expect(b).toBe(store);
  expect(c).toBeDefined();
});

it('Sucessfully unregisters handler', () => {
  const hndlr = jest.fn();
  const store = require('../lib');
  store.register('to-remove', hndlr);
  store.unregister('to-remove', hndlr);
  store.dispatch('to-remove');
  expect(hndlr).toBeCalledTimes(0);
});

it('Store get and set', () => {
  const store = require('../lib');
  store.set('sample', 1);
  expect(store.get('sample')).toBe(1);
});

it('Store get all handlers', () => {
  const hndlr = jest.fn();
  const store = require('../lib');
  store.register('fake-handler', hndlr);
  expect(store.handlers.includes('fake-handler')).toBe(true);
});
