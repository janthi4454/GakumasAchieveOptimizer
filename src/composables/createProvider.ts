import { createEventHook, type EventHook } from "@vueuse/core"
import { inject, provide, type InjectionKey } from "vue"

export function createEventHookProdvider<T>() {
    type TCtx = {
        on: EventHook<string>['on']
        emit: (id: string, value: T) => void
    }

    const key: InjectionKey<TCtx> = Symbol('jump')

    function provider(): TCtx {
        const hook = createEventHook<string>()

        const ctx: TCtx = {
            on: hook.on,
            emit: hook.trigger,
        }

        provide(key, ctx)
        return ctx
    }

    function user(): TCtx {
        const ctx = inject(key)
        if (!ctx) throw new Error('provideJump() must be called in an ancestor.')
        return ctx
    }

    return { provide: provider, use: user }
}
