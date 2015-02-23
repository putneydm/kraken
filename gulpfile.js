/**
 * Gulp Packages
 */

// General
var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var flatten = require('gulp-flatten');
var tap = require('gulp-tap');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var package = require('./package.json');
var filter = require('gulp-filter');
var beep = require('beepbeep');
var cache = require('gulp-cached');
var remember = require('gulp-remember');

// Scripts and tests
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

// Styles
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var csslint = require('gulp-csslint');

// SVGs
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var svg2png = require('gulp-svg2png');
var svgSprite = require("gulp-svg-sprites")

// Docs
var fileinclude = require('gulp-file-include');

//Markdown
var markdown = require('gulp-markdown');

//images
var imagemin = require('gulp-imagemin');
var jpegtran = require('gulp-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran/');
var gm = require('gulp-gm');
var rimraf = require('gulp-rimraf');


/**
 * Paths to project folders
 */

var paths = {
	input: 'src/**/*',
	output: 'site/',
	scripts: {
		input: 'src/js/**/*',
		output: 'site/js/',
		output_concat: 'site/js/min/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'site/css/'
	},
	svgs: {
		input: 'src/svg/*',
		output: 'site/svg/'
	},
	static: 'src/static/**',
	test: {
		input: 'src/js/**/*.js',
		karma: 'test/karma.conf.js',
		spec: 'test/spec/**/*.js',
		coverage: 'test/coverage/',
		results: 'test/results/'
	},
	docs: {
		input: 'src/docs/*.{html,md,markdown}',
		output: 'docs/',
		templates: 'src/docs/_templates/',
		assets: 'src/docs/assets/**'
	},	
	html: {
		input: 'src/html/*.{html,md,markdown}',
		watch: 'src/html/**/*.html',
		output: 'site/',
		//templates: 'src/html/_templates/',
		assets: 'src/html/assets/**'
	},	
	markdown: {
		input: 'src/html/modules/markdown/*/*.{md,markdown}',
		output: 'src/html/modules/markdown_compiled',
	},	
	images: {
		input: 'src/siteart_input/*{.png,.jpg,.tiff,.jpeg}',
		output: 'site/siteart/',
		done: 'src/siteart_ouput/'
	}	
};


