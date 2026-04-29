<script setup lang="ts">
import { hatsuboshiColor, makeDataset } from "@/lib/chartjs_helpder";
import { useAppStore } from "@/stores/app";
import { useExpStore } from "@/stores/expectation";
import { useIdolStore } from "@/stores/idol";
import { Idols, type TAchieveGroup, type TAllAchievement, type TIdol } from "@/types";
import {
    type ChartOptions
} from 'chart.js';
import { deepmerge } from "deepmerge-ts";
import { MultiSelect, Panel, Tooltip } from "primevue";
import { computed, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import IdolIcon from "./IdolIcon.vue";

const vTooltip = Tooltip;

const store = useAppStore();
const idolStore = useIdolStore();
const expStore = useExpStore();

// const selectedIdol = ref<TIdol | null>(null);
const selectedIdols = ref<TIdol[]>([...Idols]);


function getAchievementFullName(achGroup: TAchieveGroup, achieve: TAllAchievement) {
    const prefix: string = (
        (): string => {
            if (achGroup !== "total")
                return `${idolStore.getIdolName(achGroup)} - `
            else if (
                achGroup === "total"
            )
                return `総計`
            else
                return ""
        }
    )()

    const suffix: string = (
        (achGroup !== null) && (achGroup === "total") ? " †" : ""
    )

    return `${prefix}${store.getAchievementFeatureName(achieve)}${suffix}`
}

const allExpectations = computed(
    () => {
        const selected = selectedIdols.value;

        return [
            ...expStore.idolExpectations.filter(
                e => e.achGroup === "total" || selected.includes(e.achGroup)
            ),
            ...expStore.totalOtherExpectations
        ]
    }
);

const allNumNeededs = computed(
    () => {
        const selected = selectedIdols.value;

        return expStore.milestoneNext.filter(
            e => e.achGroup === "total" || selected.includes(e.achGroup)
        )
    }
)
const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    maintainAspectRatio: false,
    interaction: {
        mode: "y",
        intersect: false,
    },
    scales: {
        y: {
            ticks: {
                crossAlign: "far"
            }
        }
    },
    indexAxis: "y",
}

const achieveChartData = computed(
    () => makeDataset(
        allExpectations.value.filter(e => e.cumsum > 0).sort((a, b) => b.cumsum - a.cumsum),
        e => getAchievementFullName(e.achGroup, e.achievement),
        e => e.cumsum,
        [
            {
                key: "backgroundColor",
                fn: (e) => {
                    if (e.achGroup === "total") {
                        return hatsuboshiColor;
                    } else {
                        return idolStore.getIdolColor(e.achGroup)
                    }
                }
            }
        ]
    )
)

const numProduceNeededChartData = computed(
    () => makeDataset(
        allNumNeededs.value.filter(e => e.numProduceNeeded > 0).sort((a, b) => a.numProduceNeeded - b.numProduceNeeded),
        e => getAchievementFullName(e.achGroup, e.achievement),
        e => e.numProduceNeeded,
        [
            {
                key: "backgroundColor",
                fn: (e) => {
                    if (e.achGroup === "total") {
                        return hatsuboshiColor;
                    } else {
                        return idolStore.getIdolColor(e.achGroup)
                    }
                }
            }
        ]
    )
)

const achieveHeight = computed(() => achieveChartData.value.labels.length * 35)
const numNeedHeight = computed(() => numProduceNeededChartData.value.labels.length * 35)

const panelPt = { contentwrapper: { style: 'min-width: 0;' } }

type TIdolOption = { idol: TIdol, label: string }

const idolInfo = Idols.reduce<TIdolOption[]>(
    (prev, idol) => {
        prev.push(
            {
                idol: idol,
                label: idolStore.getIdolFullName(idol)
            }
        )

        return prev
    },
    []
);



</script>

<template>
    <Panel header="詳細" :pt="panelPt">
        <div class="space-y-4">
            <div class="flex flex-col w-full gap-2 min-w-0 overflow-hidden">
                <h2 class="font-bold">注目アイドル</h2>
                <MultiSelect v-model="selectedIdols" :options="idolInfo" optionLabel="label" optionValue="idol"
                    display="chip" showClear placeholder="Select Idols" class="flex w-full">
                    <template #option="slotProps">
                        <div class="flex items-center gap-x-2 h-8">
                            <IdolIcon :idol="slotProps.option.idol" :size="20" />
                            {{ slotProps.option.label }}
                        </div>
                    </template>
                    <template #footer>
                        <div class="py-2 px-3">
                            <b>{{ selectedIdols ? selectedIdols.length : 0 }}</b> item{{ (selectedIdols ?
                                selectedIdols.length : 0) > 1 ? 's' : '' }} selected.
                        </div>
                    </template>
                </MultiSelect>
                <!-- <Select v-model="selectedIdol" :options="idolInfo" optionLabel="label" showClear
                    placeholder="Select an Idol" class="w-full md:w-56" /> -->
            </div>

            <Panel header="アチーブメント毎の取得経験値量期待値" toggleable :pt="panelPt">
                <div class="w-full max-w-full relative" :style="{ height: `${achieveHeight}px` }">
                    <Bar v-show="achieveChartData.datasets[0]?.data.length ?? 0 > 0" :data="achieveChartData"
                        :options="deepmerge(chartOptions, { plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.x?.toFixed(1)} 経験値` } } } } satisfies ChartOptions<'bar'>)" />
                </div>

                <div v-if="achieveChartData.datasets[0]?.data.length === 0" class="">
                    一回以上のプロデュースが必要です
                </div>
            </Panel>

            <Panel header="必要プロデュース回数予測" toggleable :pt="panelPt">
                <div v-tooltip.top="'プロデュース回数100回以上は省略'" class="w-full max-w-full relative min-h-6"
                    :style="{ height: `${numNeedHeight}px` }">
                    <Bar v-show="numProduceNeededChartData.datasets[0]?.data.length ?? 0 > 0"
                        :data="numProduceNeededChartData"
                        :options="deepmerge(chartOptions, { plugins: { tooltip: { callbacks: { label: (ctx) => (`${ctx.parsed.x} プロデュース`) } } }, scales: { x: { max: 100 } } } satisfies ChartOptions<'bar'>)" />

                    <div v-if="numProduceNeededChartData.datasets[0]?.data.length === 0" class="">
                        一回以上のプロデュースが必要です
                    </div>
                </div>
            </Panel>
        </div>
    </Panel>
</template>