const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
connectToMongo();
const app = express();
const port = 5000;
//
// app.get('/',(req, res)=>{
//     res.send('hello world ankit');
// });
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port,()=>{
    console.log('index js hello ankit 3000')
})
app.post('/api/auth', (request, response) => {
    console.log(request.body.bodydata);
   })


