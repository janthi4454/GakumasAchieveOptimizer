<script setup lang="ts">
import Graph from "@/views/Graph.vue";
import InputPanel from "@/views/Input.vue";
import Settings from "@/views/Settings.vue";
import SnapshotDialog from "@/views/Snapshots.vue";
import { Message, Toast } from "primevue";
import Button from "primevue/button";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Toolbar from "primevue/toolbar";
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from "vue";
import { DEBUG, IS_BETA } from "./consts";
import { debugFn } from "./debugger";
import { useAppStore } from "./stores/app";
import About from "./views/About.vue";

const toast = useToast();
const store = useAppStore();

const modes = ["snapshot", "settings", null] as const;
const modeRef = ref<typeof modes[number]>(null);

const showInputPanel = ref(true);

function toggleDark() {
  store.isDarkMode = !store.isDarkMode;

  document.documentElement.classList.toggle("p-dark", store.isDarkMode);
}

function onClickInputBuntton() {
  if (modeRef.value === null) {
    showInputPanel.value = !showInputPanel.value;
  } else {
    showInputPanel.value = true;
  };

  modeRef.value = null;
}

function onClickTitle() {
  modeRef.value = null;

  if (IS_BETA) {
    toast.add({ severity: 'info', detail: 'HIF編までに正式版公開予定！', life: 5000 })
  }
}

const isMobile = ref(false)

onMounted(
  () => {
    store.isDarkMode = true;
    document.documentElement.classList.toggle("p-dark", store.isDarkMode);
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
  }
)
</script>

<template>
  <div class="flex flex-col h-full">
    <Toast :position="'bottom-right'" />

    <Toolbar class="shrink-0">
      <template #start>

        <Button v-if="IS_BETA" label="学マスアチーブメント・オプティマイザ (β)" text severity="contrast" outlined size="large"
          @click="onClickTitle" />
        <Button v-if="!IS_BETA" label="学マスアチーブメント・オプティマイザ" text severity="contrast" outlined size="large"
          @click="onClickTitle" />
      </template>
      <template #end>
        <Button v-if="DEBUG" label="DEBUG" severity="danger" @click="debugFn" />
        <Button label="About" severity="secondary" text @click="store.aboutVisible = true" />
        <Button label="Snapshots" severity="secondary" text @click="modeRef = 'snapshot'" />
        <Button label="Settings" severity="secondary" text @click="modeRef = 'settings'" />
        <Button label="Input" severity="secondary" text @click="onClickInputBuntton" />
        <!-- <Button label="定義ファイル" severity="secondary" text @click="showDefFiles = true" /> -->
        <Button :icon="store.isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" severity="secondary" text @click="toggleDark" />
      </template>
    </Toolbar>

    <Message severity="error" v-if="isMobile">
      <template #icon>
        <div class="pi pi-exclamation-triangle" />
      </template>
      現在スマホ環境非対応です
    </Message>

    <Splitter v-show="modeRef === null" class="flex-1 min-h-0" style="border: none">
      <SplitterPanel class="min-w-120" :size="65" :min-size="35">
        <div class="h-full overflow-y-auto p-4">
          <Graph />
        </div>
      </SplitterPanel>
      <SplitterPanel class="min-w-0" v-show="showInputPanel" :size="35" :min-size="30">
        <div class=" h-full">
          <InputPanel />
        </div>
      </SplitterPanel>
    </Splitter>

    <About />
    <SnapshotDialog v-show="modeRef === 'snapshot'" />
    <Settings v-show="modeRef === 'settings'" />
  </div>
</template>