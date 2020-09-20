const { READ_RECIPE } = require('../../lib/constants/events');

beforeEach(() => {
  jest.mock('../../lib/handlers/error');
  jest.resetModules();
});

it('throws without yaml path', () => {
  const errorHandler = require('../../lib/handlers/error');
  const store = require('../../lib');
  store.dispatch(READ_RECIPE, 'dsa');
  expect(errorHandler).toBeCalledTimes(1);
  expect(errorHandler.mock.calls[0][0]).toBeInstanceOf(Error);
  expect(errorHandler.mock.calls[0][0].message.includes('find/read')).toBe(
    true
  );
});
