import type { TMilestoneNextPercent } from "@/stores/expectation";

export function getGuageTooltip(milestone: TMilestoneNextPercent) {
    return milestone.percent.toFixed(1) + '%' + (milestone.percent < 100 ? ('\n' + milestone.next.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }) + ' まで') : '')
}