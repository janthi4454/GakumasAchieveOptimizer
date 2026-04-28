// import { ref } from 'vue'
// import { defineStore } from 'pinia'

// export const usePanelStore = defineStore('panel', () => {
//     const collapseAchieveSignal = ref(0);
//     const expandTargets = ref<Set<string>>(new Set());

//     function collapseAchieveAll() {
//         collapseAchieveSignal.value++;
//     }

//     function init() {

//     }

//     function expand(id: string) {
//         expandTargets.value.add(id);
//     }

//     function consumeExpand(id: string) {
//         const should = expandTargets.value.has(id);
//         expandTargets.value.delete(id);
//         return should;
//     }

//     return { init, collapseAchieveSignal, collapseAchieveAll, expandTargets, expand, consumeExpand }
// })
