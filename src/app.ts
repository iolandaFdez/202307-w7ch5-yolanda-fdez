import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';

import { errorMiddleware } from './middleware/error.middleware.js';

import { userRouter } from './router/user.routes.js';


const debug = createDebug('W6E:App');
export const app = express();

debug('Hello World');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));



app.use('/users', userRouter);


app.use(errorMiddleware);