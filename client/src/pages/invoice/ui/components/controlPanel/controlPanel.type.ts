import type { StatusType } from "../../../../../shared/types"

export type ControlPanelType = {
    status: StatusType,
    handleEdit: () => void
}