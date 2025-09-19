import { useContext } from "react"
import ThemeContext from "../context/themeContext"
import MyButton from "./UI/button/MyButton";
import Logo from "./UI/logo/Logo";

export default function Header(){
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return(
        <header className={`header header_theme_${themeContext.theme}`}>
            <Logo/>
            <div className="header__btn-avatar-wrapper">
                <MyButton
                    className='changeTheme-btn'
                    onClick={() => themeContext.changeTheme(themeContext.theme)}
                >
                    {themeContext.changeThemeBtnImg(themeContext.theme)}
                </MyButton>
                <div className="header__avatar-wrapper">
                    <div className="header__avatar-img"><img src="image-avatar.jpg" alt="avatar" /></div>
                </div>
            </div>
        </header>
    )
}