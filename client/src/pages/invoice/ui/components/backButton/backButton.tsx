import { useNavigate } from "react-router";
import { ArrowLeftImgSvg, Button } from "../../../../../shared/ui";
import { getThemeContext } from "../../../../../shared/contexts";
import './backButton.scss'

export function BackButton() {
    const theme = getThemeContext();
    const navigate = useNavigate();
    return (
        <div className="invoicePage__backButton-wrapper">
            <Button type='button' style="none" onClick={() => navigate('/')}>
                <div className="backButton-content">
                    <ArrowLeftImgSvg/>
                    <span className={`backButton-name backButton-name_theme_${theme}`}>
                        Go Back
                    </span>
                </div>
            </Button>
        </div>
    );
}
