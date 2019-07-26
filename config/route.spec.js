const app = require('../api/server');
const request = require('supertest')(app);
const db = require('../database/dbConfig');
// jest.setTimeout(30000);

beforeEach(async () => {
  await db('users').truncate();
});
describe('Controller routes', () => {
  it('test registering new user route', () => {
    return request
      .post('/api/register')
      .send({
        username: 'steve',
        password: '1234'
      })
      .expect(201);
  });

  it('test should login registered user', () => {
    return request
      .post('/api/register')
      .send({
        username: 'steve',
        password: '1234'
      })
      .then(res => {
        return request
          .post('/api/login')
          .send({ username: 'steve', password: '1234' })
          .then(res => {
            expect(200);
          });
      });
  });

  it('[GET] /api/jokes get all jokes!', () => {
    return request
      .post('/api/register')
      .send({ username: 'steve', password: '1234' })
      .then(res => {
        return request
          .post('/api/login')
          .send({ username: 'steve', password: '1234' })
          .then(res => {
            const token = res.body.data;
            return request
              .get('/api/jokes')
              .set({ authorization: token, Accept: 'application/json' })
              .then(res => {
                expect(200);
              });
          });
      });
  });
});
