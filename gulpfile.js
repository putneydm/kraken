/**
 * Gulp Packages
 */

// General
var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var lazypipe = require('lazypipe');
var plumber = require('gulp-plumber');
var flatten = require('gulp-flatten');
var tap = require('gulp-tap');
var rename = require('gulp-rename');
var header = require('gulp-header');
var footer = require('gulp-footer');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var package = require('./package.json');
var inject = require('gulp-inject')
var filter = require('gulp-filter');

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

// SVGs
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var svg2png = require('gulp-svg2png');
var svgSprite = require("gulp-svg-sprites")

// Docs
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');

//Markdown
var markdown = require('gulp-markdown');

//images
var imagemin = require('gulp-imagemin');
var jpegtran = require('gulp-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran/');
var gm = require('gulp-gm');
var rename = require('gulp-rename');


/**
 * Paths to project folders
 */

var paths = {
	input: 'src/**/*',
	output: 'site/',
	scripts: {
		input: 'src/js/*',
		output: 'site/js/'
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
		output: 'site/',
		//templates: 'src/html/_templates/',
		assets: 'src/html/assets/**'
	},
	
	markdown: {
		input: 'src/html/modules/markdown/*.{md,markdown}',
		output: 'src/html/modules/markdown_compiled',
	},
	
	images: {
		input: 'src/siteart_input/*.png',
		output: 'site/siteart/'
	}
	
};




/**
 * Gulp Tasks
 */

// Lint, minify, and concatenate scripts
gulp.task('build:scripts', ['clean:dist'], function() {
	var jsTasks = lazypipe()
		.pipe(gulp.dest, paths.scripts.output)
		.pipe(rename, { suffix: '.min' })
		.pipe(uglify)
		.pipe(gulp.dest, paths.scripts.output);

	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(tap(function (file, t) {
			if ( file.isDirectory() ) {
				var name = file.relative + '.js';
				return gulp.src(file.path + '/*.js')
					.pipe(concat(name))
					.pipe(jsTasks());
			}
		}))
		.pipe(jsTasks());
});

// Process, lint, and minify Sass files
gulp.task('build:styles'/*, ['clean:dist']*/, function() {
	return gulp.src(paths.styles.input)
		.pipe(plumber())
		.pipe(sass({style: 'expanded', noCache: true, 'sourcemap=none': true}))
		.pipe(flatten())
		.pipe(prefix('last 2 version', '> 1%'))
	//	.pipe(header(banner.full, { package : package }))
	//	.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
	//	.pipe(header(banner.min, { package : package }))
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


var svgSprite = require("gulp-svg-sprites");
var filter    = require('gulp-filter');
var svg2png   = require('gulp-svg2png');

gulp.task('png_sprites', function () {
    return gulp.src(paths.svgs.input)
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

// Lint scripts
gulp.task('lint:scripts', function () {
	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
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




gulp.task('build:markdown', function () {
    return gulp.src(paths.markdown.input)
        .pipe(markdown())
        .pipe(gulp.dest(paths.markdown.output));
});


// Generate pages
gulp.task('build:pages', ['compile'], function() {
	return gulp.src(paths.html.input)
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
    gulp.watch(paths.input).on('change', function(file) {
        gulp.start('default');
        gulp.start('refresh');
    });
});

// Run livereload after file change
gulp.task('refresh', ['compile', 'docs'], function () {
    livereload.changed();
});


/**
 * Task Runners
 */

// Compile files
gulp.task('compile', [
	'lint:scripts',
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


// Compile files, generate docs, and run unit tests (default)
gulp.task('default', [
	'compile',
	//'docs',
	//'tests',
	'pages'
]);

// Compile files, generate docs, and run unit tests when something changes
gulp.task('watch', [
    'listen',
    'default'
]);



gulp.task('images', function () {

  // x-small images
  gulp.src(paths.images.input)
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
});
