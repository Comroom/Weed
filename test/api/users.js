const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app.js');

chai.use(chaiHttp);

describe('API /users Endpoint Test', () => {
  describe('GET request on /users', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('should return "/users"', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('/users');
        done();
      });
    });
  });
});
