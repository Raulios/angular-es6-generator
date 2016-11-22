'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('AngularJS ES6') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What\'s the name of your application?',
      default: 'Angular-ES6'
    }, {
      type: 'input',
      name: 'appDescription',
      message: 'Enter a description for your application:',
      default: 'AngularJS application with ES6, Gulp and Sass'
    }, {
      type: 'input',
      name: 'appKeywords',
      message: 'Enter your application keywords (comma separated):',
      default: 'AngularJS, ES6, Gulp, Sass'
    }, {
      type: 'input',
      name: 'appAuthor',
      message: 'Enter an author name for your application:',
      default: 'AngAuthor'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('app/dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
