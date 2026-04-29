import { CONFIG } from "@/config";
import {
    IdolAchievements,
    TotalAchievements,
    type TAllAchievement,
    type TIdol,
    type TIdolAchievement,
    type TTotalAchievement
} from "@/types";
import { includes } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useAppStore = defineStore("app", () => {
    const config = CONFIG;

    // const panelStore = usePanelStore();
    // panelStore.init();

    // const fallback = {
    //     idols: makeRecordFromIterator(
    //         Idols, (idol) => makeRecordFromRecord(
    //             config.achievementMapping[idol],
    //             () => (0)
    //         )
    //     ),
    //     totals: makeRecordFromIterator(
    //         TotalAchievements,
    //         () => (0)
    //     )
    // }

    // const currentValues = ref(zLoadFromStorage(STORAGE_KEY, CurrentValueSchema, fallback));

    function* getIdolAchievements(idol: TIdol) {
        const achieves = config.achievementMapping[idol]
        for (const achieve of IdolAchievements) {
            const achieveName = achieves[achieve];

            if (achieveName !== undefined) {
                yield achieve;
            }
        }
    }

    function* getTotalAchievements() {
        yield* TotalAchievements;
    }

    function getAchievementName(achieve: TIdolAchievement, idol: TIdol): string;
    function getAchievementName(achieve: TTotalAchievement): string;
    function getAchievementName(achieve: TAllAchievement, idol?: TIdol): string {
        if (includes(achieve, IdolAchievements)) {
            if (idol !== undefined) {
                return config.achievementMapping[idol][achieve] ?? ""
            } else {
                return ""
            }
        } else {
            return config.totalAchievements[achieve].name
        }
    }

    function getAchievementFeatureName(achieve: TAllAchievement): string {
        if (includes(achieve, IdolAchievements)) {
            return config.achievements[achieve].name ?? ""
        } else {
            return config.totalAchievements[achieve].featureName
        }
    }

    function getMaxMilestone(achieve: TAllAchievement): number {
        if (includes(achieve, IdolAchievements)) {
            if (achieve === "numProduce") {
                return Number.MAX_SAFE_INTEGER
            }

            return config.achievements[achieve].milestones.reduce(
                (prev, acc) => Math.max(prev, acc.threshold),
                0
            )
        } else {
            return config.totalAchievements[achieve].milestones.reduce(
                (prev, acc) => Math.max(prev, acc.threshold),
                0
            )
        }
    }

    // // 各 idol 毎, 各 Achievement 毎の一回の Produce における将来平均獲得期待値を算出
    // const idolExpectations: ComputedRef<Record<TIdol, TIdolExpectation[]>> = computed(
    //     () => (
    //         Object.fromEntries(
    //             Idols.map(
    //                 (idol: TIdol) => {
    //                     const values = currentValues.value.idols[idol];
    //                     const numProduce = values.numProduce;

    //                     if (numProduce == 0) {
    //                         return [
    //                             idol,
    //                             []
    //                         ]
    //                     }

    //                     const expectations = IdolAchievements.reduce(
    //                         (prev, achieve) => {
    //                             if (values[achieve] !== undefined && CONFIG.achievements[achieve] !== undefined) {
    //                                 prev.push(
    //                                     {
    //                                         achievement: achieve,
    //                                         value: calcExpectation(values[achieve], CONFIG.achievements[achieve].milestones, numProduce)
    //                                     }
    //                                 )
    //                             }
    //                             return prev
    //                         }, [] as TIdolExpectation[]
    //                     )

    //                     return [
    //                         idol,
    //                         expectations
    //                     ]
    //                 }
    //             ) satisfies [TIdol, TIdolExpectation[]][]
    //         ) as Record<TIdol, TIdolExpectation[]>
    //     )
    // )

    // const totalExpectations: ComputedRef<ExpectationDef[]> = computed(
    //     () => {
    //         const values = currentValues.value["total"];
    //         const numProduce = values.totalProduce;
    //     }
    // )

    // const recommendations = computed<TIdolRecommendation[]>(
    //     () => (
    //         Idols.map(
    //             (idol) => {
    //                 const cumsum = idolExpectations.value[idol].reduce(
    //                     (prev, acc) => prev + acc.value, 0
    //                 );
    //                 return {
    //                     idol: idol,
    //                     cumsum: cumsum,
    //                     expectations: idolExpectations.value[idol].sort(
    //                         (a, b) => (b.value - a.value)
    //                     )
    //                 } satisfies TIdolRecommendation
    //             }
    //         ).sort(
    //             (a, b) => b.cumsum - a.cumsum
    //         )
    //     )
    // );

    // ── Snapshot (localStorage) ──
    // function saveSnapshot() {
    //     const snapshots = loadAllSnapshots();
    //     const snap: Snapshot = {
    //         id: crypto.randomUUID(),
    //         timestamp: new Date().toISOString(),
    //         currentValues: { ...currentValues.value },
    //     };
    //     snapshots.unshift(snap);
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    //     return snap;
    // }

    // function loadAllSnapshots(): Snapshot[] {
    //     const raw = localStorage.getItem(STORAGE_KEY);
    //     return raw ? JSON.parse(raw) : [];
    // }

    // function restoreSnapshot(snap: Snapshot) {
    //     currentValues.value = { ...snap.currentValues };
    // }

    // function deleteSnapshot(id: string) {
    //     const snapshots = loadAllSnapshots().filter((s) => s.id !== id);
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    // }

    const isDarkMode = ref(true);
    const aboutVisible = ref(false);

    return {
        config,
        // recommendations,
        isDarkMode,
        aboutVisible,
        getAchievementName,
        getAchievementFeatureName,
        getIdolAchievements,
        getTotalAchievements,
        getMaxMilestone,
    };
});