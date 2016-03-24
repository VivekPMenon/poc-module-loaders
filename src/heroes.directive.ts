
///<reference path="../typings/angularjs/angular.d.ts" />
'use strict';

import HeroesService from './heroes.service';

HeroesDirective.$inject = [];

function HeroesDirective():ng.IDirective {
    return {
        restrict:'E',
        controller: Controller,
        scope:{},
        controllerAs: 'vm',
        template: `<h1>Heroes</h1>
                   <div ng-repeat="hero in vm.heroes">
                        <h3 ng-bind="hero"></h3>
                   </div>`
    }
}

class Controller{
    
    heroes:string[];
    villains:string[];
    
    static $inject = ['heroesService'];
    
    constructor(heroesService:HeroesService){
        this.heroes = heroesService.getHeroes();
        
    }    
}

export default HeroesDirective;
