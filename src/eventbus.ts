import { createEventHook, type EventHook } from '@vueuse/core';
import { type InjectionKey } from 'vue';

type TJumpHook =
    | { action: "collapseAll" }
    | { action: "jump", jumpId: string }

// export const panelBus = useEventBus<TJumpHook>("jump");

export function setupJump() {
    const jumpHook = createEventHook<TJumpHook>()

    function emit(ev: TJumpHook) {
        jumpHook.trigger(ev)
    }

    return {
        onJump: jumpHook.on,  // register 側に公開
        emit,
    }
}

export type JumpCtx = {
    onJump: EventHook<string>['on']
    emit: (id: string) => void
}
export const JumpKey: InjectionKey<JumpCtx> = Symbol('jump')
