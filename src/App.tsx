import ThemeContext from './context/themeContext'
import './styles/css/App.css'
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import useTheme from './hooks/useTheme'
import {getCachedTheme} from './utils/utilityFunctions'


function App() {
  const [theme, changeTheme, changeThemeBtnImg] = useTheme(getCachedTheme() ?? 'light');

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


