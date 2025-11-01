import { useState } from "react";
import type { ModalControlType, ModalsContextType } from "../../types";

export function useModals(): ModalsContextType
{
    const [modalsVisible, setModalsVisible] = useState({
        sideModal: false,
        centralModal: false
    });
    const sideModal: ModalControlType = {
        isVisible: modalsVisible.sideModal,
        open : () => setModalsVisible({...modalsVisible, sideModal: true}),
        close: () => setModalsVisible({...modalsVisible, sideModal: false}),
    }
    const centralModal: ModalControlType = {
        isVisible: modalsVisible.sideModal,
        open : () => setModalsVisible({...modalsVisible, centralModal: true}),
        close: () => setModalsVisible({...modalsVisible, centralModal: false}),
    }
    return {sideModal, centralModal};
}