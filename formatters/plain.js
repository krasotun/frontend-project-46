/* eslint-disable object-curly-newline */
const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  return String(value);
};

const plainFormatter = (data) => {
  const iter = (value, path) => {
    const result = value.flatMap((node) => {
      const { key, children, status, value1, value2 } = node;
      const fullPath = path === '' ? `${key}` : `${path}.${key}`;
      switch (status) {
        case 'nested':
          return iter(children, fullPath);
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${getValue(
            value2,
          )}`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${getValue(
            value1,
          )} to ${getValue(value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${status}.`);
      }
    });
    return result.join('\n');
  };
  return iter(data, '');
};

export default plainFormatter;
