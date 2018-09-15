const app = require('../src/app.js')
const request = require('supertest')

//==================== user API test ====================

describe('GET /user', function () {
  it('respond with json containing a list of all users', function (done) {
      request(app)
          .get('/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
