let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../app.js');

chai.use(chaiHttp);

describe('Web Endpoint Test', () => {
  describe('GET request on /', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('GET request on /chat', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/chat')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('GET request on /signup', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/signup')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
