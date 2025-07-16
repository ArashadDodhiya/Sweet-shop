const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  app = require('../app');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

describe('Sweet Controller', () => {
  describe('POST /api/sweets', () => {
    it('should create a new sweet', async () => {
      const sweetData = {
        name: 'Kaju Katli',
        category: 'Nut-Based',
        price: 50,
        quantity: 20
      };

      const response = await request(app)
        .post('/api/sweets')
        .send(sweetData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.name).toBe(sweetData.name);
      expect(response.body.data.category).toBe(sweetData.category);
      expect(response.body.data.price).toBe(sweetData.price);
      expect(response.body.data.quantity).toBe(sweetData.quantity);

      const savedSweet = await Sweet.findOne({ _id: response.body.data._id });
      expect(savedSweet).toBeTruthy();
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Please add a name');
      expect(response.body.error).toContain('Please add a category');
      expect(response.body.error).toContain('Please add a price');
      expect(response.body.error).toContain('Please add a quantity');
    });
  });
});

describe('GET /api/sweets', () => {
  it('should return all sweets', async () => {
    await Sweet.create([
      { name: 'Rasgulla', category: 'Milk-Based', price: 40, quantity: 10 },
      { name: 'Jalebi', category: 'Vegetable-Based', price: 30, quantity: 5 }
    ]);

    const response = await request(app).get('/api/sweets').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.count).toBe(2);
    expect(response.body.data.length).toBe(2);
  });
});

describe('GET /api/sweets/:id', () => {
  it('should return a single sweet by ID', async () => {
    const sweet = await Sweet.create({
      name: 'Barfi',
      category: 'Nut-Based',
      price: 70,
      quantity: 15
    });

    const response = await request(app)
      .get(`/api/sweets/${sweet._id}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Barfi');
  });

  it('should return 404 if sweet not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/sweets/${fakeId}`).expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Sweet not found');
  });
});

describe('PUT /api/sweets/:id', () => {
  it('should update an existing sweet', async () => {
    const sweet = await Sweet.create({
      name: 'Ladoo',
      category: 'Nut-Based',
      price: 60,
      quantity: 10
    });

    const updated = {
      name: 'Motichoor Ladoo',
      price: 75
    };

    const response = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .send(updated)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Motichoor Ladoo');
    expect(response.body.data.price).toBe(75);
  });
});

describe('DELETE /api/sweets/:id', () => {
  it('should delete a sweet', async () => {
    const sweet = await Sweet.create({
      name: 'Soan Papdi',
      category: 'Nut-Based',
      price: 45,
      quantity: 12
    });

    await request(app).delete(`/api/sweets/${sweet._id}`).expect(200);

    const check = await Sweet.findById(sweet._id);
    expect(check).toBeNull();
  });
});

describe('PATCH /api/sweets/:id/purchase', () => {
  it('should purchase sweet and reduce quantity', async () => {
    const sweet = await Sweet.create({
      name: 'Peda',
      category: 'Milk-Based',
      price: 35,
      quantity: 20
    });

    const response = await request(app)
      .patch(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: 5 })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.quantity).toBe(15);
  });

  it('should return 400 if purchase quantity exceeds stock', async () => {
    const sweet = await Sweet.create({
      name: 'Halwa',
      category: 'Milk-Based',
      price: 25,
      quantity: 2
    });

    const response = await request(app)
      .patch(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: 5 })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Not enough stock');
  });
});

describe('PATCH /api/sweets/:id/restock', () => {
  it('should restock a sweet', async () => {
    const sweet = await Sweet.create({
      name: 'Barfi',
      category: 'Milk-Based',
      price: 45,
      quantity: 10
    });

    const response = await request(app)
      .patch(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: 5 })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.quantity).toBe(15);
  });
});

describe('GET /api/sweets/search', () => {
  it('should return sweets matching query', async () => {
    await Sweet.create([
      { name: 'Dry Fruit Laddu', category: 'Nut-Based', price: 100, quantity: 10 },
      { name: 'Chocolate Bar', category: 'Chocolate', price: 80, quantity: 5 },
      { name: 'Candy Pop', category: 'Candy', price: 10, quantity: 100 }
    ]);

    const response = await request(app)
      .get('/api/sweets/search?name=choco&minPrice=50&maxPrice=100')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe('Chocolate Bar');
  });
});
