const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../../../api/app');
const request = require('supertest')(app);

describe('API ROUTES /', () => {

  it('/ | should show all product', (done) => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done();
      });
  });

  it('/register | should add user ', (done) => {
    const user = {
      username: 'test name',
      email: 'test@mail.com',
      password: 'test.password',
    };

    request
      .post('/register ')
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err)
          return done(err);
        res.body.should.be.a('object');
        res.body.should.property('status');
        expect(res.body.status).to.equal(true);
        res.body.should.property('msg');
        res.body.should.property('username');
        res.body.should.property('email');
      });
    done();
  });

});
