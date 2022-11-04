import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes';
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://golden-seahorse-94ed53.netlify.app', 'https://productmanagement.vercel.app'];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// Otra forma de configurar los cors:
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
