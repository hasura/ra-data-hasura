import { buildGetListVariables } from './buildGetListVariables';
import { FetchType } from '../types';

/**
 * Minimal introspection resource used to exercise buildGetListVariables.
 * Only the shape the code actually reads is provided.
 */
const buildResource = (fields: string[]) =>
  ({
    type: {
      name: 'users',
      fields: fields.map((name) => ({
        name,
        type: { kind: 'SCALAR', name: 'String' },
      })),
    },
  }) as any;

const buildParams = (sort: { field: string; order: string } | undefined) =>
  ({
    filter: {},
    pagination: { page: 1, perPage: 10 },
    sort,
  }) as any;

const buildFn = (fields: string[]) => buildGetListVariables({} as any);

describe('buildGetListVariables - deterministic ordering', () => {
  const resourceFields = ['id', 'name', 'count'];

  it('appends the primary key to a single sort field', () => {
    const fn = buildFn(resourceFields);
    const result = fn(
      buildResource(resourceFields),
      FetchType.GET_LIST,
      buildParams({ field: 'count', order: 'ASC' })
    );

    expect(result.order_by).toEqual([{ count: 'asc' }, { id: 'asc' }]);
  });

  it('does not duplicate the primary key when it is already the sort field', () => {
    const fn = buildFn(resourceFields);
    const result = fn(
      buildResource(resourceFields),
      FetchType.GET_LIST,
      buildParams({ field: 'id', order: 'DESC' })
    );

    expect(result.order_by).toEqual({ id: 'desc' });
  });

  it('appends the primary key to a multi sort', () => {
    const fn = buildFn(resourceFields);
    const result = fn(
      buildResource(resourceFields),
      FetchType.GET_LIST,
      buildParams({ field: 'count,name', order: 'ASC,DESC' })
    );

    expect(result.order_by).toEqual([
      { count: 'asc' },
      { name: 'desc' },
      { id: 'asc' },
    ]);
  });

  it('keeps existing behaviour when the resource has no id field', () => {
    const fn = buildFn(['name', 'count']);
    const result = fn(
      buildResource(['name', 'count']),
      FetchType.GET_LIST,
      buildParams({ field: 'count', order: 'ASC' })
    );

    expect(result.order_by).toEqual({ count: 'asc' });
  });

  it('does not add an order_by when no sort is provided', () => {
    const fn = buildFn(resourceFields);
    const result = fn(
      buildResource(resourceFields),
      FetchType.GET_LIST,
      buildParams(undefined)
    );

    expect(result.order_by).toBeUndefined();
  });

  it('preserves limit and offset alongside the deterministic order_by', () => {
    const fn = buildFn(resourceFields);
    const result = fn(
      buildResource(resourceFields),
      FetchType.GET_LIST,
      buildParams({ field: 'count', order: 'ASC' })
    );

    expect(result.limit).toEqual(10);
    expect(result.offset).toEqual(0);
    expect(result.order_by).toEqual([{ count: 'asc' }, { id: 'asc' }]);
  });
});
