'use strict'
var log = require('captains-log')();
var express = require('express');
let chai = require('chai');
let chaiHttp = require('chai-http');
var fs = require('fs');
let server = require('../../application/engine/app');
var router = express.Router();
let should = chai.should();
chai.use(chaiHttp);

function read_file(path)
{
    let content = fs.readFileSync(path, "utf8")
    return content;
}

describe('Format clojure code', () => {

  var file_content = read_file('./tests/integration_tests/code_samples/messy/test.clj')

  it('Try to format a clojure code', function(done) {
    chai
      .request(server)
      .post('/format')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({

        extension: "clj",
        content : file_content
      })
      .end(function(error, response) {
        if (error) {
          done(error);
        } else {
          var expect = require('chai').expect;
          expect(response.status).to.be.equal(200);
          expect(response.text).to.be.equal(read_file('./tests/integration_tests/code_samples/beautified/test.clj'));
          done();
        }
      });

  });

});


describe('Format php code', () => {

  var file_content = read_file('./tests/integration_tests/code_samples/messy/test.php')

  it('Try to format a php code', function(done) {
    chai
      .request(server)
      .post('/format')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({

        extension: "php",
        content : file_content
      })
      .end(function(error, response) {
        if (error) {
          done(error);
        } else {
          var expect = require('chai').expect;
          expect(response.status).to.be.equal(200);
          expect(response.text).to.be.equal(read_file('./tests/integration_tests/code_samples/beautified/test.php'));
          done();
        }
      });

  });

});

describe('Format golang code', () => {

  var file_content = read_file('./tests/integration_tests/code_samples/messy/test.go')

  it('Try to format a golang code', function(done) {
    chai
      .request(server)
      .post('/format')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({

        extension: "go",
        content : file_content
      })
      .end(function(error, response) {
        if (error) {
          done(error);
        } else {
          var expect = require('chai').expect;
          expect(response.status).to.be.equal(200);
          expect(response.text).to.be.equal(read_file('./tests/integration_tests/code_samples/beautified/test.go'));
          done();
        }
      });

  });

});
