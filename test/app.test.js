const app = require('../app.js')
const request = require('supertest')


request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '186')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
