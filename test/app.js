'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-es-6:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'index.html',
      'package.json',
      'gulpfile.js',
      'app/app.js',
      'app/assets/vendor/normalize.css'
    ]);
  });
});
