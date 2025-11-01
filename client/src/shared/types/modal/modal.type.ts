export type ModalControlType = {
    isVisible: boolean,
    open:      () => void,
    close:     () => void,
}

export type ModalsContextType = {
    sideModal: ModalControlType,
    centralModal: ModalControlType
}