import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';
import jsonFormatter from './json.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter(data);
    case 'plain':
      return plainFormatter(data);
    case 'json':
      return jsonFormatter(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};
