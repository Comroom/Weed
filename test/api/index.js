/* eslint no-undef:0, no-unused-vars:0, handle-callback-err:0*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../build/app.js').default;

chai.use(chaiHttp);

describe('Web Endpoint Test', () => {
  describe('GET request on /', () => {
    it('should return 200', done => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('GET request on /chat', () => {
    it('should return 200', done => {
      chai.request(server)
      .get('/chat')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('GET request on /signup', () => {
    it('should return 200', done => {
      chai.request(server)
      .get('/signup')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
