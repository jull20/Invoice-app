import type { JSX } from "react"

export type MyModalType = {
    children: JSX.Element,
    isVisible: boolean,
    onClose: () => void
}  