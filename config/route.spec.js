const app = require('../api/server');
const request = require('supertest')(app);

describe('Controller routes', () => {
  it('test registering new user route', () => {
    return request
      .post('/api/register')
      .send({
        username: 'steve',
        password: 123
      })
      .expect(201);
  });

  //   it('test should login registered user', () => {
  //     return request
  //       .post('/api/login')
  //       .send({
  //         username: 'steve',
  //         password: 123
  //       })
  //       .expect(200);
  //   });
});
