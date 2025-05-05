import { z } from "zod";

export const computedDataSchema = z.object({
  karate: z.number(),
  neuron: z.number(),
  wazamae: z.number(),
  jitsu: z.number(),
  con: z.number(),
  pow: z.number(),
  mov: z.number(),
  dodge: z.number(),
  initiative: z.number(),
  karateDice: z.number(),
  neuronDice: z.number(),
  wazamaeDice: z.number(),
  attackDice: z.number(),
  shootingDice: z.number(),
  hackingDice: z.number(),
  precisionDice: z.number(),
  highMobilityDice: z.number(),
  jitsuExecutionDice: z.number(),
  negotiationDice: z.number(),
  knowledgeDice: z.number(),
  researchDice: z.number(),
  additionalDodgeDice: z.number(),
  additionalDice: z.number(),
  dodgeDifficulty: z.number(),
  karateDiceDifficulty: z.number(),
  neuronDiceDifficulty: z.number(),
  wazamaeDiceDifficulty: z.number(),
  attackDiceDifficulty: z.number(),
  shootingDiceDifficulty: z.number(),
  hackingDiceDifficulty: z.number(),
  precisionDiceDifficulty: z.number(),
  highMobilityDiceDifficulty: z.number(),
  jitsuExecutionDiceDifficulty: z.number(),
  negotiationDiceDifficulty: z.number(),
  knowledgeDiceDifficulty: z.number(),
  researchDiceDifficulty: z.number(),
});

export const computedDataKeySchema = computedDataSchema.keyof();

// 装備部位と装備タイプの Enum
export const armorPartSchema = z.enum(["頭部", "腕部", "胴体", "脚部", "電脳", "レリック", "頭・腕", "胴・脚"]);
export const armorTypeSchema = z.enum(["防具", "基礎サイバネ", "追加サイバネ"]);

// 真偽値の型
export const hasSchema = z.boolean();
export const isWearingSchema = z.boolean();

// 補正データ
export const correctionSchema = z.object({
  key: computedDataKeySchema,
  size: z.number(),
});

// 好感度データ
export const likeabilitySchema = z.object({
  name: z.string(),
  likeability: z.number(),
});

// スキル
export const skillSchema = z.object({
  name: z.string(),
  has: hasSchema.optional(),
  correction: z.array(correctionSchema).nullable().optional(),
  effect: z.string().nullable().optional(),
});

// 装備
export const armorSchema = z.object({
  name: z.string(),
  type: armorTypeSchema,
  part: armorPartSchema,
  correction: z.array(correctionSchema).nullable().optional(),
  effect: z.string().nullable().optional(),
  isWearing: isWearingSchema.optional(),
});

// 武器
export const weaponSchema = z.object({
  name: z.string(),
  slot: z.number(),
  passiveCorrection: z.array(correctionSchema).nullable().optional(),
  equippedCorrection: z.array(correctionSchema).nullable().optional(),
  effect: z.string().nullable().optional(),
  isWearing: isWearingSchema.optional(),
});

// ステータス
export const statusSchema = z.object({
  id: z.string().nullable(),
  plName: z.string(),
  person: z.object({
    njName: z.string(),
    njType: z.string(),
    affiliation: z.string(),
    background: z.string(),
    goodKarma: z.boolean(),
  }),
  base: z.object({
    karate: z.number(),
    neuron: z.number(),
    wazamae: z.number(),
    jitsu: z.number(),
  }),
  memo: z.object({
    karate: z.string(),
    neuron: z.string(),
    wazamae: z.string(),
    jitsu: z.string(),
  }),
  wealth: z.object({
    dkk: z.number(),
    fame: z.number(),
    money: z.number(),
    loan: z.number(),
    likeability: z.array(likeabilitySchema),
  }),
  potion: z.object({
    sushi: z.number().min(0),
    toroSushi: z.number().min(0),
    toroPowder: z.number().min(0),
    cyberPainKiller: z.number().min(0),
    cyberZazen: z.number().min(0),
    zbr: z.number().min(0),
  }),
  armor: z.array(armorSchema),
  weapon: z.array(weaponSchema),
  skillSlot: z.array(skillSchema),
  jitsuSlot: z.array(skillSchema),
  free: z.string(),
});

// 忍者データ
export const ninjaDataSchema = z.object({
  status: statusSchema,
  computedData: computedDataSchema,
});

export const fileSchema = z.object({
  file: z.custom<FileList>(val => val instanceof FileList && val.length > 0, {
    message: "ファイルを選択してください",
  }),
});

export const idSchema = z.coerce
  .number()
  .int()
  .transform(val => val.toString());
