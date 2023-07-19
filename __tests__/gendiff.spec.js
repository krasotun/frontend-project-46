/* eslint-disable implicit-arrow-linebreak */
import { expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// const getString = (data) => String(data).trim();

const files = [
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yaml', 'filepath2.yaml'],
  ['filepath1.yml', 'filepath2.yml'],
];

describe('#gendiff', () => {
  describe('plain', () => {
    test.each(files)('plain format', (file1, file2) => {
      const filepath1 = getFixturePath(file1);
      const filepath2 = getFixturePath(file2);

      const result = readFile('resultplain.txt');

      expect(gendiff(filepath1, filepath2, 'plain')).toEqual(result);
    });
  });

  describe('stylish', () => {
    test.skip.each(files)('stylish format', (file1, file2) => {
      const filepath1 = getFixturePath(file1);
      const filepath2 = getFixturePath(file2);

      const result = readFile('resultstylish.txt');

      expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(result);
    });
  });
});
