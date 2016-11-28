'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-es-6:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'index.html',
      'package.json',
      'gulpfile.js',
      'app/app.js',
      'app/assets/vendor/normalize.css',
      'app/assets/sass/custom.scss',
      'app/components/index.js',
      'app/config/app.config.js',
      'app/config/app.run.js',
      'app/config/app.constants.js',
      'app/home/home.config.js',
      'app/home/home.controller.js',
      'app/home/index.js',
      'app/home/home.html',
      'app/layout/app-view.html',
      'app/layout/header.html',
      'app/layout/footer.html',
      'app/layout/header.component.js',
      'app/layout/footer.component.js',
      'app/layout/index.js',
      'app/services/index.js'
    ]);
  });
});
