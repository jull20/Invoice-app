import { useParams } from "react-router";

export default function InvoiceDetail(){
    let params = useParams();
    console.log(params.id)
    return(
        <div>detail page </div>
    )
}