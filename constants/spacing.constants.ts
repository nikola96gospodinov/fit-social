export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 48,
  12: 64,
  13: 96,
  14: 128,
  15: 256,
} as const;

export type Spacing = keyof typeof spacing;
