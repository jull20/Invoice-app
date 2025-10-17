import { getThemeContext} from "../../api";
import type { MyModalType } from "./ModalType";
import "./modal.scss"

export function Modal({children, isVisible, onClose}: MyModalType) {
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
