import './home-page.scss'
import { InvoicesControlPanel } from "../../../widgets/invoicesControlPanel";
import { InvoicesList } from "../../../widgets/invoicesList";
import { InvoiceForm } from "../../../widgets/form";
import { SideModal } from "../../../shared/ui";
import { getInvoiceContext, getModalContext } from "../../../shared/contexts";

export function HomePage(){
    const {storage, add} = getInvoiceContext();
    const {sideModal} = getModalContext();
    return(
        <section className="homePage">
            <InvoicesControlPanel invoicesQuan={storage.length} onOpen={sideModal.open}/>
            <InvoicesList 
                invoices={storage} 
            />
            {
                sideModal.isVisible &&
                <SideModal isVisible={sideModal.isVisible} onClose={sideModal.close}>
                    <InvoiceForm type="new" addInvoice={add} closeModal={sideModal.close}/>
                </SideModal>
            }
        </section>
    )
}