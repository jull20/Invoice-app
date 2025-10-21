import invoiceStorage from './invoice.js'

class InvoiceController{
    async create(req, res){
        try{
            console.log(req.body)
            invoiceStorage.add(req.body)
            res.status(201).send('Successfully')
        }catch(e){
            res.status(500).json(e)
        }
    }
    async getAll(req, res){
        try{
            res.json(invoiceStorage.getAll)
        }catch(e){
            res.status(500).json(e)
        }
    }
    async getOne(req, res){
        try{
            res.json(invoiceStorage.getOne)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new InvoiceController();