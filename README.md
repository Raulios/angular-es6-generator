# generator-angular-es-6 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependencies][daviddm-image]][daviddm-url]
> Yeoman generator for AngularJS apps using ES6, Gulp and SASS

## Disclaimer

**Please note this is still in an early state of development, I will be adding more features and subgenerators as soon as I can.**

This generator uses my [Angular ES6 Boilerplate](https://github.com/Raulios/angular-es6-boilerplate) to quickly start new AngularJS projects using ES6, Gulp for task automation and SASS for styling.

The folder structure and use of components are based on this [Thinkster article](https://thinkster.io/angularjs-es6-tutorial), which focus on building Angular1 apps that can be upgraded easily to Angular2.

## Installation

First install [Yeoman](http://yeoman.io) if needed:

```bash
npm install -g yo
```

Then install the generator:

```bash
npm install -g generator-angular-es-6
```

Finally, to generate a new project:

```bash
yo angular-es-6
```
> The generator will prompt you for some information like the app name, description, author... The info will be included in some parts of the code such as your package.json

## Run project on development

Type on your terminal:

```bash
gulp
```

> This will start your application in your default browser at `localhost:4000`. Thanks to BrowserSync and Gulp there's no need of refreshing everytime you do some changes in the code, it will happen automatically.

## Run project on production

Type on your terminal:

```bash
gulp build
```

> This will prepare your files for production (concat, minify, inject...) and start your application in the same way as the previous command but from the `dist/` folder and with no auto sync.

## Application files / Folder structure

Please refer to the [Angular ES6 Boilerplate](https://github.com/Raulios/angular-es6-boilerplate) for files and structure info.

## License

MIT © [Raúl Molina](https://github.com/Raulios)


[npm-image]: https://badge.fury.io/js/generator-angular-es-6.svg
[npm-url]: https://npmjs.org/package/generator-angular-es-6
[travis-image]: https://travis-ci.org/Raulios/angular-es6-generator.svg?branch=master
[travis-url]: https://travis-ci.org/Raulios/angular-es6-generator
[daviddm-image]: https://david-dm.org/Raulios/angular-es6-generator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Raulios/angular-es6-generator
