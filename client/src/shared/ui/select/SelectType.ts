import type React from "react"

export type SelectType = {
    options: {
        name: string,
        value: string
    }[],
    defaultValue: string | null,
    selectValue: string,
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    name: string
}