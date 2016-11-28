import angular from 'angular';
import HomeConfig from './home.config';
import HomeCtrl from './home.controller';

let homeModule = angular.module('app.home', []);
homeModule.config(HomeConfig);
homeModule.controller('HomeCtrl', HomeCtrl);

export default homeModule;