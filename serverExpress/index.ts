import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

// app.get('/invoices', (req, res) => {
//     res.send('Hello World!')
// })
// app.post('/', (req, res) => {
//     res.send({value: 'POST this info ' + req.body.id})
// })

