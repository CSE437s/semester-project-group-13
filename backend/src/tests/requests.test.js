const { Router } = require('express'); // Change 'request' to 'Router' or any other valid variable name
const requestController = require('../controllers/request.controller');
const requestService = require('../services/request.service');

jest.mock('../services/request.service');

describe('Request Controller', () => {
  describe('getAll', () => {
    test('should return all requests', async () => {
      const mockRequests = [
        {
          "family_id": 1,
          "old_id": "REQ123",
          "item": "Food",
          "amount": 50,
          "completed": false,
          "date": "2024-04-10",
          "user_id": 1
        },
        {
          "family_id": 2,
          "old_id": "REQ456",
          "item": "Clothing",
          "amount": 100,
          "completed": true,
          "date": "2024-04-11",
          "user_id": 2
        }
      ];
      requestService.getAll.mockResolvedValue(mockRequests);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await requestController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRequests);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      requestService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await requestController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    test('should return one request', async () => {
      const requestId = 1;
      const mockRequest = {
        "family_id": 1,
        "old_id": "REQ123",
        "item": "Food",
        "amount": 50,
        "completed": false,
        "date": "2024-04-10",
        "user_id": 1
      };
      requestService.getOne.mockResolvedValue(mockRequest);

      const req = { params: { request_id: requestId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await requestController.getOne(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRequest);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const requestId = 1;
      const mockError = new Error('Mock error');
      requestService.getOne.mockRejectedValue(mockError);

      const req = { params: { request_id: requestId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await requestController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
