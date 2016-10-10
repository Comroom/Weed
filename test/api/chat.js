let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../app.js');

chai.use(chaiHttp);

describe('Chat API Endpoint Test', () => {
  describe('GET request on /chat', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/api/chat')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Serach Chat on /chat/general/search', () => {
    it('should return 401 without login', (done) => {
      chai.request(server)
      .get('/api/chat/search')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });

  describe('Serach chat message /chat/general/search?msg=hello', () => {
    it('should return 401 without login', (done) => {
      chai.request(server)
      .get('/api/chat/search?msg=hello')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
});
