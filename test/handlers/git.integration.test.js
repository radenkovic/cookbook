const { GIT } = require('../../lib/constants/events');
beforeEach(() => {
  jest.mock('../../lib/handlers/error');
  jest.resetModules();
});

it('throws without url', () => {
  const errorHandler = require('../../lib/handlers/error');
  const store = require('../../lib');
  store.dispatch(GIT, { url: '' });
  expect(errorHandler).toBeCalledTimes(1);
  expect(errorHandler.mock.calls[0][0]).toBeInstanceOf(Error);
});

it('throws on rimraf fail', () => {
  const errorHandler = require('../../lib/handlers/error');
  const rimraf = require('rimraf');
  rimraf.sync = () => {
    throw new Error('fail');
  };
  const store = require('../../lib');
  store.dispatch(GIT, { url: 'zz' });
  expect(errorHandler).toBeCalledTimes(1);
  expect(errorHandler.mock.calls[0][0].message).toBe('fail');
});

it('throws on git.clone fail', () => {
  const errorHandler = require('../../lib/handlers/error');
  const git = require('../../lib/utils/git-client');
  git.clone = () => {
    throw new Error('git fail');
  };
  const store = require('../../lib');
  store.dispatch(GIT, { url: 'zz' });
  expect(errorHandler).toBeCalledTimes(1);
  expect(errorHandler.mock.calls[0][0].message).toBe('git fail');
});
