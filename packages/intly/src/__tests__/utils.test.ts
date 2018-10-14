import { toArray } from '../utils';

describe('utils', () => {
  test('toArray()', () => {
    expect(toArray('str')).toEqual(['str']);
    expect(toArray(['str'])).toEqual(['str']);
  });
});
