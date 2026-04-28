import { CONFIG } from "@/config";
import type { IdolInfoSchema } from "@/schema";
import {
    type TIdol,
    type TStType,
    type TTier,
    Idols
} from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import z from "zod";
import { useSettingsStore } from "./settings";

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

        function getIdolIcon(idol: TIdol) {
            return `/${idol}.png`;
        }

        function getIdolMiniIcon(idol: TIdol) {
            return `/${idol}_mini.png`;
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
