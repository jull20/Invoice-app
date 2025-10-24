import type React from "react"

export type ButtonType = {
    children: string | React.JSX.Element, 
    style: 'light' | 'dark' | 'red' | 'purple' | 'chameleon' | 'img' | 'none',
    [key: string]: unknown
}