import { getThemeContext } from "../../api";
import type { StatusType } from "../../types/InvoiceType";
import { CircleSvg } from "../svgImg/svgImgCode";
import "./status.scss"

export function Status({statusType}: {statusType: StatusType}) {
    const theme = getThemeContext();
    return (
        <div className={`status status-${statusType} status_theme_${theme}`}>
            <CircleSvg/>
            {statusType}
        </div>
    );
}
