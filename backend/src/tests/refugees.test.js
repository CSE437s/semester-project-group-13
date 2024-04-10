const refugeeController = require('../controllers/refugee.controller');
const refugeeService = require('../services/refugee.service');

jest.mock('../services/refugee.service'); // Mocking the service module

describe('Refugee Controller', () => {
  describe('getAll', () => {
    test('should return all refugees', async () => {
      const mockRefugees = [
        {
          "refugee_id": 1,
          "last_name": "Doe",
          "family_id": 1,
          "is_head_of_house": true,
          "birthday": "1990-05-15",
          "first_name": "John",
          "gender": "Male",
          "relation_to_head": "Self",
          "phone": "1234567890",
          "is_deleted": false
        },
        {
          "refugee_id": 2,
          "last_name": "Smith",
          "family_id": 1,
          "is_head_of_house": false,
          "birthday": "1988-10-20",
          "first_name": "Jane",
          "gender": "Female",
          "relation_to_head": "Spouse",
          "phone": "9876543210",
          "is_deleted": false
        },
        {
          "refugee_id": 3,
          "last_name": "Garcia",
          "family_id": 2,
          "is_head_of_house": true,
          "birthday": "1985-03-08",
          "first_name": "Carlos",
          "gender": "Male",
          "relation_to_head": "Self",
          "phone": "5555555555",
          "is_deleted": false
        }
      ]
      ;
      refugeeService.getAll.mockResolvedValue(mockRefugees);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await refugeeController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRefugees);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      refugeeService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await refugeeController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    test('should return one refugee', async () => {
      const refugeeId = 1;
      const mockRefugee = { /* Mocked refugee data */ };
      refugeeService.getOne.mockResolvedValue(mockRefugee);

      const req = { params: { refugee_id: refugeeId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await refugeeController.getOne(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRefugee);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const refugeeId = 1;
      const mockError = new Error('Mock error');
      refugeeService.getOne.mockRejectedValue(mockError);

      const req = { params: { refugee_id: refugeeId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await refugeeController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  // Similarly, write tests for other controller functions (create, update, deleteOne, getAllInFamily)
});
