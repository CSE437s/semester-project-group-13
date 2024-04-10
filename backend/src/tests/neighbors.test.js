const neighborController = require('../controllers/goodNeighbor.controller');
const neighborService = require('../services/goodNeighbor.service');

jest.mock('../services/goodNeighbor.service'); // Mocking the service module

describe('Neighbor Controller', () => {
  describe('getAll', () => {
    test('should return all neighbors', async () => {
        const mockNeighbors = [
            {
              "NeighborID": 1,
              "RefugeeFamilyID": 1,
              "OldRefugeeFamilyID": "ABC123",
              "FamilyID": 2,
              "OldFamilyID": "DEF456",
              "Birthday": "1990-05-15",
              "Email": "neighbor1@example.com",
              "FirstName": "John",
              "LastName": "Doe",
              "Gender": "Male",
              "PhoneNumber": "123-456-7890",
              "Relation": "Friend",
              "is_head_of_house": 0,
              "is_deleted": false
            },
            {
              "NeighborID": 2,
              "RefugeeFamilyID": 2,
              "OldRefugeeFamilyID": "XYZ789",
              "FamilyID": 3,
              "OldFamilyID": "GHI123",
              "Birthday": "1985-08-20",
              "Email": "neighbor2@example.com",
              "FirstName": "Jane",
              "LastName": "Smith",
              "Gender": "Female",
              "PhoneNumber": "987-654-3210",
              "Relation": "Neighbor",
              "is_head_of_house": 1,
              "is_deleted": false
            }
          ];
          
      neighborService.getAll.mockResolvedValue(mockNeighbors);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await neighborController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockNeighbors);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      neighborService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await neighborController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    test('should return one neighbor', async () => {
      const neighborId = 1;
      const mockNeighbors = [
        {
          "NeighborID": 1,
          "RefugeeFamilyID": 1,
          "OldRefugeeFamilyID": "ABC123",
          "FamilyID": 2,
          "OldFamilyID": "DEF456",
          "Birthday": "1990-05-15",
          "Email": "neighbor1@example.com",
          "FirstName": "John",
          "LastName": "Doe",
          "Gender": "Male",
          "PhoneNumber": "123-456-7890",
          "Relation": "Friend",
          "is_head_of_house": 0,
          "is_deleted": false
        },
        {
          "NeighborID": 2,
          "RefugeeFamilyID": 2,
          "OldRefugeeFamilyID": "XYZ789",
          "FamilyID": 3,
          "OldFamilyID": "GHI123",
          "Birthday": "1985-08-20",
          "Email": "neighbor2@example.com",
          "FirstName": "Jane",
          "LastName": "Smith",
          "Gender": "Female",
          "PhoneNumber": "987-654-3210",
          "Relation": "Neighbor",
          "is_head_of_house": 1,
          "is_deleted": false
        }
      ];
      
      neighborService.getOne.mockResolvedValue(mockNeighbor);

      const req = { params: { neighbor_id: neighborId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await neighborController.getOne(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockNeighbor);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const neighborId = 1;
      const mockError = new Error('Mock error');
      neighborService.getOne.mockRejectedValue(mockError);

      const req = { params: { neighbor_id: neighborId } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await neighborController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

});
