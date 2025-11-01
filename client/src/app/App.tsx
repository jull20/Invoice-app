import './style/App.css'
import { AppRouter } from './routers'
import { Header } from '../widgets/header';
import { useInvoice, useModals, useTheme } from '../shared/hooks';
import { InvoiceContext, ModalsContext, ThemeContext } from '../shared/contexts';


function App() {
  const themContextValue    = useTheme();
  const modalContextValue   = useModals();
  const invoiceContextValue = useInvoice();
  return (
    <ThemeContext value={themContextValue}>
      <ModalsContext value={modalContextValue}>
        <InvoiceContext value={invoiceContextValue}>
          <div className={`root root_theme_${themContextValue.theme}`}>
            <Header/>
            <main className='main'>
              <AppRouter />
            </main>
          </div>
        </InvoiceContext>
      </ModalsContext>
    </ThemeContext>
  )
}

export default App;


