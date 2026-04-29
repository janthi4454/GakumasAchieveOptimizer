import { excludeUnion } from "./utils";

export const StTypes = [
    "Vo",
    "Da",
    "Vi",
] as const;

export type TStType = typeof StTypes[number];

export const CommonAchievements1 = [
    "numCardUsed",
    "numLesson",
    "numSPLesson",
    "numProduce",
    "numPassExam",
    "numFan",
] as const;

export const CommonAchievements2 = [
    "numSpecialAsari",
    "numFanVoting",
] as const;

export const CommonAchievements = [
    ...CommonAchievements1,
    ...CommonAchievements2,
] as const;

export const OptionalAchievements = [
    "evaluatedPoint",
    "numDrinkUsed",
    "healthUsed",
    "energyGot",
    "numCardUpgrade",
    "asari",
] as const;

export const TotalAchievements = [
    "totalPPoint",
    "totalCards",
    "totalPItem",
    "totalPDrink",
    "totalVoLesson",
    "totalDaLesson",
    "totalViLesson",
    "totalSupplies",
    "totalOdekakeOrClass",
    "totalCardUpgrade",
    "totalAsari",
    "totalLesson",
    "totalSPLesson",
    "totalEnergy",
    "totalProduce",
] as const;

export const TotalLessonAchievements = [
    "totalVoLesson",
    "totalDaLesson",
    "totalViLesson",
] as const;

export const TotalOtherAchievements = excludeUnion(TotalAchievements, TotalLessonAchievements)

export const IdolAchievements = [...CommonAchievements1, ...OptionalAchievements, ...CommonAchievements2] as const;
export const AllAchievements = [...TotalAchievements, ...IdolAchievements] as const;

export type TIdolAchievement = TCommonAchievement | TOptionalAchievement;
export type TTotalAchievement = typeof TotalAchievements[number];
export type TTotalLessonAchievement = typeof TotalLessonAchievements[number];
export type TTotalOtherAchievement = typeof TotalOtherAchievements[number];
export type TAllAchievement = typeof AllAchievements[number];

export const Idols = [
    "saki",
    "temari",
    "kotone",
    "tsubame",
    "mao",
    "lilja",
    // "rinha",
    "china",
    "sumika",
    "hiro",
    "sena",
    "misuzu",
    "ume",
    "rinami"
] as const;

export const LessonMapping: Record<TTotalLessonAchievement, TStType> = {
    totalVoLesson: "Vo",
    totalDaLesson: "Da",
    totalViLesson: "Vi",
} as const;

export const RecomRoutes = [
    "PPoint",
    "SkillCardUsed",
    "PItem",
    "PDrink",
    "Supplies",
    "OdekakeOrClass",
    "SkillCardUpgraded",
    "Asari",
    "EnergyUsed",
    "Produce",
] as const;

export type TCommonAchievement = typeof CommonAchievements[number];
export type TOptionalAchievement = typeof OptionalAchievements[number];

export type TIdol = typeof Idols[number];
export type TAchieveGroup = TIdol | "total";

export const Tiers = ["primary", "secondary", "tertiary"] as const;
export type TTier = typeof Tiers[number];

export type TSettings = {
    lessonWeight: Record<TTier, number>
}
