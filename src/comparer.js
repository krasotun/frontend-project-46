/* eslint-disable operator-linebreak */
const distinctData = (data) => {
  const result = [];
  data.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result;
};

const getSortedKeys = (object1, object2) => {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const unionKeys = distinctData([...object1Keys, ...object2Keys]);
  return unionKeys.sort();
};

const comparer = (object1, object2) => {
  const keys = getSortedKeys(object1, object2);

  const result = keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (
      typeof value1 === 'object' &&
      !Array.isArray(value1) &&
      typeof value2 === 'object' &&
      !Array.isArray(value2)
    ) {
      return { key, children: comparer(value1, value2), status: 'nested' };
    }

    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return {
        key,
        value1,
        status: 'deleted',
      };
    }

    if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      return {
        key,
        value2,
        status: 'added',
      };
    }

    if (value1 === value2) {
      return {
        key,
        value1,
        status: 'unchanged',
      };
    }

    return {
      key,
      value1,
      value2,
      status: 'changed',
    };
  });

  return result;
};

export default comparer;
