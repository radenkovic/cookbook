const gitHandler = require('../../lib/handlers/git');
const gitClient = require('../../lib/utils/git-client');
const { READ_RECIPE } = require('../../lib/constants/events');
const rimraf = require('rimraf');

let store;
beforeEach(() => {
  jest.resetAllMocks();
  store = {
    get: jest.fn(),
    dispatch: jest.fn(),
  };
  gitClient.clone = jest.fn();
});

it('Throws when called without path', async () => {
  const done = jest.fn();
  await gitHandler({}, store, done);
  expect(done).toBeCalledTimes(1);
  expect(done.mock.calls[0][0]).toBeInstanceOf(Error);
  expect(rimraf.sync).toBeCalledTimes(0);
});

it('Calls all functions', async () => {
  const done = jest.fn();

  store.get.mockReturnValueOnce('test_dirname');

  await gitHandler({ url: 'http://sample.com' }, store, done);
  expect(gitClient.clone).toBeCalledTimes(1);
  expect(gitClient.clone).toBeCalledWith('http://sample.com', 'test_dirname', {
    '--depth': 1,
  });
  expect(done).toBeCalledTimes(1);
  expect(rimraf.sync).toBeCalledTimes(1);
});

it('transforms string to github url', async () => {
  const done = jest.fn();

  store.get.mockReturnValueOnce('DEFAULT_DIR');
  await gitHandler({ url: 'radenkovic/krang' }, store, done);
  expect(gitClient.clone).toBeCalledWith(
    'git@github.com:radenkovic/krang.git',
    'DEFAULT_DIR',
    { '--depth': 1 }
  );
});

it('calls done with recipe path', async () => {
  const done = jest.fn();
  store.get.mockReturnValueOnce('test_dirname');
  await gitHandler(
    { url: 'radenkovic/krang', recipePath: './test' },
    store,
    done
  );
  expect(done).toBeCalledWith(null, READ_RECIPE, 'test_dirname/test');
  expect(rimraf.sync).toBeCalledTimes(1);
});
