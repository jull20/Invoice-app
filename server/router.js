import { Router } from "express";

const router = new Router;
// получить список всех invoice в сокращенном виде 
router.get('/invoices', async (req, res) => {
    res.send({
        id: 'XM9141',
        status: 'pending',
        billFrom: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom'
        },
        billTo: {
            name: 'Alex Grim',
            email: 'alexgrim@mail.com',
            street: '84 Church Way',
            city: 'Bradford',
            postCode: 'BD1 9PB',
            country: 'United Kingdom'
        },
        invoiceDate: '21 Aug 2021',
        paymentTerms: '30',
        projectDescription: 'Graphic Design',
        items: [
            {
                id: 0,
                name: 'Banner Design', 
                quantity: 1,
                price: 156,
                total: 156
            }

        ]
    })
}); 


// router.get('/invoice/:id');  // получить всю информацию о invoice по id 
// router.post('/invoice/:id'); // отправить invoice после создания
// router.put('/invoice/:id');  // обновление информации после редактирования существующей invoice
// router.delete('/invoice/:id') // удалить invoice

export default router;