    import { Request, Response, NextFunction } from 'express';
    import { Controller } from './controller'; 
    import { Repository } from '../repository/users.repository'; 
import { UsersMongoRepository } from '../repository/users.mongo.repository';
import { User } from '../entities/user';


    describe('Controller', () => {
    describe('getAll', () => {
        it('should return data when getAll is successful', async () => {
    
        const mockRepo: Repository<any> = {
            getAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Item 1' }]),
        } as unknown as Repository<any>

        const controller = new UsersMongoRepository;
        const mockRequest = {} as Request;
        const mockResponse = {
            json: jest.fn(), 
        }as unknown as Response;
        const mockNext = jest.fn() as NextFunction;
      

        await controller.getAll(mockRequest, mockResponse, mockNext);

        expect(mockRepo.getAll).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith([{ id: 1, name: 'Item 1' }]);
        });

        it('should call next when getAll fails', async () => {

        const mockRepo: Controller<any> = {
            getAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Item 1' }]),
            getById: jest.fn().mockResolvedValue({ id: 1, name: 'Item 1' }),
            create: jest.fn().mockResolvedValue({ id: 2, name: 'Item 2' }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Item' }),
            delete: jest.fn().mockResolvedValue(undefined),
        
        };
        

        const controller = new Controller<User>(mockRepo);
        const mockRequest = {} as Request;
        const mockResponse = {} as Response;
        const mockNext = jest.fn() as NextFunction;

        await controller.getAll(mockRequest, mockResponse, mockNext);

        expect(mockRepo.getAll).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Some error'));
        });
    });

    
    });
