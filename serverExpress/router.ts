import { Router } from "express";
import InvoiceController from './invoiceController.js'

const router = new Router;

router.get('/invoices', InvoiceController.getAll); 
router.post('/invoices', InvoiceController.create); 
router.get('/invoices/:id', InvoiceController.getOne);
// router.put('/invoice/:id');   
// router.delete('/invoice/:id') 

export default router;