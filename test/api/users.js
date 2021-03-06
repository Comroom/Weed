/* eslint no-undef:0, no-unused-vars:0, handle-callback-err:0*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../build/app.js').default;

chai.use(chaiHttp);

describe('API /api/users Endpoint Test', () => {
  describe('GET request on /api/users', () => {
    it('should return 200', done => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
