import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes';
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://golden-seahorse-94ed53.netlify.app/'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));


app.use(bodyParser.json());
app.use('/', mainRouter);


export default app;
