import request from 'supertest';
import { app } from '../server';
import { Sale } from '../models/Sale';

jest.mock('../models/Sale');

describe('Sale Controller', () => {
  const mockSaleData = {
    id: 1,
    productId: 1,
    quantity: 2,
    totalPrice: 50,
    customerId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new sale', async () => {
    (Sale.create as jest.Mock).mockResolvedValue(mockSaleData);

    const response = await request(app)
      .post('/api/sales')
      .send(mockSaleData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockSaleData);
    expect(Sale.create).toHaveBeenCalledWith(mockSaleData);
  });

  it('should return a list of sales', async () => {
    (Sale.findAll as jest.Mock).mockResolvedValue([mockSaleData]);

    const response = await request(app).get('/api/sales');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockSaleData]);
    expect(Sale.findAll).toHaveBeenCalled();
  });

  it('should return a sale by id', async () => {
    (Sale.findByPk as jest.Mock).mockResolvedValue(mockSaleData);

    const response = await request(app).get(`/api/sales/${mockSaleData.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSaleData);
    expect(Sale.findByPk).toHaveBeenCalledWith(mockSaleData.id);
  });

  it('should update a sale', async () => {
    const updatedSaleData = { ...mockSaleData, quantity: 3 };
    (Sale.update as jest.Mock).mockResolvedValue([1]);

    const response = await request(app)
      .put(`/api/sales/${mockSaleData.id}`)
      .send(updatedSaleData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedSaleData);
    expect(Sale.update).toHaveBeenCalledWith(updatedSaleData, {
      where: { id: mockSaleData.id },
    });
  });

  it('should delete a sale', async () => {
    (Sale.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete(`/api/sales/${mockSaleData.id}`);

    expect(response.status).toBe(204);
    expect(Sale.destroy).toHaveBeenCalledWith({
      where: { id: mockSaleData.id },
    });
  });

  it('should return 404 if sale not found', async () => {
    (Sale.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/sales/999`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Sale not found' });
  });
});