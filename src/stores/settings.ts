import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const primaryWeight = ref(60)
    const secondaryWeight = ref(40)
    const tertiaryWeight = computed(() => {
        console.log(`this is primary weight ${primaryWeight.value}`)
        return 100 - primaryWeight.value - secondaryWeight.value
    })

    const isAchievementName = ref(true);

    // const data: TSettings = reactive({
    //     lessonWeight: {
    //         primary: primaryWeight,
    //         secondary: secondaryWeight,
    //         tertiary: tertiaryWeight
    //     }
    // })

    const data = reactive(
        {
            lessonWeight: {
                primary: primaryWeight,
                secondary: secondaryWeight,
                tertiary: tertiaryWeight
            }
        }
    )


    return { data, isAchievementName }
})
