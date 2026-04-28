type RecordKey = string | number | symbol

export function includes<T extends string>(value: string, arr: readonly T[]): value is T {
    return (arr as readonly string[]).includes(value);
}

export function typedEntries<T extends Record<RecordKey, unknown>>(record: T): [keyof T, T[keyof T]][] {
    return Object.entries(record) as [keyof T, T[keyof T]][];
}

export function makeRecordFromIterator<K extends RecordKey, V>(ks: readonly K[], fn: (arg0: K) => V): Record<K, V> {
    return Object.fromEntries(
        ks.map(
            k => [k, fn(k)]
        ) satisfies [K, V][]
    ) as Record<K, V>
}

export function makeRecordFromRecord<T extends Record<RecordKey, unknown>, V>(ks: T, fn: (key: keyof T) => V): { [K in keyof T]: V } {
    return Object.fromEntries(
        (Object.keys(ks) as (keyof T & string)[]).map((k) => [k, fn(k)])
    ) as { [K in keyof T]: V };
}

export function excludeUnion<
    T extends string,
    U extends T
>(list: readonly T[], excludeList: readonly U[]): Exclude<T, U>[] {
    return list.filter(
        (item): item is Exclude<T, U> =>
            !(excludeList as readonly string[]).includes(item)
    );
}