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
    }, {
      type: 'list',
      name: 'ui',
      message: 'Select the UI Framework you want to use:',
      choices: [
        'None',
        'Angular UI Bootstrap'
      ]
    }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appKeywords = props.appKeywords;
      this.appAuthor = props.appAuthor;
      this.ui = props.ui;
    }.bind(this));
  },

  writing: function () {
    this.errorTemplate = '<%%= errorTemplate %>'

    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('app/_app.js'),
      this.destinationPath('app/app.js'),
      this
    );

    this.fs.copy(
      this.templatePath('app/assets/sass/custom.scss'),
      this.destinationPath('app/assets/sass/custom.scss')
    );

    if(this.ui == 'None') {
      this.fs.copy(
        this.templatePath('app/assets/vendor/normalize.css'),
        this.destinationPath('app/assets/vendor/normalize.css')
      );
    } else if(this.ui == 'Angular UI Bootstrap') {
      this.fs.copy(
        this.templatePath('app/assets/vendor/bootstrap.css'),
        this.destinationPath('app/assets/vendor/bootstrap.css')
      );
    }

    this.fs.copy(
      this.templatePath('app/components/index.js'),
      this.destinationPath('app/components/index.js')
    );

    this.fs.copy(
      this.templatePath('app/config/app.config.js'),
      this.destinationPath('app/config/app.config.js')
    );

    this.fs.copy(
      this.templatePath('app/config/app.run.js'),
      this.destinationPath('app/config/app.run.js')
    );

    this.fs.copyTpl(
      this.templatePath('app/config/_app.constants.js'),
      this.destinationPath('app/config/app.constants.js'),
      this
    );

    this.fs.copy(
      this.templatePath('app/home/home.config.js'),
      this.destinationPath('app/home/home.config.js')
    );

    this.fs.copy(
      this.templatePath('app/home/home.controller.js'),
      this.destinationPath('app/home/home.controller.js')
    );

    this.fs.copyTpl(
      this.templatePath('app/home/_home.html'),
      this.destinationPath('app/home/home.html'),
      this
    );

    this.fs.copy(
      this.templatePath('app/home/index.js'),
      this.destinationPath('app/home/index.js')
    );

    this.fs.copy(
      this.templatePath('app/layout/app-view.html'),
      this.destinationPath('app/layout/app-view.html')
    );

    this.fs.copy(
      this.templatePath('app/layout/footer.component.js'),
      this.destinationPath('app/layout/footer.component.js')
    );

    this.fs.copyTpl(
      this.templatePath('app/layout/_header.component.js'),
      this.destinationPath('app/layout/header.component.js'),
      this
    );

    this.fs.copy(
      this.templatePath('app/layout/footer.html'),
      this.destinationPath('app/layout/footer.html')
    );

    this.fs.copyTpl(
      this.templatePath('app/layout/_header.html'),
      this.destinationPath('app/layout/header.html'),
      this
    );

    this.fs.copy(
      this.templatePath('app/layout/index.js'),
      this.destinationPath('app/layout/index.js')
    );

    this.fs.copy(
      this.templatePath('app/services/index.js'),
      this.destinationPath('app/services/index.js')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
