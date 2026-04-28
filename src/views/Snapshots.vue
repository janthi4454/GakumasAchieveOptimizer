<script setup lang="ts">
import { useExpStore } from '@/stores/expectation';
import { useFileDialog } from '@vueuse/core';
import { Button, Card, useToast } from 'primevue';
import { computed } from 'vue';

const toast = useToast();

const expStore = useExpStore();

const downloadUrl = computed(() =>
    URL.createObjectURL(
        new Blob([expStore.asJson], { type: 'application/json' })
    )
)

const { open, onChange } = useFileDialog({
    accept: 'application/json,.json',
    multiple: false,
    reset: true,
})

onChange(
    async (files) => {
        const file = files?.[0]
        if (!file) return

        try {
            const text = await file.text()

            const parsedJs = JSON.parse(text)

            await expStore.updateCurrentIdolValues(parsedJs["idols"])
            await expStore.updateCurrentTotalValues(parsedJs["totals"])

            toast.add(
                {
                    severity: 'success',
                    detail: '読み込み完了しました',
                    life: 3000,
                }
            )
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            } else {
                console.error('unknown error', e)
            }
        }
    })
</script>

<template>
    <div class="flex flex-col p-4 gap-4 items-center w-full h-full">
        <div class="flex flex-col gap-2 justify-between w-40">
            <Button as=a :href="downloadUrl" label="Save"
                :download="`gakumas-achieve-${Math.floor(Date.now() / 1000)}.json`" />
            <Button :label="'Load'" @click="open()" />
        </div>

        <Card class="w-full h-full"
            :pt="{ body: { style: 'display: flex; height: 100%;' }, content: { style: 'display: flex; height: 100%;' } }">
            <template #content>
                <div class="flex w-full h-full items-center justify-center">
                    <span class="text-4xl">
                        その他コンテンツ準備中...
                    </span>
                </div>
            </template>
        </Card>
    </div>
</template>