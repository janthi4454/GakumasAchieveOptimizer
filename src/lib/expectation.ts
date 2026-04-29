import type { TMilestone } from "@/schema";

export function calcExpectation(value: number, milestones: TMilestone[], numProduce: number) {
    // 一回の Produce における将来平均獲得期待値を算出

    const gainPerProduce = value / numProduce;

    return milestones.reduce(
        (before, milestone) => {
            if (value >= milestone.threshold) {
                return before;
            }

            const gainNeeded = (milestone.threshold - value);
            const numProduceNeeded = Math.ceil(gainNeeded / gainPerProduce);
            const avgExpPerProduce = milestone.exp / numProduceNeeded;

            return before + avgExpPerProduce
        }, 0
    )
}
