/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
const getFrontIdent = (depth, replacer = ' ', spacesCount = 4) =>
  replacer.repeat(depth * spacesCount - 2);

const getBackIdent = (depth, replacer = ' ', spacesCount = 4) =>
  replacer.repeat(depth * spacesCount - spacesCount);

const makeString = (data, depth = 1) => {
  if (typeof data !== 'object' || data === null) {
    return `${data}`;
  }
  const frontIdent = getFrontIdent(depth);
  const backIdent = getBackIdent(depth);
  const currentValue = Object.entries(data);
  const lines = currentValue.map(
    ([key, value]) => `${frontIdent}  ${key}: ${makeString(value, depth + 1)}`,
  );
  return ['{', ...lines, `${backIdent}}`].join('\n');
};

const stylishFormatter = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const frontIdent = getFrontIdent(depth);
    const backIdent = getBackIdent(depth);

    const lines = currentValue.flatMap((node) => {
      const { key, children, status, value1, value2 } = node;
      switch (status) {
        case 'nested':
          return `${frontIdent}  ${key}: ${iter(children, depth + 1)}`;
        case 'deleted':
          return `${frontIdent}- ${key}: ${makeString(value1, depth + 1)}`;
        case 'added':
          return `${frontIdent}+ ${key}: ${makeString(value2, depth + 1)}`;
        case 'unchanged':
          return `${frontIdent}  ${key}: ${makeString(value1, depth + 1)}`;
        case 'changed':
          return [
            `${frontIdent}- ${key}: ${makeString(value1, depth + 1)}`,
            `${frontIdent}+ ${key}: ${makeString(value2, depth + 1)}`,
          ];

        default:
          throw new Error(`Unknown type ${status}.`);
      }
    });

    return ['{', ...lines, `${backIdent}}`].join('\n');
  };
  return iter(tree);
};

export default stylishFormatter;
