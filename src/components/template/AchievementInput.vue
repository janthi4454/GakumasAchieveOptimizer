<script setup lang="ts" generic="T extends TIdolAchievement | TTotalAchievement">
import { usePanel } from "@/lib/panelContext";
import {
    type TIdolAchievement,
    type TTotalAchievement
} from "@/types";
import Panel from "primevue/panel";
import { nextTick, ref } from "vue";

type propType = {
    jumpId: string,
    header: string,
    achievements: T[],
}

const props = defineProps<propType>()
const collapsed = ref(true);
const skipTransition = ref(false);


const ctx = usePanel();
ctx?.onCloseAll(
    () => {

        collapsed.value = true;
    }
)
ctx?.onOpen(
    (id) => {
        if (id !== props.jumpId) return;

        skipTransition.value = true;
        collapsed.value = false;

        nextTick(() => {
            skipTransition.value = false;
        });
    }
)
</script>

<template>
    <Panel ref="panel" :header="props.header" toggleable v-model:collapsed="collapsed"
        :pt="{ transition: { css: !skipTransition } }">

        <!-- :pt="{ transition: { onAfterEnter: afterEnter } }"> -->
        <template #header>
            <div v-if="!$slots.header">
                <h2 class="font-bold">
                    {{ props.header }}
                </h2>
            </div>

            <slot name="header" />
        </template #header>

        <slot name="beforeAchieve" />

        <div class="flex flex-col gap-2">
            <template v-for="achieve in props.achievements" :key="achieve">
                <slot name="numberInput" :achieve="achieve" />
            </template>
        </div>
    </Panel>
</template>