export const targetMuscles = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "pectorals",
  "quads",
  "traps",
  "triceps",
  "upper back",
] as const;

export type TargetMuscle = (typeof targetMuscles)[number];

export const equipment = [
  "assisted",
  "band",
  "barbell",
  "body weight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "ez barbell",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "skierg machine",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "tire",
  "trap bar",
  "upper body ergometer",
  "weighted",
  "wheel roller",
] as const;

export type Equipment = (typeof equipment)[number];

export const bodyParts = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
] as const;

export type BodyPart = (typeof bodyParts)[number];
