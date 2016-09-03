let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../app.js');

chai.use(chaiHttp);

describe('API Endpoint Test', () => {
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
});
