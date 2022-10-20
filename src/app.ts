import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes';
import cors from 'cors';

const app = express();

const front1 = `${process.env.FRONT_DEPLOY}`
console.log('front1', front1)
const allowedOrigins = ['http://localhost:3000', 'https://golden-seahorse-94ed53.netlify.app/'];

// const cors = require('cors');
const corsOptions = {
    origin: 'https://golden-seahorse-94ed53.netlify.app/',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Origin', allowedOrigins); // Le digo que funcione con todos los links porque no sabemos cual es al principio
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


app.use(bodyParser.json());
app.use('/', mainRouter);


export default app;
