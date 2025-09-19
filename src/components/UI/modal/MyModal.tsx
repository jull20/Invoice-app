import React, { useContext, type JSX } from "react";
import ThemeContext from "../../../context/themeContext";

type MyModalType = {
    children: JSX.Element,
    isVisible: boolean,
    onClose: () => void
}   

function MyModal({children, isVisible, onClose}: MyModalType) {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return ( 
        <div className="myModal" data-visible={isVisible} onClick={onClose}>
            <div 
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                className={`myModal__content myModal__content_theme_${themeContext.theme}`}
            >
                {children}
            </div>
        </div>
    );
}

export default MyModal;