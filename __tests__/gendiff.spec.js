/* eslint-disable implicit-arrow-linebreak */
import { expect, beforeEach } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const getString = (data) => String(data).trim();

describe('#gendiff', () => {
  let fileName1;
  let fileName2;
  let filePath1;
  let filePath2;
  let expectedFile;

  describe('JSON', () => {
    beforeEach(() => {
      fileName1 = 'plain-json1.json';
      fileName2 = 'plain-json2.json';
      filePath1 = getFixturePath(fileName1);
      filePath2 = getFixturePath(fileName2);

      expectedFile = readFile('expected-plain-json.txt');
    });
    it('should compare plain JSON files', () => {
      expect(getString(gendiff(filePath1, filePath2))).toEqual(
        getString(expectedFile),
      );
    });
  });
});
