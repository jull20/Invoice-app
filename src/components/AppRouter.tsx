import { Navigate, Route, Routes } from "react-router";
import Invoices from "../pages/Invoices";
import InvoiceDetail from "../pages/InvoiceDetail";

export default function AppRouter(){
    const routes = [
        {path: '/',    Component: Invoices},
        {path: '/:id', Component: InvoiceDetail},
        // {path: '/*',   Component: () => <Navigate to='/' replace/>},
    ]
    return(
        <Routes>
            {
                routes.map(({path, Component}) => 
                    <Route path={path} element={<Component />} />
                )
            }
        </Routes>
    )
}