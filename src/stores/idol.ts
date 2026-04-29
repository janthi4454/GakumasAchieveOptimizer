import { CONFIG } from "@/config";
import type { IdolInfoSchema } from "@/schema";
import {
    type TIdol,
    type TStType,
    type TTier,
    Idols
} from "@/types";
import { makeRecordFromIterator } from "@/utils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import z from "zod";
import { useSettingsStore } from "./settings";

const allIcons = import.meta.glob('@/assets/*.png', { eager: true, import: 'default' })
const icons = makeRecordFromIterator(Idols, (idol) => allIcons[`/src/assets/${idol}.png`])
const miniIcons = makeRecordFromIterator(Idols, (idol) => allIcons[`/src/assets/${idol}_mini.png`])

export const useIdolStore = defineStore(
    "idol", () => {
        const idols = Idols;

        type TIdolsInfo = Record<TIdol, z.infer<typeof IdolInfoSchema>>;
        const _idolInfo = ref<TIdolsInfo>(CONFIG.idols);

        const idolInfo = computed(() => {
            if (!_idolInfo.value) throw new Error("Not initialized");
            return _idolInfo.value;
        });

        function getIdolName(idol: TIdol) {
            const info = idolInfo.value[idol];
            return `${info.name}`
        }

        function getIdolFullName(idol: TIdol) {
            const info = idolInfo.value[idol];
            return `${info.family_name} ${info.name}`
        }

        function getIdolIcon(idol: TIdol): string {
            return icons[idol] as string;
        }

        function getIdolMiniIcon(idol: TIdol): string {
            return miniIcons[idol] as string;
        }


        function getIdolColor(idol: TIdol) {
            return idolInfo.value[idol].color;
        }

        function getLessonWeight(idol: TIdol, lessonType: TStType): number {
            const settingStore = useSettingsStore();

            const info = idolInfo.value[idol];
            const tier: TTier = info.primary === lessonType ? "primary" : (
                info.secondary === lessonType ? "secondary" : "tertiary"
            );

            // TODO: アイドル毎
            return settingStore.data.lessonWeight[tier] / 100
        }

        return {
            idols,
            idolInfo,
            getIdolName,
            getIdolFullName,
            getIdolIcon,
            getIdolMiniIcon,
            getIdolColor,
            getLessonWeight
        }
    }
)
