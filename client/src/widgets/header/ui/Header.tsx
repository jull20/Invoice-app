import { useContext } from "react";
import { Button } from "../../../shared/ui";
import { Logo } from "./Logo";
import "./header.scss"
import { ThemeContext } from "../../../shared/contexts/theme/theme.context";

export function Header() {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return ( 
         <header className={`header header_theme_${themeContext.theme}`}>
            <Logo/>
            <div className="header__btn-avatar-wrapper">
                <Button
                    style="none"
                    className='changeTheme-btn'
                    onClick={() => themeContext.changeTheme(themeContext.theme)}
                >
                    {themeContext.getThemeImg()}
                </Button>
                <div className="header__avatar-wrapper">
                    <div className="header__avatar-img"><img src="image-avatar.jpg" alt="avatar" /></div>
                </div>
            </div>
        </header>
     );
}

export default Header;