// Process, lint, and minify Sass files
gulp.task('build:styles', function() {

	return gulp.src(paths.styles.input)
 		.pipe(plumber(function () {
            beep();
        }))
		.pipe(sass({style: 'expanded', noCache: true, 'sourcemap=none': true}))
		.pipe(flatten ())
	//	.pipe(csslint())
    //	.pipe(csslint.reporter())
		.pipe(prefix('last 2 version', '> 1%'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		.pipe(gulp.dest(paths.styles.output));
});

// Generate SVG sprites
gulp.task('build:svgs', ['clean:dist'], function () {
	return gulp.src(paths.svgs.input)
		.pipe(plumber())
		.pipe(tap(function (file, t) {
			if ( file.isDirectory() ) {
				var name = file.relative + '.svg';
				return gulp.src(file.path + '/*.svg')
					.pipe(svgmin())
					.pipe(svgstore({
						fileName: name,
						prefix: 'icon-',
						inlineSvg: true
					}))
					.pipe(gulp.dest(paths.svgs.output));
			}
		}))
		.pipe(svgmin())
		.pipe(svgstore({
			fileName: 'icons.svg',
			prefix: 'icon-',
			inlineSvg: true
		}))
		.pipe(gulp.dest(paths.svgs.output))
});


gulp.task('png_sprites', function () {
    return gulp.src(paths.svgs.input)
   		.pipe(svgmin())
		.pipe(svgSprite())      
   		.pipe(gulp.dest(paths.svgs.output)) // Write the sprite-sheet + CSS + Preview
        .pipe(filter("**/*.svg"))  // Filter out everything except the SVG file
        .pipe(svg2png())           // Create a PNG
        .pipe(gulp.dest(paths.svgs.output));
});


// Copy static files into output folder
gulp.task('copy:static', ['clean:dist'], function() {
	return gulp.src(paths.static)
		.pipe(plumber())
		.pipe(gulp.dest(paths.output));
});


// Remove prexisting content from output and test folders
gulp.task('clean:dist', function () {
	del.sync([
		paths.output,
		paths.test.coverage,
		paths.test.results
	]);
});

// Run unit tests
gulp.task('test:scripts', function() {
	return gulp.src([paths.test.input].concat([paths.test.spec]))
		.pipe(plumber())
		.pipe(karma({ configFile: paths.test.karma }))
		.on('error', function(err) { throw err; });
});


gulp.task('build:scripts', function() {

	//this excludes scripts in the vendor folder from being linted. vendorFilter.restore ads them back to concat.
	var vendorFilter = filter(['**/*', '!vendor/*']);

	return gulp.src(paths.scripts.input)
		.pipe (cache('build:scripts'))
 		.pipe (vendorFilter) // excludes vendor files from being linted
 		.pipe(plumber(function () {
            beep();
        }))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish')) // reports linting errors in the console
	//	.pipe(jshint.reporter('fail'))
		.pipe(uglify())
		.pipe(vendorFilter.restore()) // adds back vendor files so they can be concatenated 
		.pipe (remember('scripts'))
    	.pipe(concat('script.js')) 	
    	.pipe(rename({
        	//	dirname: paths.scripts.output,
        		suffix: ".min"
    		}))
    	.pipe(gulp.dest(paths.scripts.output));	  	    	
});



gulp.task('build:markdown', function () {
    return gulp.src(paths.markdown.input)
    	.pipe (cache('build:markdown'))
        .pipe(markdown())
        .pipe(gulp.dest(paths.markdown.output));
});


// Generate pages
gulp.task('build:pages', ['compile'], function() {
	return gulp.src(paths.html.input)
		//.pipe (cache('build:pages'))
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(paths.html.output));
});


// Spin up livereload server and listen for file changes
gulp.task('listen', function () {
    livereload.listen();
    gulp.watch(paths.styles.input).on('change', function(file) {
        gulp.start('compile');
        gulp.start('refresh');
    });
        gulp.watch(paths.html.watch).on('change', function(file) {
        gulp.start('pages');
        gulp.start('refresh');
    });
        gulp.watch(paths.markdown.input).on('change', function(file) {
        gulp.start('pages');
        gulp.start('refresh');
    });
        gulp.watch(paths.scripts.input).on('change', function(file) {
        gulp.start('compile');
        gulp.start('refresh');
    });    
    
    	gulp.watch(paths.images.input).on('change', function(file) {
        gulp.start('images');
        gulp.start('refresh');
    });  
    
    
});

// Run livereload after file change
gulp.task('refresh', ['compile', 'pages', 'images'], function () {
    livereload.changed();
});


/**
 * Task Runners
 */

// Compile files
gulp.task('compile', [
//	'lint:scripts',
	'clean:dist',
	'copy:static',
	'build:scripts',
	'build:svgs',
	'build:styles'
]);



// Generate pages
gulp.task('pages', [
	'build:markdown',
	'build:pages'
]);


// Compile files, generate docs, and run unit tests when something changes
gulp.task('watch', [
    'listen',
    'default'
]);

// Compile files, generate docs, and run unit tests when something changes
gulp.task('images', [
    'images:process',
    'copy:images'
]);



gulp.task('images:process', function () {

  // x-small images
  gulp.src(paths.images.input)
  //  .pipe (cache('images:process'))
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(700, null),
             gmfile.crop(700, 412, 0, 0),
             gmfile.quality(35);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))
    
    // Crunches images  
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))


    // Renames images
    .pipe(rename({
    prefix: 'xsmall_'
    }))

    .pipe(gulp.dest(paths.images.output)); // ./dist/main/text/ciao/bonjour-aloha-hola.md

    // large images  
    gulp.src(paths.images.input)
 //   .pipe (cache('images:process'))
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(1400, null),
             gmfile.crop(1400, 812, 0, 0),
             gmfile.quality(35);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))
    
    // Crunches images
   
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))


    // Renames images
    .pipe(rename({
    prefix: 'large_'
    }))

    .pipe(gulp.dest(paths.images.output)); // ./dist/main/text/ciao/bonjour-aloha-hola.md
    
    
});

// Copy image files into output folder after processing them
gulp.task('copy:images', function() {
	return gulp.src(paths.images.input)
		.pipe(plumber())
		.pipe(rimraf())
		.pipe(gulp.dest(paths.images.done));
});



// Compile files, generate docs, and run unit tests (default)
gulp.task('default', [
	'images',
	'compile',
	'pages'

]);
