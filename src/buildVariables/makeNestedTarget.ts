import set from 'lodash/set';

type TargetEquals = {
  _eq: any;
};

type NestedTarget<K> =
  | K
  | {
      [key: string]: K | NestedTarget<K>;
    };

export const makeNestedTarget = (
  target: string,
  id: string | number
): NestedTarget<TargetEquals> => {
  // This simple example should make clear what this function does
  // makeNestedTarget("a.b", 42)
  // => { a: { b: { _eq: 42 } } }
  // makeNestedTarget("a.b@_contains@c.d", id)
  // => { a: { b: { _contains: { c: { d: 42 } } } } }

  let [path, operation = '_eq', oppath] = target.split('@');
  let value = oppath ? set({}, oppath.split('.'), id) : id;

  return set({}, path.split('.'), {
    [operation]: value,
  }) as NestedTarget<TargetEquals>;
};
