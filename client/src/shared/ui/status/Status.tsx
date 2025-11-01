import { getThemeContext } from "../../contexts";
import type { StatusType } from "../../types/invoice/invoice.type";
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
