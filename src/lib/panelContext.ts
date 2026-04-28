
import type { TIdol } from '@/types';
import { createEventHook, type EventHook } from '@vueuse/core';
import { inject, provide, type InjectionKey } from 'vue';

type PanelCtx = {
    onOpen: EventHook<TIdol>['on']
    onCloseAll: EventHook<void>['on']
    open: (id: TIdol) => void
    closeAll: () => void
}

const key: InjectionKey<PanelCtx> = Symbol('panel')

export function providePanel(): PanelCtx {
    const openHook = createEventHook<TIdol>()
    const closeHook = createEventHook<void>()

    const ctx: PanelCtx = {
        onOpen: openHook.on,
        onCloseAll: closeHook.on,
        open: openHook.trigger,
        closeAll: closeHook.trigger,
    }

    provide(key, ctx)
    return ctx
}

export function usePanel(): PanelCtx | null {
    const ctx = inject(key);

    if (!ctx) {
        console.error('providePanel() must be called in an ancestor.')
        return null
    }

    return ctx
}