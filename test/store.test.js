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

it('Git integration test', (cb) => {
  const errorHandler = require('../lib/handlers/error');
  const store = require('../lib');
  store.dispatch('git', { url: '' });
  expect(errorHandler).toBeCalledTimes(1);
  expect(errorHandler.mock.calls[0][0]).toBeInstanceOf(Error);
  cb();
});
