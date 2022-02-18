import express  from 'express';
import cors from 'cors';
import conn from './mysql';
import drink from './routes/drink';
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
var port=3001;


app.use('/drinks', drink)



app.listen(port, (()=>console.log(`${"server running at"} ${port}`)));