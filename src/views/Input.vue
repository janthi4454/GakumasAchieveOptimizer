<script setup lang="ts">
import IdolAchievementInput from "@/components/IdolAchievementInput.vue";
import IdolIcon from "@/components/IdolIcon.vue";
import TotalAchievementInput from "@/components/TotalAchievementInput.vue";
import { useScroller } from "@/composables/useScroll";
import { providePanel } from "@/lib/panelContext";
import { Idols, type TIdol } from "@/types";
import { useElementBounding } from "@vueuse/core";
import { Button } from "primevue";
import { nextTick, ref, useTemplateRef, type VNodeRef } from "vue";

const headerRef = useTemplateRef('headerRef')
const { height } = useElementBounding(headerRef)

// const height = computed(() => bottom.value - top.value)

const jumpContainer = useTemplateRef("jumpContainer");
const targetRefsMap = ref<Map<TIdol, HTMLElement>>(new Map())

const scroller = useScroller(jumpContainer);

const setRef =
  (id: TIdol): VNodeRef =>
    (el) => {
      if (el instanceof HTMLElement) targetRefsMap.value.set(id, el)
      else targetRefsMap.value.delete(id)
    }


const { open, onOpen, closeAll } = providePanel();

onOpen(
  async (id) => {
    await nextTick() // await to change CSS animation off
    await nextTick() // await to open Panel

    const htmlRef = targetRefsMap.value.get(id)

    scroller.scrollTo(htmlRef, height.value)
  }
)
</script>

<template>
  <div ref="jumpContainer" class="h-full flex flex-col px-4 gap-4 overflow-y-scroll">

    <div ref="headerRef" class="flex flex-row w-full items-center sticky py-2 shrink-0 top-0 z-10"
      style="background: var(--p-content-background)">
      <div class="w-full grid grid-cols-7 justify-items-center">
        <template v-for="idol of Idols">
          <button @click="open(idol)" class="cursor-pointer">
            <!-- <a @click="open(idol)"> -->
            <IdolIcon :idol="idol" :size="28" />
          </button>
          <!-- </a> -->
        </template>
      </div>
    </div>

    <div class="flex flex-row justify-end">
      <!-- <Button label="Familiar Name" severity="secondary"
          @click="settingsStore.isAchievementName = !settingsStore.isAchievementName" outlined /> -->
      <Button label="Collapse All" severity="secondary" @click="closeAll" outlined />
    </div>

    <!-- <IdolInfo idol="total" /> -->
    <TotalAchievementInput />
    <template v-for="idol in Idols">
      <div :ref="setRef(idol)" />

      <IdolAchievementInput :jumpId="idol" :idol="idol" />
    </template>
  </div>
</template>