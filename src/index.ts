///<reference path="../typings/angularjs/angular.d.ts" /> 

'use strict';

import HeroesService from './heroes.service';
import HeroesDirective from './heroes.directive';
import {add15} from './math1';
import './global-var';
import * as AMDMod  from './amd-module';

console.log(add15(1));
declare var g_var_Hello:any;
console.log(g_var_Hello);
console.log(AMDMod.hello());

angular
    .module('heroes', [])
    .directive('listOfHeroes', HeroesDirective)
    .service('heroesService', HeroesService);
    
    

