<script setup lang="ts">
defineProps<{
    percent: number,
    color: string,
}>();
</script>

<template>
    <div class="flex w-full h-1.5 bg-surface-400 rounded-full overflow-hidden">
        <div class="flex flex-col w-full h-1.5 rounded-full transition duration-500"
            :style="{ width: `${percent}%`, backgroundColor: `${color}` }">
        </div>
    </div>
</template>