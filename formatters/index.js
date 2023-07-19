import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';
import jsonFormatter from './json.js';

// eslint-disable-next-line consistent-return
export default (data, format) => {
  switch (format) {
    case undefined:
      return stylishFormatter(data);
    case 'stylish':
      return stylishFormatter(data);
    case 'plain':
      return plainFormatter(data);
    case 'json':
      return jsonFormatter(data);
    default:
      console.log(new Error(`Unknown ${format}.`));
  }
};
