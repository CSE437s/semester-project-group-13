const familyController = require('../controllers/family.controller');
const familyService = require('../services/family.service');

jest.mock('../services/family.service'); // Mocking the service module

describe('Family Controller', () => {
  describe('getAll', () => {
    test('should return all families', async () => {
        const mockFamilies = [
            {
              family_id: 1,
              user_id: 1,
              old_id: '123ABC',
              IsRefugeeFamily: 1,
              IsOpenToHaveGoodNeighbor: 0,
              IsGoodNeighbor: 1,
              DesiresToBeGoodNeighbor: 1,
              Languages: 'English, Spanish',
              is_deleted: false,
              FamilyName: 'Smith Family',
              LatestDateAtOasis: '2024-04-10',
              DateCreated: '2024-01-01',
              ArrivalDate: '2023-12-25',
              CountryOfOrigin: 'Syria',
              EnteredBy: 'Admin',
              Scheduled: 'Yes',
              address: '123 Main St',
              zip_code: '12345',
              city: 'Springfield'
            },
            {
              family_id: 2,
              user_id: 2,
              old_id: '456DEF',
              IsRefugeeFamily: 0,
              IsOpenToHaveGoodNeighbor: 1,
              IsGoodNeighbor: 0,
              DesiresToBeGoodNeighbor: 0,
              Languages: 'French, Arabic',
              is_deleted: false,
              FamilyName: 'Johnson Family',
              LatestDateAtOasis: '2024-04-11',
              DateCreated: '2024-02-01',
              ArrivalDate: '2024-01-15',
              CountryOfOrigin: 'Iraq',
              EnteredBy: 'Admin',
              Scheduled: 'No',
              address: '456 Oak St',
              zip_code: '54321',
              city: 'Springfield'
            }
          ];
          
      familyService.getAll.mockResolvedValue(mockFamilies);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await familyController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockFamilies);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      familyService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await familyController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

});
