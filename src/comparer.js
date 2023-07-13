const generateString = (polar, key, value) => [polar, `${key}: ${value}`];

export default (object1, object2) => {
  const result = [];

  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);

  object1Keys.forEach((key) => {
    if (Object.hasOwn(object2, key)) {
      if (object1[key] === object2[key]) {
        result.push(generateString(' ', key, object1[key]));
      } else {
        result.push(generateString('-', key, object1[key]));
        result.push(generateString('+', key, object2[key]));
      }
    } else {
      result.push(generateString('-', key, object1[key]));
    }
  });

  object2Keys.forEach((key) => {
    if (!Object.hasOwn(object1, key)) {
      result.push(generateString('+', key, object2[key]));
    }
  });

  return result
    .sort(([, keyA], [, keyB]) => {
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }

      return 0;
    })
    .map((element) => element.join(' '))
    .join('\n');
};
