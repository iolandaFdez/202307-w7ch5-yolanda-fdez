import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';

const debug = createDebug('W6E:Middleware:Auth.Interceptor');

debug('Loaded auth');


export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    debug('Call Authorization interceptor');
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'Expired token');
      }

      const { id } = Auth.verifyJWTGettingPayload(token);
      req.body.validatedId = id;
      debug(id);
      next();
    } catch (error) {
      next(error);
    }
  }

  async notesAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userID = req.body.validatedId;
    const alliesID = req.params.id;
    const enemiesID = req.params.id;

    try {
      const userRepo = new UsersMongoRepository();
      const userAllies = await userRepo.getById(alliesID);
      const userEnemies = await userRepo.getById(enemiesID)
      if (userAllies.id !== userID) {
        const error = new HttpError(403, 'Forbidden', 'Not note owner');
        next(error);
        if (userEnemies.id !== userID) {
            const error = new HttpError(403, 'Forbidden', 'Not note owner');
        next(error);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
