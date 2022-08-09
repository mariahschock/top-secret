const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'usertest@me.com',
  password: 'qwerty',
};



describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
 
  it('POST - creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    const { firstName, lastName, email } = testUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('POST - signs in existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app).post('/api/v1/users/sessions').send({ email: 'usertest@me.com', password: 'qwerty' });
    expect(res.status).toBe(200);
  });

  afterAll(() => {
    pool.end();
  });
});
