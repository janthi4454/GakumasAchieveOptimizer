<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { InputNumber, Panel } from 'primevue';
import { computed } from 'vue';

const settingsStore = useSettingsStore()

const secondaryMax = computed(() => 100 - settingsStore.data.lessonWeight.primary)

function resetSecondaryValue() {
    if (settingsStore.data.lessonWeight.secondary > secondaryMax.value) {
        settingsStore.data.lessonWeight.secondary = secondaryMax.value
    };
}
</script>

<template>
    <div class="flex flex-col p-2 gap-4">
        <Panel header="レッスン配分" toggleable>
            <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                    <label for="primary">
                        第一ステ
                    </label>
                    <InputNumber input-id="primary" showButtons mode="decimal" :min="0" :max="100"
                        v-model="settingsStore.data.lessonWeight.primary" @blur="resetSecondaryValue"
                        @keydown.enter="resetSecondaryValue" />
                </div>

                <div class=" flex flex-col">
                    <label for="secondary">
                        第二ステ
                    </label>
                    <InputNumber input-id="secondary" showButtons mode="decimal" :min="0" :max="secondaryMax"
                        v-model="settingsStore.data.lessonWeight.secondary" @blur="resetSecondaryValue" />
                </div>

                <div class="flex flex-col">
                    <label for="tertiary">
                        第三ステ
                    </label>
                    <InputNumber input-id="tertiary" showButtons mode="decimal" :min="0"
                        v-model="settingsStore.data.lessonWeight.tertiary" disabled />
                </div>
            </div>
        </Panel>
        <!-- <Panel header="表示" toggleable>
            <Button label="アチーブメント表示名変更" @click="onClickChange" />
        </Panel> -->
    </div>
</template>