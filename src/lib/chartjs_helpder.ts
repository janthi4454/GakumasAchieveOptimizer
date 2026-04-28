
export const hatsuboshiColor = "#f39800"; // 学マスのテーマ色: ref: https://imas-db.jp/misc/color.html

export function makeDataset<T>(records: T[], labelFn: (args0: T) => string, dataFn: (args0: T) => any, otherFns?: { key: string, fn: (args0: T) => string }[]) {
    return {
        labels: records.map(e => labelFn(e)),
        datasets: [
            {
                ...{
                    label: "",
                    data: records.map(e => dataFn(e)),
                },
                ...(otherFns ?? []).reduce(
                    (prev, acc) => {
                        const values = records.map(e => acc.fn(e))

                        return {
                            ...prev, ...{ [acc.key]: values }
                        }
                    },
                    {}
                )
            }
        ]
    }
}

