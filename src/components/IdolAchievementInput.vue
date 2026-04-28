<script setup lang="ts">
import { getGuageTooltip } from "@/lib/guage";
import { useAppStore } from "@/stores/app";
import { useExpStore } from "@/stores/expectation";
import { useIdolStore } from "@/stores/idol";
import {
    type TIdol,
    type TIdolAchievement
} from "@/types";
import { Tooltip } from "primevue";
import InputNumber from 'primevue/inputnumber';
import { computed } from "vue";
import IdolIcon from "./IdolIcon.vue";
import AchievementInput from "./template/AchievementInput.vue";
import Guage from "./template/Guage.vue";

const vTooltip = Tooltip;

const props = defineProps<
    {
        jumpId: string,
        idol: TIdol,
    }
>()

const store = useAppStore();
const idolStore = useIdolStore();
const expStore = useExpStore();

const idolName = computed(() => idolStore.getIdolFullName(props.idol));
const milestoneProgression = computed(() => expStore.milestoneNextPercent.idols[props.idol])

function getTooltip(achieve: TIdolAchievement): string {
    if (achieve === "numProduce") {
        return `プロデュース回数\n\n達成済みの場合, 通知表から "${idolStore.getIdolFullName(props.idol)}" のプロデュース回数を入力`
    }

    return store.getAchievementFeatureName(achieve)
}

</script>

<template>
    <AchievementInput :jumpId="props.jumpId" :header="idolName" :idolName="idolName"
        :achievements="[...store.getIdolAchievements(props.idol)]">

        <template #header>
            <div class="flex flex-row items-center gap-x-2 gap-y-3 my-2 h-full w-full">
                <IdolIcon :idol="props.idol" :size="32" />
                <div class="flex @container w-full">
                    <span class="text-lg font-semibold hidden @min-[120px]:inline">{{ idolName }}</span>
                </div>
            </div>
        </template>

        <template #numberInput="{ achieve }">
            <div class="overflow-hidden">
                <label v-tooltip.top="getTooltip(achieve)" class="text-ellipsis" :for="achieve">

                    {{ store.getAchievementName(achieve, props.idol) }}

                    <span v-if="achieve === 'numProduce'" class="text-red-500 align-super text-xs">*</span>
                </label>
            </div>
            <Guage v-tooltip.top="getGuageTooltip(milestoneProgression[achieve])"
                :percent="milestoneProgression[achieve].percent" :color="idolStore.getIdolColor(props.idol)" />

            <InputNumber v-model="expStore.currentIdolValues[props.idol][achieve]"
                :invalid="achieve === 'numProduce' && expStore.currentIdolValues[props.idol][achieve] == 0"
                :inputId="achieve" mode="decimal" showButtons :min="0"
                :max="computed(() => store.getMaxMilestone(achieve)).value" @blur="() => {
                    console.time('blur'); console.log('blur'); expStore.saveCurrentValues(); console.timeEnd('blur')
                }" fluid />
        </template>
    </AchievementInput>
</template>
