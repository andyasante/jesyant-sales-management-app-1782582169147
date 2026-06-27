import request from 'supertest';
import { app } from '../server';
import { Product } from '../models/Product';

jest.mock('../models/Product');

describe('Product Controller', () => {
  const mockProductData = {
    id: 1,
    name: 'Aspirin',
    price: 5.0,
    quantity: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new product', async () => {
    (Product.create as jest.Mock).mockResolvedValue(mockProductData);

    const response = await request(app)
      .post('/api/products')
      .send(mockProductData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockProductData);
    expect(Product.create).toHaveBeenCalledWith(mockProductData);
  });

  it('should retrieve all products', async () => {
    (Product.findAll as jest.Mock).mockResolvedValue([mockProductData]);

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockProductData]);
    expect(Product.findAll).toHaveBeenCalled();
  });

  it('should retrieve a product by id', async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(mockProductData);

    const response = await request(app).get('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProductData);
    expect(Product.findByPk).toHaveBeenCalledWith(1);
  });

  it('should update a product', async () => {
    const updatedProductData = { ...mockProductData, price: 6.0 };
    (Product.update as jest.Mock).mockResolvedValue([1]);

    const response = await request(app)
      .put('/api/products/1')
      .send(updatedProductData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProductData);
    expect(Product.update).toHaveBeenCalledWith(updatedProductData, { where: { id: 1 } });
  });

  it('should delete a product', async () => {
    (Product.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete('/api/products/1');

    expect(response.status).toBe(204);
    expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should return 404 if product not found', async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/api/products/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
  });
});