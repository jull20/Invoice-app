import { getThemeContext } from "../../../../../shared/contexts";
import type { NameType } from "./name.type";
import './name.scss'

export function Name ({id, projectDescription}: NameType) {
    const theme = getThemeContext()
    return (
        <div className="invoicePage__name-wrapper">
            <p className={`invoicePage__id invoicePage__id_theme_${theme}`}>
                <span>#</span>{id}
            </p>
            <p className={`invoicePage__projectDescription invoicePage__projectDescription_theme_${theme}`}>
                {projectDescription}
            </p>
        </div>
    );
}
