import { useScroll } from '@vueuse/core'
import type { Ref } from 'vue'

export function useScroller(
    container: Ref<HTMLElement | null>,
) {
    const { y } = useScroll(container, { behavior: 'smooth' })

    function scrollTo(target: HTMLElement | null | undefined, heigthOffset: number) {
        if (!target) return
        console.log(target)
        console.log(target.offsetTop)
        console.log(heigthOffset)

        y.value = target.offsetTop - heigthOffset * 2
    }

    return { scrollTo }
}

