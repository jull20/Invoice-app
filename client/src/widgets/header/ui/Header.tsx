import { useContext } from "react";
import { ThemeContext } from "../../../shared/api";
import { Button } from "../../../shared/ui";
import { Logo } from "./Logo";
import "./header.scss"

export function Header() {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return ( 
         <header className={`header header_theme_${themeContext.theme}`}>
            <Logo/>
            <div className="header__btn-avatar-wrapper">
                <Button
                    className='changeTheme-btn'
                    onClick={() => themeContext.changeTheme(themeContext.theme)}
                >
                    {themeContext.changeThemeBtnImg(themeContext.theme)}
                </Button>
                <div className="header__avatar-wrapper">
                    <div className="header__avatar-img"><img src="image-avatar.jpg" alt="avatar" /></div>
                </div>
            </div>
        </header>
     );
}

export default Header;