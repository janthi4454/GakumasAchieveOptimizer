import { CONFIG } from "@/config";
import { saveToStorage, zLoadFromStorage } from "@/lib/serde";
import { IdolValueSchema, type TMilestone, TotalValueSchema } from "@/schema";
import {
    IdolAchievements,
    Idols,
    LessonMapping,
    type TAchieveGroup,
    type TAllAchievement,
    type TIdol,
    type TIdolAchievement,
    TotalAchievements,
    TotalLessonAchievements,
    TotalOtherAchievements,
    type TTotalLessonAchievement,
    type TTotalOtherAchievement
} from "@/types";
import { includes, makeRecordFromIterator, makeRecordFromRecord } from "@/utils";
import { defineStore } from "pinia";
import { computed, type ComputedRef, ref } from "vue";
import { useIdolStore } from "./idol";

const STORAGE_PREFIX = "gakumas-achievement"
const IDOL_STORAGE_KEY = `${STORAGE_PREFIX}-idol`
const TOTAL_STORAGE_KEY = `${STORAGE_PREFIX}-total`

type TMilestoneInfo = { numProduceNeeded: number, exp: number }
type TMilestoneNext = { achGroup: TAchieveGroup, achievement: TAllAchievement, numProduceNeeded: number }
export type TMilestoneNextPercent = { next: number, percent: number }
type TAchGroupExpectation = { achGroup: TAchieveGroup, achievement: TAllAchievement, cumsum: number }
type TIdolCumsum = { idol: TIdol, cumsum: number }

/**
 *
 *
 */
function calcGainPerProduce(current: number | undefined, numProduce: number) {
    if (current !== undefined && numProduce > 0) {
        return current / numProduce;
    } else {
        return null;
    }
}

/**
 * 必要なプロデュース回数とそれを達成することで得られる経験値の配列を, 必要回数昇順で返す
 *
 * `numProduceNeeded > 0` が保証される
 */
function calcNumProduceNeeded(current: number | undefined, milestones: TMilestone[], gainPerProduce: number | null): TMilestoneInfo[] {
    const nums: TMilestoneInfo[] = [];

    if (current === undefined || gainPerProduce === null || gainPerProduce <= 0) {
        return nums;
    }

    for (const milestone of milestones) {
        if (current < milestone.threshold) {
            nums.push({
                numProduceNeeded: Math.ceil((milestone.threshold - current) / gainPerProduce),
                exp: milestone.exp
            });
        }
    }

    return nums.sort(
        (a, b) => (a.numProduceNeeded - b.numProduceNeeded)
    );
};

/**
 * 次のマイルストーンまでの達成率を返す
 */
function calcMilestoneNextPercent(current: number | undefined, milestones: TMilestone[]): TMilestoneNextPercent {
    if (current === undefined) {
        return {
            next: milestones[0]?.threshold ?? 0,
            percent: 0,
        };
    }

    let threshBefore = 0;

    for (const milestone of milestones.sort((a, b) => (a.threshold - b.threshold))) {
        if (current < milestone.threshold) {
            return {
                next: milestone.threshold,
                percent: (current - threshBefore) / (milestone.threshold - threshBefore) * 100
            }
        } else {
            threshBefore = milestone.threshold
        }
    }

    return {
        next: current,
        percent: 100,
    };
};

