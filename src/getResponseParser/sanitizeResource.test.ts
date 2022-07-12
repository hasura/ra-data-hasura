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

  it('Should skip key with two underscores', () => {
    expect(
      sanitizeResource([
        {
          name: 'vendor',
          value: 'Test Vendor',
          metadata: {
            _key: 'value',
            fields: [{ _type: 'string', name: 'title' }],
          },
          __typename: 'name',
        },
      ])
    ).toEqual({
      '0': {
        name: 'vendor',
        value: 'Test Vendor',
        metadata: {
          _key: 'value',
          fields: [{ _type: 'string', name: 'title' }],
        },
      },
    });
  });
});
