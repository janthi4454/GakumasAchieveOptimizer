<script setup lang="ts">
import { useIdolStore } from '@/stores/idol';
import type { TIdol } from '@/types';
import { computed } from 'vue';


const props = defineProps<
    {
        idol: TIdol;
        size: number;
    }
>();

const idolStore = useIdolStore();
const idolColor = computed(() => idolStore.getIdolColor(props.idol));

const idolMiniIcon = computed(() => idolStore.getIdolMiniIcon(props.idol));;
const bgColor = `color-mix(in srgb, ${idolColor.value}, black 30%)`
</script>

<template>
    <div class="rounded-full m-1 shrink-0"
        :style="{ width: `${size}px`, height: `${size}px`, backgroundColor: `${bgColor}`, boxShadow: `0 0 0 2px ${idolColor}` }">
        <img :src="idolMiniIcon" class="w-full h-full object-contain" />
    </div>
</template>