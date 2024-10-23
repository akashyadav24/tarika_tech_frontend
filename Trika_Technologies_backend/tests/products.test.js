// tests/products.test.js
const request = require('supertest');
const app = require('../index'); // Import the app directly for testing

describe('GET /products', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('products');
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('should return a 500 if the external API fails', async () => {
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(new Error('Failed to fetch'));
    
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(500);
  });
});
