<script setup lang="ts">
import { hatsuboshiColor } from "@/lib/chartjs_helpder";
import { getGuageTooltip } from "@/lib/guage";
import { useAppStore } from "@/stores/app";
import { useExpStore } from "@/stores/expectation";
import InputNumber from 'primevue/inputnumber';
import Tooltip from 'primevue/tooltip';
import { computed } from "vue";
import AchievementInput from "./template/AchievementInput.vue";
import Guage from "./template/Guage.vue";

const vTooltip = Tooltip;

const store = useAppStore();
const expStore = useExpStore();


const milestoneProgression = computed(() => expStore.milestoneNextPercent.totals)
</script>

<template>
    <AchievementInput jumpId="achieve-total" header="共通" :achievements="[...store.getTotalAchievements()]" :height="0">
        <template #beforeAchieve>
            <div class="h-2" />
        </template>

        <template #numberInput="{ achieve }">
            <div class="flex flex-col gap-2">
                <label v-tooltip.top="store.getAchievementFeatureName(achieve)" :for="achieve">
                    {{ store.getAchievementName(achieve) }}
                    <span v-if="achieve === 'totalProduce'" class="text-red-500 align-super text-xs">*</span>
                </label>

                <Guage v-tooltip.top="getGuageTooltip(milestoneProgression[achieve])"
                    :percent="milestoneProgression[achieve].percent" :color="hatsuboshiColor" />

                <InputNumber v-model="expStore.currentTotalValues[achieve]"
                    :invalid="achieve === 'totalProduce' && expStore.currentTotalValues[achieve] == 0"
                    :inputId="achieve" mode="decimal" showButtons :min="0"
                    :max="computed(() => store.getMaxMilestone(achieve)).value" @blur="expStore.saveCurrentValues()"
                    fluid />
            </div>
        </template #numberInput>
    </AchievementInput>
</template>