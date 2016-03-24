var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var del    = require('del');
var runseq = require('run-sequence');
var browserify = require('browserify');
var tsify = require('tsify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var Builder = require('systemjs-builder');

var paths = {
    src: './src/*.ts',
    es6js: 'dist/ts-es6js',
    es5js:'dist/babel-es5js',
    es5jsFromTs: 'dist/ts-es5js',
    bundleBabel: 'dist/bundle-babel',
    bundleTs: 'dist/bundle-ts',
    bundleSystem: 'dist/bundle-system'
};

gulp.task('ts-to-es6', function () {
    return gulp
        .src(paths.src)
        .pipe(tsc({            
            sourcemap: false,
            emitError: false,
            target: 'es6'
        }))
        .pipe(gulp.dest(paths.es6js));
});

gulp.task('ts-to-es5', function(){
   return gulp
        .src(paths.src)
        .pipe(tsc({
            sourcemap: false,
            emitError: false,
            target: 'es5',
            module: 'commonJs'
        }))
        .pipe(gulp.dest(paths.es5jsFromTs)); 
});

gulp.task('es6-to-es5', function () {
    return gulp
        .src(paths.es6js + '/*.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(gulp.dest(paths.es5js));
});

gulp.task('browserify:babel', function(){
    return browserify(paths.es5js + '/index.js')
        .bundle()        
        .pipe(source('bundle.js'))        
        .pipe(gulp.dest(paths.bundleBabel));
});

gulp.task('browserify:ts', function(){
    return browserify(paths.es5jsFromTs + '/index.js')
        .bundle()        
        .pipe(source('bundle.js'))        
        .pipe(gulp.dest(paths.bundleTs));
});

gulp.task('system-bundle', function(cb){
    var builder = new Builder();
    builder.config({
        defaultJSExtensions: true,
        transpiler: "typescript",
        typescriptOptions: {
            noImplicitAny: false,
            typeCheck: "strict"
        },
        packages: {
            src: {
               main: 'index',
               defaultExtension: "ts"
            }
        },
        map: {
            "typescript": "node_modules/typescript/lib/typescript.js"
        }
    });
    
    builder.buildStatic('src', paths.bundleSystem + '/bundle.js', {
        runtime:false
        // sourceMaps: true, lowResSourceMaps: true
       //format:'cjs'
    }).then(cb()); 
});

gulp.task('clean', function(){
    return del('dist');
})

gulp.task('build-using-babel', function(callback){
    runseq('ts-to-es6', 'es6-to-es5', 'browserify:babel');
});

gulp.task('build-using-ts', function(callback){
    runseq('ts-to-es5', 'browserify:ts');
});

gulp.task('build-using-system', function(callback){
    runseq('system-bundle');
});

// gulp.task('build-using-tsify', function(){
//     return browserify()
//         .add('src/index.ts')
//         .plugin(tsify, { 
//             noImplicitAny: true, 
//             module: 'commonJs', 
//             target: 'es5' })
//         .bundle()
//         .on('error', function (error) { console.error(error.toString()); })
//         //.pipe(process.stdout);
//         .pipe(gulp.dest("./dist/bundle-tsify/bundle.js"));
// });

