import { useNavigate } from "react-router";
import { ArrowLeftImgSvg, Button, Status } from "../../../shared/ui";
import "./invoice-page.scss"
import { getThemeContext } from "../../../shared/api";

type AddressType = {
    className: string,
    street: string,
    city: string,
    postCode: string,
    country: string,
}

function Address({className, street, city, postCode, country}: AddressType){
    const rootClass = `invoice-${className}`
    return(
        <div className={rootClass}>
            <div className="invoiceBillTo__street">{street}</div>
            <div className="invoiceBillTo__city">{city}</div>
            <div className="invoiceBillTo__postCard">{postCode}</div>
            <div className="invoiceBillTo__country">{country}</div>
        </div>
    )
}

function getDate(start: string, daysDifference:number){
    const startDate = new Date(start);
    // console.log(startDate.toDateString())
    const timeDifference = daysDifference * 1000 * 60 * 60 * 24;
    const timeEnd = startDate.getTime() + timeDifference;
    const endDate = new Date(timeEnd)
    // console.log(endDate.toDateString())
    return endDate.toDateString()
}

export function InvoicePage() {
    const theme = getThemeContext();
    const navigate = useNavigate();
    const statusType = 'pending';
    const keke = getDate('21 Aug 2021', 30)
    // console.log(keke)
    return (
        <section className="invoiceDetail">
            <div className="invoiceDetail__backBtn">
                <Button type='button' style="none" onClick={() => navigate('/')}><>
                    <ArrowLeftImgSvg/>
                    Go Back
                </></Button>
            </div>
            <div className={`controlPanel controlPanel_theme_${theme}`}>
                <div className="controlPanel__status">
                    <p className="controlPanel__status-title">Status</p>
                    <Status statusType={statusType} />
                </div>
                <div className="controlPanel__controlBtns">
                    <Button type='button' style="chameleon">Edit        </Button>
                    <Button type='button' style='red'      >Delete      </Button>
                    <Button type='button' style="purple"   >Mark as Paid</Button>
                </div>
            </div>
            <div className={`invoiceDetail__info invoiceDetail__info_theme_${theme}`}>
                <div className="invoice-id">XM9141</div>
                <div className="invoice-projectDescription">Graphic Design</div>
                <Address 
                    className="billTo"
                    street='19 Union Terrace'
                    city='London'
                    postCode='E1 3EZ'
                    country='United Kingdom'
                />
                <div className="invoice-date">21 Aug 2021</div>
                <div className="invoice-paymentDue">{ getDate('21 Aug 2021', 30) }</div>
            </div>
        </section>
    );
}


// id: 'XM9141',
// status: 'pending',
// billFrom: {
//     street: '19 Union Terrace',
//     city: 'London',
//     postCode: 'E1 3EZ',
//     country: 'United Kingdom'
// },
// billTo: {
//     name: 'Alex Grim',
//     email: 'alexgrim@mail.com',
//     street: '84 Church Way',
//     city: 'Bradford',
//     postCode: 'BD1 9PB',
//     country: 'United Kingdom'
// },
// invoiceDate: '21 Aug 2021',
// paymentTerms: '30',
// projectDescription: 'Graphic Design',
// items: [
//     {
//         id: 0,
//         name: 'Banner Design', 
//         quantity: 1,
//         price: 156,
//         total: 156
//     }
// ]