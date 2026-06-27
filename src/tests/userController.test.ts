import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';

jest.mock('../models/User');

describe('User Controller', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'hashedpassword',
    role: 'admin',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password',
        role: 'admin',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: expect.any(String),
      role: 'admin',
    });
  });

  it('should return 400 if username is missing', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        password: 'password',
        role: 'admin',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Username is required');
  });

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        role: 'admin',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Password is required');
  });

  it('should get a user by ID', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(User.findByPk).toHaveBeenCalledWith(1);
  });

  it('should return 404 if user not found', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should update a user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (User.prototype.update as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .put('/api/users/1')
      .send({
        username: 'updateduser',
        role: 'admin',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(User.prototype.update).toHaveBeenCalledWith(
      { username: 'updateduser', role: 'admin' },
      { where: { id: 1 } }
    );
  });

  it('should delete a user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (User.prototype.destroy as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(204);
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(User.prototype.destroy).toHaveBeenCalled();
  });

  it('should return 404 if trying to delete a non-existent user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});