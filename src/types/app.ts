import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';

import { errorMiddleware } from '../middleware/error.middleware.js';

import { userRouter } from '../router/user.routes.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W6E:App');
export const app = express();

debug('Hello World');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));


app.use((req: Request, res: Response, next: NextFunction) => {
  debug('strufors');
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hello jupiter');
  res.write('<h1>Hello chess wars</h1>');
  res.end();
});


app.use('/users', userRouter);

app.use('/:id', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(418, 'Invalid route');
  next(error);
});

app.use(errorMiddleware);