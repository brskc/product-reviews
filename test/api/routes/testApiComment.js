'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../../../api/app');
const request = require('supertest')(app);
const baseRoutes = require('./apiBaseRoutes');

describe('API ROUTES /api/v1/comment', () => {

  let token;
  before(function (done) {
    baseRoutes.loginUser(request, {
      email: 'test@email.com',
      password: '123456789',
    }, function (error, authToken) {
      if (error) {
        throw error;
      }
      token = authToken;
      done();
    });
  });

  it('/api/v1/comment | should show all comment', (done) => {
    request
      .get('/api/v1/comment')
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

  it('/api/v1/comment/add | should not allow to access to when not logged in', (done) => {
    request
      .post('/api/v1/comment/add')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.property('success');
        expect(res.body.success).to.equal(false);
        res.body.should.property('msg');
        done()
      })
  });

  it('/api/v1/comment/update | should not allow to access to when not logged in', (done) => {
    request
      .post('/api/v1/comment/update')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.property('success');
        expect(res.body.success).to.equal(false);
        res.body.should.property('msg');
        done();
      })
  });

  it('/api/v1/comment/delete | should not allow to access to when not logged in', (done) => {
    request
      .post('/api/v1/comment/delete')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.property('success');
        expect(res.body.success).to.equal(false);
        res.body.should.property('msg');
        done();
      })
  });

  it('/api/v1/comment/add | should add comment', (done) => {
    const comment = {
      header_id: "5c8fb97a2866893b1db84533",
      comment: "test-comment"
    };
    request
      .post('/api/v1/comment/add')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(comment)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.a('object');
        res.body.should.property('success');
        expect(res.body.success).to.equal(true);
        let id = res.body.comment._id;
        done()
      })
  });

  it('/api/v1/comment/update | should update comment', (done) => {
    const comment = {
      id: "5c8fb97a2866893b1db84533",
      comment: "test-update-comment"
    };
    request
      .post('/api/v1/comment/update')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(comment)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
  });

  it('/api/v1/comment/delete | should delete comment', (done) => {
    const comment = {
      id: "5c8fb97a2866893b1db84533"
    };
    request
      .post('/api/v1/comment/delete')
      .set('x-access-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(comment)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
  });
});
