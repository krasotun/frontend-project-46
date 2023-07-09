export default (object1, object2) => {
  const result = [];

  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);

  for (const key of object1Keys) {
    if (object2.hasOwnProperty(key)) {
      if (object1[key] === object2[key]) {
        result.push(generateString(' ', key, object1[key]));
      } else {
        result.push(generateString('-', key, object1[key]));
        result.push(generateString('+', key, object2[key]));
      }
    } else {
      result.push(generateString('-', key, object1[key]));
    }
  }

  for (const key of object2Keys) {
    if (!object1.hasOwnProperty(key)) {
      result.push(generateString('+', key, object2[key]));
    }
  }
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

const generateString = (polar, key, value) => [polar, `${key}: ${value}`];
