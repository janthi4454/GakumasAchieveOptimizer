<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import MarkdownIt from 'markdown-it';
import { Dialog, Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue';
import { computed, ref } from 'vue';
//
import AcknowledgementsSrc from '@/content/acknowledgements.md?raw';
import AuthorSrc from '@/content/author.md?raw';
import DevelopmentSrc from '@/content/development.md?raw';
import FeaturesSrc from '@/content/features.md?raw';
import LicensesSrc from '@/content/licenses.md?raw';

const md = new MarkdownIt();
const store = useAppStore()

const tabs = ref([
    { id: "features", title: "Features", content: computed(() => md.render(FeaturesSrc)) },
    { id: "development", title: "Development", content: computed(() => md.render(DevelopmentSrc)) },
    { id: "acknowledgements", title: "Acknowledgements", content: computed(() => md.render(AcknowledgementsSrc)) },
    { id: "licenses", title: "Licenses", content: computed(() => md.render(LicensesSrc)) },
    { id: "author", title: "Author", content: computed(() => md.render(AuthorSrc)) },
])
</script>

<style>
.markdown-body {
    --fgColor-default: var(--p-text-color);
    --bgColor-default: var(--p-dialog);
}

.markdown-body ul,
.markdown-body ol,
.markdown-body li {
    all: revert;
}
</style>

<template>
    <Dialog header="About" class="w-dvh h-dvh" v-model:visible="store.aboutVisible" dismissableMask modal closable
        :draggable="false">
        <Tabs class="w-full" value="features">
            <TabList>
                <Tab v-for="tab in tabs" :value="tab.id">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :value="tab.id">
                    <div class="markdown-body max-w-200" v-html="tab.content" />
                </TabPanel>
            </TabPanels>
        </Tabs>
        <AboutFooter />
    </Dialog>
</template>