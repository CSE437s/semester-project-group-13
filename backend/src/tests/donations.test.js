const donationController = require('../controllers/donation.controller');
const donationService = require('../services/donation.service');

jest.mock('../services/donation.service'); // Mocking the service module

describe('Donation Controller', () => {
  describe('getAll', () => {
    test('should return all donations', async () => {
      const mockDonations = [
        {
          "family_id": 1,
          "old_id": "123ABC",
          "item": "Clothing",
          "amount": 50,
          "completed": true,
          "date": "2024-04-10",
          "user_id": 1
        },
        {
          "family_id": 2,
          "old_id": "456DEF",
          "item": "Food",
          "amount": 100,
          "completed": false,
          "date": "2024-04-11",
          "user_id": 2
        }
      ];
      donationService.getAll.mockResolvedValue(mockDonations);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await donationController.getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockDonations);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next middleware on error', async () => {
      const mockError = new Error('Mock error');
      donationService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await donationController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

});
