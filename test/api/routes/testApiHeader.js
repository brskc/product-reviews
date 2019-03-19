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

  it('/header | should show all header', (done) => {
    request
      .get('/header')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('/api/v1/header/add | should add header', (done) => {
    const header = {
      name: "test-header-name",
      category: "test-category"
    };

    request
      .post('/api/v1/header/add')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(header)
      .expect(200)
      .end((err,res) => {
        if (err) return done(err);
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        res.body.should.property('header');
        done()
      })
  });

  it('/api/v1/header/update | should update header', (done) => {
    const header = {
      id: "5c8fb97a2866893b1db84533",
      comment: "test-update-header"
    };

    request
      .post('/api/v1/header/update')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(header)
      .expect(200)
      .end((err,res) => {
        if (err) return done(err);
        done();
      })
  });

  it('/api/v1/header/delete | should delete header', (done) => {
    const header = {
      id: "5c8fb97a2866893b1db84533",
      comment: "test-update-header"
    };

    request
      .post('/api/v1/header/update')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(header)
      .expect(200)
      .end((err,res) => {
        if (err) return done(err);
        done();
      })
  });

});
