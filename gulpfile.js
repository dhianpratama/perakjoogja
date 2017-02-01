var elixir = require('laravel-elixir')

console.log('require elixir');

require('./tasks/concatScripts.task.js')
console.log('require concatstrip');
require('laravel-elixir-karma')
console.log('require elixir karma');
require('./tasks/angular.task.js')
console.log('require angular task');
require('./tasks/bower.task.js')
console.log('require bower task');
require('./tasks/ngHtml2Js.task.js')
console.log('require nghtml');



if (!elixir.config.production) {
  require('./tasks/phpcs.task.js')
}

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
	
  var jsOutputFolder = config.js.outputFolder
  var cssOutputFolder = config.css.outputFolder
  var fontsOutputFolder = config.fonts.outputFolder
  var buildPath = config.buildPath

  var assets = [
      'public/js/final.js',
      'public/css/final.css'
    ],
    scripts = [
      './public/js/vendor.js',
      './public/js/partials.js',
      './public/js/app.js',
      './public/dist/js/app.js',
      './public/js/theme.js',
    ],
    styles = [
      './public/css/vendor.css',
      './public/css/app.css',
      './public/css/theme.css'
    ],
    karmaJsDir = [
      jsOutputFolder + '/vendor.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/ng-describe/dist/ng-describe.js',
      jsOutputFolder + '/partials.js',
      jsOutputFolder + '/app.js',
      'tests/angular/**/*.spec.js'
  ]

	console.log('###### gulp started ######');
  mix
    .bower()
    .angular('./angular/')
    .ngHtml2Js('./angular/**/*.html')
    .concatScripts(scripts, 'final.js')
    .sass('./angular/**/*.scss', 'public/css')
    .styles(styles, './public/css/final.css')
    .version(assets)
    // .browserSync({
    //   proxy: 'localhost:8000'
    // })
    // .karma({
    //   jsDir: karmaJsDir
    // })

  mix
    .copy(fontsOutputFolder, buildPath + '/fonts')
})
