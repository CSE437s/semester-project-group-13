const donatorController = require('../controllers/donator.controller');
const donatorService = require('../services/donator.service');

jest.mock('../services/donator.service'); // Mocking the service module

describe('Donator Controller', () => {
  describe('getAll', () => {
    test('should return all donators', async () => {
      const mockDonators = [
        {
          donator_id: 1,
          is_head_of_house: true,
          family_id: 1,
          old_id: '123ABC',
          address: '123 Main St',
          phone_number: '123-456-7890',
          is_deleted: false,
          birthday: '1990-01-01',
          city: 'Cityville',
          first_name: 'John',
          last_name: 'Doe',
          gender: 'Male',
          relation_to_head: 'Self',
          zip_code: '12345',
          email: 'john.doe@example.com'
        },
        {
          donator_id: 2,
          is_head_of_house: false,
          family_id: 1,
          old_id: '456DEF',
          address: '456 Elm St',
          phone_number: '987-654-3210',
          is_deleted: false,
          birthday: '1995-05-05',
          city: 'Townsville',
          first_name: 'Jane',
          last_name: 'Doe',
          gender: 'Female',
          relation_to_head: 'Spouse',
          zip_code: '54321',
          email: 'jane.doe@example.com'
        }
      ];
      donatorService.getAll.mockResolvedValue(mockDonators);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await donatorController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockDonators);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      donatorService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await donatorController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

});
