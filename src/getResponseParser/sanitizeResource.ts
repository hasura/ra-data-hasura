export const sanitizeResource = (data: any = {}) => {
  const result: any = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith('_')) {
      return acc;
    }

    const dataKey = data[key];

    if (dataKey === null || dataKey === undefined) {
      return acc;
    }
    if (Array.isArray(dataKey)) {
      if (dataKey[0] && typeof dataKey[0] === 'object') {
        // if var is an array of reference objects with id properties
        if (dataKey[0].id != null) {
          return {
            ...acc,
            [key]: dataKey.map(sanitizeResource),
            [`${key}Ids`]: dataKey.map((d) => d.id),
          };
        } else {
          return {
            ...acc,
            [key]: dataKey.map(sanitizeResource),
          };
        }
      } else {
        return { ...acc, [key]: dataKey };
      }
    }

    if (typeof dataKey === 'object') {
      return {
        ...acc,
        ...(dataKey &&
          dataKey.id && {
            [`${key}.id`]: dataKey.id,
          }),
        [key]: sanitizeResource(dataKey),
      };
    }

    return { ...acc, [key]: dataKey };
  }, {});

  return result;
};
