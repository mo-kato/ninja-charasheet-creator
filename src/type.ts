import type {
  armorPartSchema,
  armorTypeSchema,
  computedDataKeySchema,
  computedDataSchema,
  correctionSchema,
  equipmentSchema,
  fileSchema,
  likeabilitySchema,
  ninjaDataSchema,
  skillSchema,
  statusSchema,
  weaponSchema,
} from "@/schema";
import type { Control, UseFormRegister } from "react-hook-form";
import type { z } from "zod";

export type ComputedData = z.infer<typeof computedDataSchema>;
export type ComputedDataKey = z.infer<typeof computedDataKeySchema>;

export type StatusKey =
  | "njName"
  | "njType"
  | "affiliation"
  | "background"
  | "dkk"
  | "fame"
  | "money"
  | "loan"
  | "likeability"
  | "sushi"
  | "toroSushi"
  | "toroPowder"
  | "cyberPainKiller"
  | "cyberZazen"
  | "zbr"
  | "helmet"
  | "gauntlets"
  | "bodyArmor"
  | "greaves"
  | "relic"
  | "weapon"
  | "skill"
  | "jitsuSystem"
  | "knowledge"
  | "armor"
  | "weapon"
  | "skillSlot"
  | "cybernetic"
  | "jitsuSlot"
  | "free";

export type ArmorPart = z.infer<typeof armorPartSchema>;
export type ArmorType = z.infer<typeof armorTypeSchema>;
export type Correction = z.infer<typeof correctionSchema>;
export type Likeability = z.infer<typeof likeabilitySchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Equipment = z.infer<typeof equipmentSchema>;
export type Weapon = z.infer<typeof weaponSchema>;
export type Status = z.infer<typeof statusSchema>;
export type NinjaData = z.infer<typeof ninjaDataSchema>;

export interface CommonSlotProps {
  register: UseFormRegister<Status>;
  control: Control<Status>;
}

export type FormData = z.infer<typeof fileSchema>;
