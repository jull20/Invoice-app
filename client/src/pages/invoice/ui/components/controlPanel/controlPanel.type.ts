import type { StatusType } from "../../../../../shared/types"

export type ControlPanelType = {
    status: StatusType,
    edit: () => void,
    remove: () => void,
    markAsPaid: () => void,
}