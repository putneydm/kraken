# The Grid

Kraken uses a fluid, mobile-first grid system based on simple fractions&mdash;halves, thirds, fourths, and so on. It supports nesting, and includes offsets and special classes for content choreography.

And if you're [working with the source files](working-with-the-source-files.html), you can easily customize the grid to be as complex&mdash;or as simple&mdash;as needed.

**In this section:**
<ul>
	<li><a data-scroll href="#the-base-grid">The Base Grid</a></li>
	<li><a data-scroll href="#offsets">Offsets</a></li>
	<li><a data-scroll href="#content-choreography">Content Choreography</a></li>
	<li><a data-scroll href="#complex-grid-patterns">Complex Grid Patterns</a></li>
</ul>

<h2 id="the-base-grid">The Base Grid</h2>

Create a group of grids by adding a `<div>` with the `.grid` class. Give individual columns within that group the `.grid-item` class. Set the width for each item with modifier classes that follow this pattern: `.grid-item--$width-$size`.

* `$width` - How wide (as a fraction) the grid item should be.
* `$size` - Which breakpoint at which the grid should kick in. Options: `xsmall` (20em), `small` (30em), `medium` (40em), `large` (60em), `xlarge` (80em).

*Kraken is mobile-first, so the grid is a single-column layout until activated. If you only need a simple grid, you can remove the need for the `-$size` attribute in `_config.scss` file in the [source files](working-with-the-source-files.html).*

</div></div><!-- / Go full width -->

<div class="grid">
	<div class="grid-item grid-item--third-medium"><div class="gridHighlight">third-medium</div></div>
	<div class="grid-item grid-item--twoThirds-medium"><div class="gridHighlight">twoThirds-medium</div></div>
</div>

<div class="grid">
	<div class="grid-item grid-item--fourth-large"><div class="gridHighlight">fourth-large</div></div>
	<div class="grid-item grid-item--threeFourths-large"><div class="gridHighlight">threeFourths-large</div></div>
</div>

<div class="grid">
	<div class="grid-item grid-item--half-xsmall"><div class="gridHighlight">third-small</div></div>
	<div class="grid-item grid-item--half-xsmall"><div class="gridHighlight">twoThirds-small</div></div>
</div>


```markup
<div class="grid">
	<div class="grid-item grid-item--third-medium">third-medium</div>
	<div class="grid-item grid-item--twoThirds-medium">twoThirds-medium</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--fourth-large">fourth-large</div>
	<div class="grid-item grid-item--threeFourths-large">threeFourths-large</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--half-xsmall">third-small</div>
	<div class="grid-item grid-item--half-xsmall">twoThirds-small</div>
</div>
```


<div class="grid">
	<div class="grid-item grid-item--twoThirds-medium u-floatCenter">
		<h2 id="offsets">Offsets</h2>

		<p>Push grids to the right by adding a <code>.grid-item--offset-$width-$size</code> class. Center grids with the <code>.u-floatCenter</code> utility class.</p>

	</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--threeFourths-medium grid-item--offset-fourth-medium"><div class="gridHighlight">threeFourths-medium offset-fourth-medium</div></div>
</div>

<div class="grid">
	<div class="grid-item grid-item--third-medium"><div class="gridHighlight">third-medium</div></div>
	<div class="grid-item grid-item--third-medium grid-item--offset-third-medium"><div class="gridHighlight">third-medium offset-third-medium</div></div>
</div>

<div class="grid">
	<div class="grid-item grid-item--twoThirds-medium u-floatCenter"><div class="gridHighlight">twoThirds-medium u-floatCenter</div></div>
</div>

```markup
<div class="grid">
	<div class="grid-item grid-item--threeFourths-medium grid-item--offset-fourth-medium">threeFourths-medium offset-fourth-medium</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--third-medium">third-medium</div>
	<div class="grid-item grid-item--third-medium grid-item--offset-third-medium">third-medium offset-third-medium</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--twoThirds-medium u-floatCenter">twoThirds-medium u-floatCenter</div>
</div>
```

<div class="grid">
	<div class="grid-item grid-item--twoThirds-medium float-center">
		<h2 class="text-center" id="content-choreography">Content Choreography</h2>

		<p>Flip the order of a grid on bigger screens by adding the <code>.grid-flip</code> class.</p>
	</div>
</div>

<div class="grid">
	<div class="grid-item grid-item--third-medium grid-item--flip-medium"><div class="gridHighlight">First in HTML</div></div>
	<div class="grid-item grid-item--twoThirds-medium"><div class="gridHighlight">Second in HTML</div></div>
</div>

```markup
<div class="grid">
	<div class="grid-item grid-item--third-medium grid-item--flip-medium">First in HTML</div>
	<div class="grid-item grid-item--twoThirds-medium">Second in HTML</div>
</div>
```

<div><div><!-- Reopen closed containers -->