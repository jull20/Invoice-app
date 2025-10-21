class Invoice{
    constructor(_id, _status, _projectDescription){
        this.id = _id;
        this.status = _status;
        this.projectDescription = _projectDescription; 
        // status; 
        // billFrom; {
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
    }
}

class InvoicesStorage{
    constructor(){
        this.storage = [];
    }
    add(_invoice){
        // const invoice = new Invoice(_invoice)
        // this.storage.push(invoice)
        this.storage.push(_invoice)
    }
    get getAll(){
        const invoices = [];
        this.storage.forEach(invoice => {
            let abbreviatedInvoice = {
                id: invoice.id,
                due: invoice.due,
                name: invoice.name,
                amount: invoice.amount,
                status: invoice.status
            };
            invoices.push(abbreviatedInvoice);
        })
        return invoices;
    }
    get getOne(){

    }
}

export default new InvoicesStorage();