import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
app.use('/api', router)

// app.get('/', (req, res) => {
//     res.send({value: 'GET METHOD WORK'})
// })
// app.post('/', (req, res) => {
//     res.send('POST METHOD WORK')
// })
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
