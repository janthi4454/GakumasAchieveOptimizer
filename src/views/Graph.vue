<script setup lang="ts">
import DetailAchievementGraph from "@/components/DetailAchievementGraph.vue";
import { makeDataset } from "@/lib/chartjs_helpder";
import { useAppStore } from "@/stores/app";
import { useExpStore } from "@/stores/expectation";
import { useIdolStore } from "@/stores/idol";
import {
  Chart as ChartJS,
  registerables,
  type ChartOptions,
} from 'chart.js';
import { computed, onMounted, ref, type ComputedRef } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(...registerables)

const store = useAppStore();
const idolStore = useIdolStore();
const expStore = useExpStore();

const idolCumsums = computed(
  () => {
    return expStore.idolCumsums
  }
);

const textColor = computed(
  () => {
    store.isDarkMode; // ただ依存追跡用必須

    const cs = getComputedStyle(document.documentElement);
    console.log(cs.getPropertyValue('--chart-title-color').trim());
    return cs.getPropertyValue('--chart-title-color').trim();
  }
)

const chartOptions: ComputedRef<ChartOptions<"bar">> = computed<ChartOptions<"bar">>(
  () => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y?.toFixed(1)} 経験値`
        }
      },
      title: {
        display: true,
        text: "期待取得経験値量 (/ プロデュース)",
        font: {
          size: 18,
          weight: 'bold'
        },
        color: textColor.value,
      },
    },
    maintainAspectRatio: false,
    interaction: {
      mode: "x",
      intersect: false
    },
    indexAxis: "x"
  })
)

const cumsumChartData = computed(
  () => makeDataset(
    idolCumsums.value.sort(
      (a, b) => b.cumsum - a.cumsum
    ),
    (e) => idolStore.getIdolName(e.idol),
    (e) => e.cumsum,
    [
      {
        key: "backgroundColor",
        fn: (e) => idolStore.getIdolColor(e.idol)
      }
    ]
  )
)

function handleSave() {
  // store.saveSnapshot();
}

const ready = ref(false);
onMounted(async () => {
  // await nextTick();
  ready.value = true;
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- <div class="flex items-center justify-end">
      <Button label="Snapshot保存" severity="success" size="small" @click="handleSave" />
    </div> -->

    <div class="flex flex-col gap-2">
      <h2 class="font-bold">おすすめアイドル</h2>

      <div class="w-full max-w-full h-100 relative">
        <Bar v-if="ready" :data="cumsumChartData" :options="chartOptions" />
      </div>
    </div>

    <DetailAchievementGraph />
  </div>
</template>