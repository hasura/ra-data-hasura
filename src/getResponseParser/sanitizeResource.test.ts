import { sanitizeResource } from './sanitizeResource';

describe('sanitizeResource', () => {
  it('should properly parse array values at any depth', () => {
    expect(sanitizeResource([0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
    expect(sanitizeResource([[0, 1, 2, 3]])).toEqual([[0, 1, 2, 3]]);
    expect(sanitizeResource({ data: [[0, 1, 2, 3]] })).toEqual({
      data: [[0, 1, 2, 3]],
    });
  });

  it('should add keyIds for arrays of objects with id', () => {
    expect(
      sanitizeResource({
        testValue: [
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' },
        ],
      })
    ).toEqual({
      testValue: [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ],
      testValueIds: [1, 2],
    });
  });

  it('should add key.id value for objects with id', () => {
    expect(
      sanitizeResource({
        testValue: { id: 1, name: 'Test 1' },
      })
    ).toEqual({
      testValue: { id: 1, name: 'Test 1' },
      'testValue.id': 1,
    });
  });

  it('It keeps null values', () => {
    expect(
      sanitizeResource([
        { name: 'vendor', value: 'Test Vendor' },
        { name: 'brand', value: null },
      ])
    ).toEqual([
      { name: 'vendor', value: 'Test Vendor' },
      { name: 'brand', value: null },
    ]);
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
    ).toEqual([
      {
        name: 'vendor',
        value: 'Test Vendor',
        metadata: {
          _key: 'value',
          fields: [{ _type: 'string', name: 'title' }],
        },
      },
    ]);
  });
});
