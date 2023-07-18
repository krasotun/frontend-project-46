import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import comparer from './comparer.js';
import plainFormatter from '../formatters/plain.js';
import stylishFormatter from '../formatters/stylish.js';

const getFileType = (filePath) => path.extname(filePath).slice(1);
const getFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getFilePath(filePath), 'utf8');
const dataParse = (filepath, ext) => parse(filepath, ext);

export default (filePath1, filePath2, options) => {
  const ext1 = getFileType(filePath1);
  const path1 = getFilePath(filePath1);
  const data1 = readFile(path1);
  const parsedData1 = dataParse(data1, ext1);

  const ext2 = getFileType(filePath2);
  const path2 = getFilePath(filePath2);
  const data2 = readFile(path2);
  const parsedData2 = dataParse(data2, ext2);

  if (options === 'stylish') {
    return stylishFormatter(comparer(parsedData1, parsedData2));
  }

  return plainFormatter(comparer(parsedData1, parsedData2));
};
