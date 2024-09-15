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

export const TARGET_MUSCLE = "target" as const;

export const BODY_PART = "bodyPart" as const;

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

export const EQUIPMENT = "equipment" as const;

export const primaryBodyPartsAndTargetMuscles = [
  {
    type: TARGET_MUSCLE,
    value: "abs",
  },
  {
    type: BODY_PART,
    value: "back",
  },
  {
    type: TARGET_MUSCLE,
    value: "biceps",
  },
  {
    type: TARGET_MUSCLE,
    value: "calves",
  },
  {
    type: BODY_PART,
    value: "cardio",
  },
  {
    type: BODY_PART,
    value: "chest",
  },
  {
    type: TARGET_MUSCLE,
    value: "forearms",
  },
  {
    type: TARGET_MUSCLE,
    value: "glutes",
  },
  {
    type: TARGET_MUSCLE,
    value: "hamstrings",
  },
  {
    type: BODY_PART,
    value: "neck",
  },
  {
    type: TARGET_MUSCLE,
    value: "quads",
  },
  {
    type: BODY_PART,
    value: "shoulders",
  },
  {
    type: TARGET_MUSCLE,
    value: "triceps",
  },
] as const;

export const secondaryBodyPartsAndTargetMuscles = [
  {
    type: TARGET_MUSCLE,
    value: "abductors",
  },
  {
    type: TARGET_MUSCLE,
    value: "adductors",
  },
  {
    type: BODY_PART,
    value: "lower arms",
  },
  {
    type: BODY_PART,
    value: "lower legs",
  },
  {
    type: TARGET_MUSCLE,
    value: "lats",
  },
  {
    type: TARGET_MUSCLE,
    value: "levator scapulae",
  },
  {
    type: TARGET_MUSCLE,
    value: "pectorals",
  },
  {
    type: TARGET_MUSCLE,
    value: "serratus anterior",
  },
  {
    type: TARGET_MUSCLE,
    value: "spine",
  },
  {
    type: TARGET_MUSCLE,
    value: "traps",
  },
  {
    type: BODY_PART,
    value: "upper arms",
  },
  {
    type: BODY_PART,
    value: "upper legs",
  },
  {
    type: BODY_PART,
    value: "waist",
  },
] as const;

export const allBodyPartsAndTargetMuscles = [
  ...primaryBodyPartsAndTargetMuscles,
  ...secondaryBodyPartsAndTargetMuscles,
];

export type TargetMuscle = Extract<
  (typeof allBodyPartsAndTargetMuscles)[number],
  { type: typeof TARGET_MUSCLE }
>["value"];

export type BodyPart = Extract<
  (typeof allBodyPartsAndTargetMuscles)[number],
  { type: typeof BODY_PART }
>["value"];
