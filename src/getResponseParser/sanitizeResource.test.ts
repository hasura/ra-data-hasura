import { sanitizeResource } from './sanitizeResource';

describe('sanitizeResource', () => {
  it('It keeps null values', () => {
    expect(
      sanitizeResource([
        { name: 'vendor', value: 'Test Vendor' },
        { name: 'brand', value: null },
      ])
    ).toEqual({
      '0': { name: 'vendor', value: 'Test Vendor' },
      '1': { name: 'brand', value: null },
    });
  });
});
