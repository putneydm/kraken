# Alignment, Spacing &amp; Visibility

You can adjust text alignment and spacing using a few simple CSS classes.

**In this section:**

<ul>
	<li><a data-scroll href="#text-alignment">Text Alignment</a></li>
	<li><a data-scroll href="#floats">Floats</a></li>
	<li><a data-scroll href="#spacing">Spacing</a></li>
	<li><a data-scroll href="#visibility">Visibility</a></li>
</ul>


<h2 id="text-alignment">Text Alignment</h2>

<table class="table-striped">
	<thead>
		<tr>
			<th>Alignment</th>
			<th>Class</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Left</td>
			<td><code>.text-left</code></td>
		</tr>
		<tr>
			<td>Centered</td>
			<td><code>.text-center</code></td>
		</tr>
		<tr>
			<td>Right</td>
			<td><code>.text-right</code></td>
		</tr>
	</tbody>
</table>


<h2 id="floats">Floats</h2>

<table>
	<thead>
		<tr>
			<th>Float</th>
			<th>Class</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Left</td>
			<td><code>.float-left</code></td>
		</tr>
		<tr>
			<td>Centered</td>
			<td><code>.float-center</code></td>
		</tr>
		<tr>
			<td>Right</td>
			<td><code>.float-right</code></td>
		</tr>
	</tbody>
</table>

*Clear floats by wrapping floated content in a `<div>` with the `.u-clear` class.*

```markup
<div class="u-clear">
	<button class="u-floatRight">Floated to the Right</button>
	<button>Not floated</button>
</div>
```

<h2 id="spacing">Spacing</h2>

<table>
	<thead>
		<tr>
			<th>Top</th>
			<th>Bottom</th>
			<th>Class</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>0</td>
			<td>0</td>
			<td><code>.no-space</code></td>
		</tr>
		<tr>
			<td>Default</td>
			<td>0</td>
			<td><code>.no-space-bottom</code></td>
		</tr>
		<tr>
			<td>0</td>
			<td>Default</td>
			<td><code>.no-space-top</code></td>
		</tr>
		<tr>
			<td>Default</td>
			<td>2em</td>
			<td><code>.space-bottom</code></td>
		</tr>
		<tr>
			<td>Default</td>
			<td>.5em</td>
			<td><code>.space-bottom-small</code></td>
		</tr>
		<tr>
			<td>.8125em</td>
			<td>Default</td>
			<td><code>.space-top</code></td>
		</tr>
	</tbody>
</table>


<h2 id="visibility">Visibility</h2>

Hide content using the `[hidden]` attribute:

```markup
<div hidden>This is removed from the markup.</div>
```

If you have text that you don't want displayed on screen, but that should still be in the markup for screen readers (for example, a search form label), simply apply the `.u-screenreader` class. This will shift content off-screen, but screen readers can still read it.

```markup
<form>
	<label class="u-screenreader">Search this site</label>
	<input type="text" placeholder="Search this site...">
	<input type="submit">
</form>
```