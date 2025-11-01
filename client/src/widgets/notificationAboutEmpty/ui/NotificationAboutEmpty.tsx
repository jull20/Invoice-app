import { getThemeContext } from '../../../shared/contexts';
import './notificationAboutEmpty.scss'

export function NotificationAboutEmpty() {
    const theme = getThemeContext();
    return (
        <div className="notificationAboutEmpty">
            <div className="notificationAboutEmpty__img">
                <img src="illustration-empty.svg" alt="" />
            </div>
            <div className="notificationAboutEmpty__message">
                <h2 className={`notificationAboutEmpty__title notificationAboutEmpty__title_theme_${theme}`}>
                    There is nothing here
                </h2>
                <p className={`notificationAboutEmpty__description notificationAboutEmpty__description_theme_${theme}`}>
                    Create an invoice by clicking the <br/><b>New Invoice</b> button and get started
                </p>
            </div>
        </div>
    );
}
