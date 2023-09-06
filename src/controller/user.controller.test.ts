import { Request, Response, NextFunction } from 'express';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
import { UserController } from './user.controller.js';

describe('Given the class UserController', () => {
  describe('When it is instantiated', () => {
    const mockRepo: UsersMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      search: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const userController = new UserController(mockRepo);

    test('Then, we use the getAll() method ', async () => {
      const mockData = [{ id: '1', name: 'Item 1' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    test('Then, we use the getById() method ', async () => {
      const mockData = [{ id: '1', name: 'Item 1' }];
      (mockRepo.getById as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = {
        params: { id: '01' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    test('Then, we use the create() method', async () => {
      const mockedUser = {
        "userName": "Paula",
        "passwd": "12345",
        "email": "pazumito@gmail",
        "firstName": "catalan",
        "nick": "Pazumito",
        "allies": [],
        "enemies": [],
        "isAlive": "true"
      };
      
      (mockRepo.create as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        body: mockedUser,
      } as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('Then, we use the update() method', async () => {
      const mockedUser = {
        userName: 'Item 1',
        password: '1234',
        firstName: 'Item 1',
      };
      (mockRepo.update as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: { id: '1' },
        body: mockedUser,
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockedUser);
    });
    test('Then, when we use the delete() method', async () => {
      const mockedUser = {
        userName: 'Item 1',
        password: '1234',
        firstName: 'Item 1',
        id: '1',
      };
      (mockRepo.delete as jest.Mock).mockReturnValueOnce(mockedUser);
      const mockRequest = {
        params: { id: '1' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
  describe('When there are errors calling methods', () => {
    const mockRepo: UsersMongoRepository = {
      getAll: jest.fn().mockRejectedValueOnce(new Error('GetAll Error')),
      getById: jest.fn().mockRejectedValueOnce(new Error('GetById Error')),
      create: jest.fn().mockRejectedValueOnce(new Error('Create Error')),
      update: jest.fn().mockRejectedValueOnce(new Error('Update Error')),
      delete: jest.fn().mockRejectedValueOnce(new Error('Delete Error')),
    } as unknown as UsersMongoRepository;
    const userController = new UserController(mockRepo);
    test('Then, when we call getAll(), we should have an error', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;
      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toBeCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
    test('Then, when we call getById(), we should have an error', async () => {
      const mockRequest = {
        params: { id: '01' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn()  as NextFunction,
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetById Error'));
    });
    test('Then, when we call create(), we should have an error', async () => {
      const mockRequest = {
        body: {
          userName: 'Item 1',
          password: '1234',
          firstName: 'Item 1',
          lastName: 'Nash',
          email: 'Item1@gmail.com',
          friends: [],
          enemies: [],
        },
      } as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;
      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Create Error'));

    
    
    });
    test('Then, when we call update(), we should have an error', async () => {
      const mockRequest = {
        params: { id: 'someUserId' },
        body: {
          userName: 'Item 1',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Update Error'));
    });
    test('Then, when we call delete(), we should have an error', async () => {
      const mockRequest = {
        params: { id: '1' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Delete Error'));
    });
  });
});