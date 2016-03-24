# poc-es6-module-loaders
This POC is created to demistify my confusions around Javascript Module loaders and the terms around it such as CommonJs, AMD, Browserify etc.

This note is purely for my understanding and for my future references. So some points/terms will be implicit here. 

To run this

git clone https://github.com/VivekPMenon/poc-module-loaders.git

cd poc-es6-module-loaders

npm install

gulp build-using-system

serve

**CommonJs** 

It was primarily used by Node Eco system for server side development. Whoever creates Node Modules or Libraries, they used CommonJs syntax. It is all about using **module, exports and require** objects for registering and resolving our modules. Since the library is run by Node Runtime,  developer can assume that module, exports and require variables will be available and he can do stuffs like below.

//./heroes.directive

exports.default = HeroesDirective;

//index.js

var _heroes3 = require('./heroes.directive');

When people started creating Javascript npm modules/libaries for Browsers, we ran in to a challenge that when these files are run on Browser, it will end up in object undefined errors for exports, module and require. 

**Browserify**

Here is where browesrify came to rescue. It make those objects available on the browser by creating it on top of the file. So what we do is create bundle.js using browserify by passing our library entry point to it. The Bundle will have a minified javascript code inserted by Browserify and will wrap all our files inside a function with exports, require and module as parameters. Now all we have to do is add script tag to load this bundle.js file in our HTML page.

It is worth mentioning that CommonJs-Browserify combination can resolve circular dependencies as well.

**AMD**

Since CommonJs was used for server side Node Module development, people started using another module loading technique named Asynchronous Module Loading aka AMD. Here things are almost the same. We have **define and require** functions which are used to define modules and require dependencies. So people do stuffs like below.

define(function ( require ) {
    var isReady = false, foobar;
 
    // note the inline require within our module definition
    require(['foo', 'bar'], function (foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });
 
    return {
        isReady: isReady,
        foobar: foobar
    };
});

**RequireJs**

Now question here is where are "define" and "require" defined. These functions are actually defined in another javascript file called RequireJs which should be the first script file to be loaded on the HTML page using script tag. So it's like AMD works on Browser with the help of RequireJs script.    

It's worth noting that AMD loads scrips asynchronously (obviously, it's running on browser and can parallelly load files). I didnt really read about Bundling options with this one. 


**SystemJs**

In 2015, TC39 released ES6 specs with wonderful ES6 modules strategy. Here we use imports and exports and people do stuffs like below. 

export {
  HeroesService
}

import HeroesService from './heroes.service';

It is awesome but Browsers wouldn't support this any time sooner. So people started creating code transpilers (meaning a program that can generate source code from another source code) to transform ES6 modules to CommonJs or AMD or whatever strategy that browser can understand provided above mentioned loaders are used. This is when, Guy Bedford came up with SystemJs which does exact same things but had below advantage.

1. It is a Universal Module Loader. It can load files that are written using AMD, COmmonJs, Global Variables and make it available for our script just like it would have done if we used the respective module loader.

2. It can handle Circular Dependencies. 

3. It asynchrnously loads script files.

4. We write code using ES6 specs which will be the language that future browser understands. 

So to make it work, we can either add SystemJs as a script tag (with config if we needed) Or we can bundle our code as a SFX file using systemjs builder and that(our bundle.js) can be directly loaded using script tag in HTML without any further dependency to systemJs. SystemJs basically does the same thing as Browserify does, that is wrap our scripts in a function and use it's own way of registering and resolving the modules.

**Conclusion**

This POC contains a few Gulp tasks that uses Typescript, Browserify, SystemJs etc to play around with these Module module loading techniques.  
