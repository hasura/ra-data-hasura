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
  return target
    .split('.')
    .reverse()
    .reduce(
      (acc, key) => ({
        [key]: acc,
      }),
      { _eq: id } as NestedTarget<TargetEquals>
    );
};
