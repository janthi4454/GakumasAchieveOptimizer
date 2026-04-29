import { useExpStore } from "./stores/expectation";

export function debugFn(): void {
    console.error("clicked")
    console.error(useExpStore().currentIdolValues);
    console.error(useExpStore().currentTotalValues);
    // console.error(useExpStore().idolExpectations);
    // console.error(useExpStore().idolExpectations);
}
