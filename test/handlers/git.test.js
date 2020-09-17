const gitHandler = require('../../lib/handlers/git');
const gitClient = require('../../lib/utils/git-client');
const rimraf = require('rimraf');

jest.mock('rimraf');

it('Throws when called without path', async () => {
  try {
    await gitHandler({});
  } catch (e) {
    expect(e.message).toBeDefined();
  }
});

it('Calls all functions', async () => {
  const get = jest.fn();
  const dispatch = jest.fn();
  const clone = jest.fn();

  const store = {
    get,
    dispatch,
  };

  gitClient.clone = clone;
  get.mockReturnValueOnce('test_dirname');

  await gitHandler({ url: 'http://sample.com' }, store);
  expect(clone).toBeCalledTimes(1);
  expect(clone).toBeCalledWith('http://sample.com', 'test_dirname');
  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toBeCalledWith('git-done', 'test_dirname');
});

it('transforms string to github url', async () => {
  const get = jest.fn();
  const dispatch = jest.fn();
  const clone = jest.fn();
  rimraf.sync = jest.fn();

  const store = {
    get,
    dispatch,
  };

  gitClient.clone = clone;
  get.mockReturnValueOnce('test_dirname2');

  await gitHandler({ url: 'radenkovic/krang' }, store);
  expect(clone).toBeCalledWith(
    'git@github.com:radenkovic/krang.git',
    'test_dirname2'
  );
});

it('dispatches recipe path', async () => {
  const get = jest.fn();
  const dispatch = jest.fn();
  const clone = jest.fn();
  rimraf.sync = jest.fn();

  const store = {
    get,
    dispatch,
  };

  gitClient.clone = clone;
  get.mockReturnValueOnce('test_dirname');

  await gitHandler({ url: 'radenkovic/krang', recipePath: './test' }, store);
  expect(dispatch).toBeCalledWith('git-done', 'test_dirname/test');
});
