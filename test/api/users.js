const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app.js');

chai.use(chaiHttp);

describe('API /api/users Endpoint Test', () => {
  describe('GET request on /api/users', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('should return "/api/users"', (done) => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('/api/users');
        done();
      });
    });
  });
});
