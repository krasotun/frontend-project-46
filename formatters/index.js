import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter(data);
    case 'plain':
      return plainFormatter(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};
