# Working with the Source Files

Working with the development code in the `src` directory allows you to take advantage of the powerful features included in Kraken's [Gulp.js](http://gulpjs.com) build system.

<strong>In this section:</strong>
<ul>
	<li><a data-scroll href="#dependencies">Dependencies</a></li>
	<li><a data-scroll href="#quick-start">Quick Start</a></li>
	<li><a data-scroll href="#working-with-sass">Working with Sass</a></li>
	<li><a data-scroll href="#working-with-svg">Working with SVG</a></li>
	<li><a data-scroll href="#working-with-icon-fonts">Working with Icon Fonts</a></li>
	<li><a data-scroll href="#working-with-javascript">Working with JavaScript</a></li>
	<li><a data-scroll href="#continuous-integration">Continuous Integration</a></li>
	<li><a data-scroll href="#gui-source-compilers">GUI Source Compilers</a></li>
</ul>


<h2 id="dependencies">Dependencies</h2>

Make sure these are installed first.

* [Node.js](http://nodejs.org/)
* [Ruby Sass](http://sass-lang.com/install)
* [Gulp](http://gulpjs.com/) `sudo npm install -g gulp`


<h2 id="quick-start">Quick Start</h2>

1. In bash/terminal/command line, `cd` into the `kraken` directory.
2. Run `npm install` to install the required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made.
	* `gulp reload` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).


<h2 id="working-with-sass">Working with Sass</h2>

Kraken's Sass files are located in `src` > `sass`. Kraken's build system generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser.

### `_config.scss`

The `_config.scss` file contains variables for all of the colors, font stacks, breakpoints, and sizing used in Kraken. It also controls the grid and, if you're using an icon font, the unicode character values and colors.

```scss
// Colors
$color-primary: #0088cc;
$color-black: #272727;
$color-white: #ffffff;

$color-success: #377f31; // Green
$color-danger: #880e14; // Red
$color-warning: #dba909; // Yellow
$color-code: #dd1144; // Fuscia

$color-gray-dark: #808080;
$color-gray-light: #e5e5e5;


// Font Stacks
$font-primary: "Helvetica Neue", Arial, sans-serif;
$font-secondary: Georgia, Times, serif;
$font-monospace: Menlo, Monaco, "Courier New", monospace;


// Breakpoints
$breakpoints: (
	// $name: $size
	xsmall: 20em,
	small: 30em,
	medium: 40em,
	large: 60em,
	xlarge: 80em,
);


// Sizing
$font-size-base: 100%;
$font-size-xlarge-screens: 125%;
$spacing: 1.5625em;
$container-width: 88%;
$container-max-width: 80em;


// Grid
$grid-margins: 1.4%;
$grid-sizes: (
	// $name: $width
	sixth: 16.66666666667%,
	fifth: 20%,
	fourth: 25%,
	third: 33.33333333333%,
	half: 50%,
	two-thirds: 66.666666666667%,
	three-fourths: 75%,
	full: 100%,
);
$grid-breakpoints: (
	// @params
	// $name: () - must correspond with a $breakpoint
	// content-choreo - if true, will add classes for changing display order of content
	// offsets - if true, will add grid offset classes
	// offset-clear - if true, will add class to clear grid offsets
	// no-namespace - if true, will not namespace grid output to media query size (as in .grid-item--fourth, not .grid-item--fourth-small)
	xsmall: (),
	small: (),
	medium: (
		content-choreo: true,
		offsets: true,
	),
	large: (
		content-choreo: true,
		offsets: true,
		offset-clear: true
	),
	xlarge: (
		content-choreo: true,
		offsets: true,
		offset-clear: true
	),
);


// Icons
$icons: (
	// $name, $character, $color
	("logo", "\e600", null),
);
```

#### Modifying the Grid

Tailoring the grid system to your project is easy to do and can help keep overall file size to a minimum.

Use the `$grid-margins` variable to set the size of the gutter between each grid item. You can also add or remove sizes from `$grid-sizes` as desired.

`$grid-breakpoints` controls how each grid size gets generated. At a minimum, include one `$name: ()` pair for each breakpoint-specific grid size. The `$name` variable must correspond with a `$breakpoint`. Within the `()`, you can control several optional settings (all boolean values):

* `no-namespace` - if `true`, will not namespace grid output to media query size (example output: `.grid-item--fourth` instead of `.grid-item--fourth-small`).
* `content-choreo` - if `true`, will add classes for changing display order of content (`.grid-item--flip-*` and `.grid-item--unflip-*`).
* `offsets` - if `true`, will add grid offset classes.
* `offset-clear` - if `true`, will add class to clear grid offsets.


### `_mixins.scss`

The `_mixins.scss` file contains just a handful of mixins and functions to speed up development.

* `font-face` adds the `@font-face` property.
* `strip-unit` removes units (px, em, etc.) from numbers.
* `calc-em` converts pixels to ems.

`font-face` was forked from [Bourbon](http://bourbon.io/), the world's best Sass library.


### Components

The `components` folder contains all of the Kraken components: the grid, button and form styling, and so on. The `main.scss` file imports `_config.scss`, `_mixins.scss`, and the components for processing into a CSS file.


<h2 id="working-with-svg">Working with SVG</h2>

SVG files placed in the `src` > `svg` directory will be compiled into a single SVG sprite called `icons.svg` in the `dist` > `svg` directory.


<h2 id="working-with-icon-fonts">Working with Icon Fonts</h2>

The `_iconfonts.scss` component is commented out of `main.scss` by default. Uncomment it to use icon fonts with Kraken.

The `font-face` mixin generates the required `@font-face` code for embedding fonts. You can assign names, unicode characters, and color values to your icons in the `_config.scss` file.


<h2 id="working-with-javascript">Working with JavaScript</h2>

Kraken's JavaScript files are located in the `src` > `js` directory.

Files placed directly in the `js` folder will compile directly to `dist` > `js` as both minified and unminified files. Files placed in subdirectories will also be concatenated into a single file.

For example, `detects` > `icon-fonts.js` and `detects` > `svg.js` compile into `detects.js` in the `dist` > `js` directory.

### Unit Testing

If you've written [Jasmine unit tests](http://jasmine.github.io/) for any of your scripts, place them in the `test` > `spec` directory and they will automatically run on compile.

Results are displayed in both the terminal window and `test` > `results`. You can see how much coverage each unit test provides in the `test` > `coverage` directory.


<h2 id="continuous-integration">Continous Integration</h2>

Kraken includes a configuration file for [Travis CI](http://docs.travis-ci.com/user/getting-started/), a continuous integration service for GitHub.

If you sign-up and activate it for your repository, Travis CI will run your build and execute any processes to make sure everything is working as expected. This is particularly useful when working with a team or managing open source projects with multiple contributors.

The `.travis.yml` file is pre-configured for Kraken's build system. Even if you add files or update the Gulp tasks, you shouldn't need to change anything for it to work.


<h2 id="gui-source-compilers">GUI Source Compilers</h2>

If you would like the benefits of working with the source files, but aren't comfortable using terminal and command line code, there are a few GUIs that can help.

[CodeKit](https://incident57.com/codekit/) and [Hammer](http://hammerformac.com/) are two powerful Mac-only products that I used for some time. On Windows, I hear [Prepos](http://alphapixels.com/prepros/) is both beautiful and delightful to use.</p>

These tools can't replicate all of the features of the Gulp.js build system, but they come close.