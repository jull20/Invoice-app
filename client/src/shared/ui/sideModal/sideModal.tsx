import { getThemeContext } from "../../contexts";
import type { MyModalType } from "./sideModal.type";
import "./sideModal.scss"

export function SideModal({children, isVisible, onClose}: MyModalType) {
    const theme = getThemeContext()

    return ( 
        <div className="modal" data-visible={isVisible} onClick={onClose}>
            <div 
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                className={`modal__content modal__content_theme_${theme}`}
            >
                {children}
            </div>
        </div>
    );
}
