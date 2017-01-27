/* eslint no-undef:0, no-unused-vars:0, handle-callback-err:0*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../build/app.js').default;

chai.use(chaiHttp);

describe('Chat API Endpoint Test', () => {
  describe('GET request on /chat', () => {
    it('should return 200', done => {
      chai.request(server)
      .get('/api/chat')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Serach Chat on /chat/general/search', () => {
    it('should return 401 without login', done => {
      chai.request(server)
      .get('/api/chat/search')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });

  describe('Serach chat message /chat/general/search?msg=hello', () => {
    it('should return 401 without login', done => {
      chai.request(server)
      .get('/api/chat/search?msg=hello')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
});
