import type { Ref } from "vue"
import type z from "zod"

export function loadFromStorage<T>(storageKey: string, dataRef: Ref<T>): boolean {
    try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
            dataRef.value = JSON.parse(raw)
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error('load failed:', e)
        return false;
    }
}

export async function saveToStorage<T>(storageKey: string, data: T) {
    console.log("save started")

    try {
        localStorage.setItem(storageKey, JSON.stringify(data))

    } catch (e) {
        console.error('save failed:', e)
    }

    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    // await sleep(10000);

    console.log("save completed")
}

export function zLoadFromStorage<T>(storageKey: string, schema: z.ZodType<T>, fallback: T): T {
    try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
            console.log(raw)
            return schema.parse(JSON.parse(raw))
        }
    } catch (e) {
        console.error('load failed:', e)
    }

    return schema.parse(fallback)
}
