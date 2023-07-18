const generateString = (polar, key, value) => `${polar} ${key}: ${value}`;

const plainFormatter = (data) => {
  const result = [];

  data.forEach((element) => {
    if (element.status === 'deleted') {
      result.push(generateString('-', element.key, element.value1));
    }

    if (element.status === 'unchanged') {
      result.push(generateString(' ', element.key, element.value1));
    }

    if (element.status === 'changed') {
      result.push(generateString('-', element.key, element.value1));
      result.push(generateString('+', element.key, element.value2));
    }

    if (element.status === 'added') {
      result.push(generateString('+', element.key, element.value2));
    }
  });
  return result.join('\n');
};

export default plainFormatter;
