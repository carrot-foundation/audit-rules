import { faker } from '@faker-js/faker';

import { stubArray, stubStringArray } from '../array.stubs';

describe('array stubs', () => {
  describe('stubArray', () => {
    it('should return an array with a random size', () => {
      const value = faker.string.nanoid();

      const result = stubArray(() => value);

      expect(result.length).toBeGreaterThanOrEqual(1);
      expect([...new Set(result)]).toEqual([value]);
    });

    it('should return an array with a fixed', () => {
      const value = faker.string.nanoid();
      const size = faker.number.int({ max: 1000, min: 1 });

      const result = stubArray(() => value, size);

      expect(result.length).toBe(size);
      expect([...new Set(result)]).toEqual([value]);
    });

    it('should set array range', () => {
      const value = faker.string.nanoid();

      const result = stubArray(() => value, { max: 1, min: 1 });

      expect(result).toEqual([value]);
    });
  });

  describe('stubStringArray', () => {
    it('should return an array with a random size', () => {
      const result = stubStringArray();

      expect(result.length).toBeGreaterThanOrEqual(1);

      expect(result.every((item) => typeof item === 'string')).toBe(true);
    });

    it('should set array range', () => {
      const result = stubStringArray(1, 1);

      expect(result).toEqual([expect.any(String)]);
    });
  });
});
