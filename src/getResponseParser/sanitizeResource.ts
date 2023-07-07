function isPrimitive(test: any) {
  return test !== Object(test);
}
export const sanitizeResource = (data: any): any => {
  // primitive no transformation needed (catches null, undefined, string, number, boolean)
  if (isPrimitive(data)) {
    return data;
  }

  // array, apply sanitizeResource to each element
  if (Array.isArray(data)) {
    return data.map(sanitizeResource);
  }

  // default object, check each (key, value) pair
  return Object.entries(data).reduce((acc, [key, value]) => {
    // intend to remove the following reserved names https://spec.graphql.org/draft/#sec-Names.Reserved-Names
    if (key.startsWith('__')) {
      return acc;
    }

    const newAcc: Record<string, any> = { ...acc };

    // if it's an array of objects, we want to create a new key with the list of ids
    if (Array.isArray(value) && value?.[0]?.id && value?.[0]?.id !== null) {
      newAcc[`${key}Ids`] = value.map((d) => d.id);
    }

    // if it's an object with an id, we want to create a new key with the id
    if ((value as any)?.id) {
      newAcc[`${key}.id`] = (value as any).id;
    }

    return { ...newAcc, [key]: sanitizeResource(value) };
  }, {} as Record<string, any>);
};