export const useExpStore = defineStore("expectation", () => {
    const config = CONFIG;


    const idolDefaults = makeRecordFromIterator(
        Idols,
        (idol) => makeRecordFromRecord(
            config.achievementMapping[idol],
            () => (0)
        )
    );

    const totalDefaults = makeRecordFromIterator(
        TotalAchievements,
        () => (0)
    );

    const currentIdolValues = ref(zLoadFromStorage(
        IDOL_STORAGE_KEY,
        IdolValueSchema,
        idolDefaults
    ));

    const currentTotalValues = ref(zLoadFromStorage(
        TOTAL_STORAGE_KEY,
        TotalValueSchema,
        totalDefaults
    ));

    async function saveCurrentValues() {
        saveToStorage(IDOL_STORAGE_KEY, currentIdolValues.value)
        saveToStorage(TOTAL_STORAGE_KEY, currentTotalValues.value)
    }

    const numLessonsClearedTotal = computed(
        () => {
            const data = currentTotalValues.value;

            return data.totalVoLesson + data.totalDaLesson + data.totalViLesson
        }
    )

    const idolAchievesWithLesson = [...IdolAchievements, ...TotalLessonAchievements]

    const asJson = computed(
        () => JSON.stringify(
            {
                idols: currentIdolValues.value,
                totals: currentTotalValues.value,
            }
        )
    )

    function calcGainPerProduceForIdol(idol: TIdol, achieve: TIdolAchievement | TTotalLessonAchievement): number | null {
        if (includes(achieve, IdolAchievements)) {
            return calcGainPerProduce(currentIdolValues.value[idol][achieve], currentIdolValues.value[idol]["numProduce"]);
        } else {
            if (currentTotalValues.value["totalProduce"] <= 0) {
                return null;
            }

            const idolStore = useIdolStore();
            const lessonWeight = idolStore.getLessonWeight(idol, LessonMapping[achieve]);

            return (
                numLessonsClearedTotal.value /
                currentTotalValues.value["totalProduce"] *
                lessonWeight
            )
        }
    };

    function calcGainPerProduceForTotal(achieve: TTotalOtherAchievement) {
        return calcGainPerProduce(currentTotalValues.value[achieve], currentTotalValues.value["totalProduce"]);
    };

    const gainsPerProduce = {
        idols: makeRecordFromIterator(
            Idols,
            (idol) => makeRecordFromIterator(
                idolAchievesWithLesson,
                (achieve) => computed(() => calcGainPerProduceForIdol(idol, achieve))
            )
        ),
        totals: makeRecordFromIterator(
            TotalOtherAchievements,
            (achieve) => computed(() => calcGainPerProduceForTotal(achieve))
        )
    }

    const numProduceNeededInfo = {
        idols: makeRecordFromIterator(
            Idols,
            (idol) => makeRecordFromIterator(
                idolAchievesWithLesson,
                (achieve) => computed(
                    () => {
                        if (includes(achieve, IdolAchievements)) {
                            return calcNumProduceNeeded(
                                currentIdolValues.value[idol][achieve],
                                config.achievements[achieve].milestones,
                                gainsPerProduce.idols[idol][achieve].value
                            )
                        } else {
                            return calcNumProduceNeeded(
                                currentTotalValues.value[achieve],
                                config.totalAchievements[achieve].milestones,
                                gainsPerProduce.idols[idol][achieve].value
                            )
                        }
                    }
                )
            )
        ),
        totals: makeRecordFromIterator(
            TotalOtherAchievements,
            (achieve) => computed(
                () => calcNumProduceNeeded(
                    currentTotalValues.value[achieve],
                    config.totalAchievements[achieve].milestones,
                    gainsPerProduce.totals[achieve].value
                )
            )
        )
    };

    const milestoneNext: ComputedRef<TMilestoneNext[]> = computed(
        () => {
            const milestoneNexts: TMilestoneNext[] = [];

            for (const idol of Idols) {
                for (const achieve of idolAchievesWithLesson) {
                    const next = numProduceNeededInfo.idols[idol][achieve].value[0];

                    if (next !== undefined) {
                        milestoneNexts.push(
                            {
                                achGroup: idol,
                                achievement: achieve,
                                numProduceNeeded: next.numProduceNeeded
                            }
                        )
                    }
                }
            }

            for (const achieve of TotalOtherAchievements) {
                const next = numProduceNeededInfo.totals[achieve].value[0];

                if (next !== undefined) {
                    milestoneNexts.push(
                        {
                            achGroup: "total",
                            achievement: achieve,
                            numProduceNeeded: next.numProduceNeeded
                        }
                    )
                }

            }

            return milestoneNexts
        }
    );

    const milestoneNextPercent = {
        idols: makeRecordFromIterator(
            Idols,
            (idol) => makeRecordFromIterator(
                IdolAchievements,
                (achieve) => computed(
                    () => calcMilestoneNextPercent(
                        currentIdolValues.value[idol][achieve],
                        config.achievements[achieve].milestones,
                    )
                )
            )
        ),
        totals: makeRecordFromIterator(
            TotalAchievements,
            (achieve) => computed(
                () => calcMilestoneNextPercent(
                    currentTotalValues.value[achieve],
                    config.totalAchievements[achieve].milestones,
                )
            )
        )
    };

    function getCumsum(milestoneInfo: TMilestoneInfo[]): number {
        return milestoneInfo.reduce(
            (prev, acc) => {
                return prev + (!Number.isNaN(acc.numProduceNeeded) ? acc.exp / acc.numProduceNeeded : 0)
            }, 0
        )
    }

    const totalOtherExpectations: ComputedRef<TAchGroupExpectation[]> = computed(
        () => TotalOtherAchievements.reduce(
            (prev, achieve) => {
                prev.push(
                    {
                        achGroup: "total",
                        achievement: achieve,
                        cumsum: getCumsum(numProduceNeededInfo.totals[achieve].value),
                    }
                )

                return prev;
            },
            [] as TAchGroupExpectation[]

        )
    )

    const totalCumsum = computed(
        () => totalOtherExpectations.value.reduce(
            (prev, acc) => prev + acc.cumsum, 0
        )
    )

    const idolExpectations: ComputedRef<TAchGroupExpectation[]> = computed(
        () => Idols.reduce<TAchGroupExpectation[]>(
            (prev, idol) => {
                const exps = idolAchievesWithLesson.reduce<TAchGroupExpectation[]>(
                    (prev, achieve) => {
                        prev.push(
                            {
                                achGroup: idol,
                                achievement: achieve,
                                cumsum: getCumsum(numProduceNeededInfo.idols[idol][achieve].value)
                            }
                        )

                        return prev
                    },
                    []
                )

                return [...prev, ...exps]
            },
            []
        )
    )

    const idolCumsums: ComputedRef<TIdolCumsum[]> = computed(
        () => Idols.map(
            (idol) => {
                const exps = idolExpectations.value.filter(
                    e => e.achGroup === idol
                )

                const idolSum = exps.reduce(
                    (prev, acc) => {
                        return prev + acc.cumsum
                    }, 0
                )

                return {
                    idol: idol,
                    cumsum: idolSum + totalCumsum.value
                }
            }
        )
    )

    async function updateCurrentIdolValues(rawJs: string) {
        const parsed = IdolValueSchema.parse(rawJs);

        Idols.forEach(
            (idol) => IdolAchievements.forEach(
                (ach) => {
                    const value = parsed[idol][ach];

                    if (value !== undefined) {
                        currentIdolValues.value[idol][ach] = value;
                    }
                }
            )
        )
    }

    async function updateCurrentTotalValues(rawJs: string) {
        const parsed = TotalValueSchema.parse(rawJs);

        TotalAchievements.forEach(
            (ach) => {
                const value = parsed[ach];

                if (value !== undefined) {
                    currentTotalValues.value[ach] = value;
                }
            }
        )
    }


    return {
        saveCurrentValues,
        currentIdolValues,
        currentTotalValues,
        asJson,
        milestoneNext,
        milestoneNextPercent,
        idolExpectations,
        totalOtherExpectations,
        idolCumsums,
        updateCurrentIdolValues,
        updateCurrentTotalValues,
    }

})