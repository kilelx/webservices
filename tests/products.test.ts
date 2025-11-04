import request, { Response } from 'supertest';
import app from '../src/app';
import { createProduct, deleteProduct } from '../src/services/products.service';

require('dotenv').config();

describe('Products API', () => {
  const testProduct = {
    title: 'Test product',
    category: 'test',
    description: 'This is a test product',
    specs: 'Our product has amazing specs',
    price: 10.99,
  };

  const partialProduct = {
    title: 'Test product',
    category: 'test',
    description: 'This is a test product',
  };

  let productId: number | undefined;

  beforeEach(async () => {
    const { success, newProduct } = await createProduct(testProduct);
    if (success) {
      productId = newProduct?.id;
      console.log('Création du produit test:', productId);
    }
  });
  afterEach(async () => {
    if (productId) {
      await deleteProduct(productId);
      console.log('Suppression du produit test:', productId);
    }
  });

  describe('GET /products', () => {
    it('should fetch all products', async () => {
      return request(app)
        .get('/api/v1/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should fetch the 5 first products', async () => {
      return request(app)
        .get('/api/v1/products?page=1&limit=5')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          console.log(res.body.length);
          expect(res.body.length).toEqual(5);
        });
    });
    it('should fetch the test product', async () => {
      return request(app)
        .get('/api/v1/products?search=Test')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          expect(res.body[0].title).toEqual('Test product');
        });
    });
    it('should fetch the test product with pagination', async () => {
      return request(app)
        .get('/api/v1/products?page=1&limit=5&search=Test')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toEqual(1);
          expect(res.body[0].title).toEqual('Test product');
        });
    });
    it('should return no product because out of range', async () => {
      return request(app)
        .get('/api/v1/products?page=1000&limit=20')
        .expect(200)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toEqual(0);
        });
    });
    it('should return no product because search params', async () => {
      return request(app)
        .get('/api/v1/products?search=zaidhzeuifbezkljabzeifbz')
        .expect(200)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toEqual(0);
        });
    });
    it('should get the test product', async () => {
      return request(app)
        .get(`/api/v1/products/${productId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return a product not found', async () => {
      return request(app)
        .get('/api/v1/products/123abc')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('POST /products', () => {
    it('should create one product', async () => {
      return request(app)
        .post('/api/v1/products')
        .send(testProduct)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(201);
          deleteProduct(res.body.newProduct.id);
        });
    });
    it('should return a 400 Bad request error', async () => {
      return request(app)
        .post('/api/v1/products')
        .send(partialProduct)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('PUT /products/:id', () => {
    it('should replace one product', async () => {
      console.log({ testProduct });
      return request(app)
        .put(`/api/v1/products/${productId}`)
        .send({ ...testProduct, id: productId })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return a 404 Product not found error', async () => {
      return request(app)
        .put('/api/v1/products/0')
        .send(testProduct)
        .expect(404)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
    it('should return a 400 Bad request error', async () => {
      return request(app)
        .put(`/api/v1/products/${productId}`)
        .send({ ...partialProduct, id: productId })
        .expect(400)
        .then((res: Response) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('PATCH /products/:id', () => {
    it('should edit one product', async () => {
      return request(app)
        .patch(`/api/v1/products/${productId}`)
        .send({ ...testProduct, id: productId })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return a 404 Product not found error', async () => {
      return request(app)
        .patch('/api/v1/products/0')
        .send({ ...testProduct, id: 0 })
        .expect(404)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete one product', async () => {
      return request(app)
        .delete(`/api/v1/products/${productId}`)
        .expect(204)
        .then((res: Response) => {
          expect(res.statusCode).toBe(204);
        });
    });
    it('should return a 404 Product not found error', async () => {
      return request(app)
        .patch('/api/v1/products/0')
        .expect(404)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });
});
