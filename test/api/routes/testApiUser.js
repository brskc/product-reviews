const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../../../api/app');
const request = require('supertest')(app);
const baseRoutes = require('./apiBaseRoutes');

describe('API ROUTES /header', () => {

  let token;
  before(function (done) {
    baseRoutes.loginUser(request, {
      email: 'test.user@test.com',
      password: '123456789',
    }, function (error, authToken) {
      if (error) {
        throw error;
      }
      token = authToken;
      done();
    });
  });

  it('/signup | should add new user', (done) => {
    const user = {
      username: 'test-user-name',
      email: 'test-email@test.me',
      password: 'test-password'
    };
    request
      .post('/signup')
      .expect(200)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        res.body.should.property('token');
        res.body.should.property('user');
        done();
      });
  });

  it('/login | should login user', (done) => {
    const user = {
      email: 'test-email@test.me',
      password: 'test-password'
    };
    request
      .post('/login')
      .expect(200)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        res.body.should.property('token');
        res.body.should.property('user');
        done();
      });
  });

  it('/api/v1/user/update | should login user', (done) => {
    const user = {
      username: "test update username"
    };
    request
      .post('/api/v1/user/update')
      .expect(200)
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        res.body.should.property('user');
        done();
      });
  });



});
