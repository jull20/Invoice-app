import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "../../pages/home";
import { InvoicePage } from "../../pages/invoice";

export function AppRouter(){
    const routes = [
        {path: '/',    Component: HomePage},
        {path: '/:id', Component: InvoicePage},
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