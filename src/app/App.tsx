import './style/App.css'
import { AppRouter } from './routers'
import { useTheme } from './useTheme';
import { ThemeContext } from '../shared/api';
import { Header } from '../widgets/header';


function App() {
  const [theme, changeTheme, changeThemeBtnImg] = useTheme();

  return (
    <ThemeContext value={{theme, changeTheme, changeThemeBtnImg}}>
      <div className={`root root_theme_${theme}`}>
        <Header/>
        <main className='main'>
          <AppRouter />
        </main>
      </div>
    </ThemeContext>
  )
}

export default App;


