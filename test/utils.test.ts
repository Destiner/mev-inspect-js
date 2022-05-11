import { describe, test, expect } from 'vitest';

import { equalWithTolerance } from '../src/utils.js';

describe('Utilities', () => {
  test('equalWithTolerance: should be true for equal values', () => {
    const values: [bigint, bigint, number][] = [
      [0n, 0n, 0.01],
      [12n, 12n, 0.01],
      [956n, 956n, 0.0000001],
      [34n, 34n, 1],
      [-3n, -3n, 0.01],
      [123_456_789_123_456_789_123_456n, 123_456_789_123_456_789_123_456n, 0.01],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(true);
    }
  });

  test('equalWithTolerance: should be true for values within bounds', () => {
    const values: [bigint, bigint, number][] = [
      [100n, 101n, 0.01],
      [987n, 978n, 0.01],
      [34_522n, 36_248n, 0.1],
      [100n, 200n, 1],
      [200n, 100n, 0.5],
      [100n, 101n, 0.05],
      [100n, 101n, 0.01],
      [100n, 99n,  0.01],
      [100n, 98n,  0.02],
      [-100n, -101n, 0.05],
      [-100n, -101n, 0.01],
      [-100n, -99n, 0.01],
      [-100n, -98n, 0.02],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(true);
    }
  });

  test('equalWithTolerance: should be false for values outside bounds', () => {
    const values: [bigint, bigint, number][] = [
      [10_000_000n, 9_999_999n, 0],
      [10_000_000n, 9_999_998n, 0.0000001],
      [10n, 9n, 0.01],
      [200n, 100n, 0.1],
      [100n, 200n, 0.5],
      [100n, 201n, 0.01],
      [100n, 102n, 0.01],
      [100n, 98n,  0.01],
      [-100n,  -102n,  0.01],
      [-100n,  -98n, 0.01],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(false);
    }
  });
});


