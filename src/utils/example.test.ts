import {describe, expect, it} from 'vitest';
import {sample} from './example';

describe('example', () => {
  it('works', () => {
    expect(sample(1)).toBe(2);
  });
});
