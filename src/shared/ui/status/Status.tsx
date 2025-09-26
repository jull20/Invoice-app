import { getThemeContext } from "../../api";
import type { StatusType } from "../../types/InvoiceType";
import { CircleSvg } from "../svgImg/svgImgCode";
import "./status.scss"

export function Status({children}: {children: StatusType}) {
    const theme = getThemeContext();
    return (
        <div className={`status status-${children} status_theme_${theme}`}>
            <CircleSvg/>
            {children}
        </div>
    );
}
