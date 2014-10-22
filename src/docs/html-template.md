# HTML Template

Here's a basic HTML template page to get you started.

<strong>In this section:</strong>
<ul>
	<li><a data-scroll href="#the-template">The Template</a></li>
	<li><a data-scroll href="#the-template-explained">The Template Explained</a></li>
</ul>

<span id="the-template"></span>
```markup
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">

        <!-- Force latest available IE rendering engine and Chrome Frame (if installed) -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title></title>
        <meta name="description" content="">

        <!-- Mobile Screen Resizing -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Icons: place in the root directory -->
        <!-- https://github.com/audreyr/favicon-cheat-sheet -->

        <!-- feature detection -->
        <script src="dist/js/detects.js"></script>

        <!-- stylesheets -->
        <link rel="stylesheet" href="dist/css/main.css" type="text/css">
    </head>

    <body>

        <!-- Old Browser Warning -->
        <!--[if lt IE 9]>
            <section class="container">
                Did you know that your web browser is a bit old? Some of the content on this site might not work right as a result. <a href="http://whatbrowser.org">Upgrade your browser</a> for a faster, better, and safer web experience.
            </section>
        <![endif]-->

        <section class="container">

            <h1>Hello World!</h1>

            <p>Add your content here.</p>

        </section>

        <!-- Javascript -->
        <!-- In the footer for better performance -->
        <script src="dist/js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <!-- (Via HTML5 Boilerplate: http://html5boilerplate.com/) -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>

    </body>
</html>
```

<h2 id="the-template-explained">The Template Explained</h2>
<dl>
	<dt>HTML Language</dt>
	<dd>The language attribute (<code>lang</code>) helps screen-readers and translation software read your site (<a href="http://www.youtube.com/watch?v=Rx7lE8j5MNA">learn more</a>). Be default, it's set to English. Change it as needed for <a href="http://www.w3.org/International/questions/qa-choosing-language-tags">your local language</a>.</dd>
</dl>
<dl>
	<dt>Chrome Frame</dt>
	<dd>Sometimes newer versions of IE will use not-so-new versions of their rendering engine. We tell IE to use the latest available version of it's rendering engine, or Chrome Frame if it's installed.</dd>
</dl>
<dl>
	<dt>Mobile Screen Resizing</dt>
	<dd>Modern mobile browsers often "fake" a desktop sized viewport so that websites that aren't mobile-optimized aren't weirdly zoomed in when you load them. The viewport tag tells browsers that the viewport should be the size of the screen (because our site <em>is</em> mobile-optimize).</dd>
</dl>
<dl>
	<dt>Icons</dt>
	<dd>The site favicon and touch icons for when people bookmark your site or app on the homescreen of their mobile device. This now includes support for Windows phones, too. (Icons aren't included with Kraken. Add them to <code>img</code> folder.)</dd>
</dl>
<dl>
	<dt>Old Browser Warning</dt>
	<dd>A friendly message encouraging visitors on older versions of IE to upgrade their browser. They can still access the site content. It will just look a bit funny.</dd>
</dl>
<dl>
	<dt>JavaScript in the Footer</dt>
	<dd>For faster loading and better site performance, JavaScript files are included in the footer, not the header.</dd>
</dl>
<dl>
	<dt>Google Analytics</dt>
	<dd>An optimized version of Google Analytics is preloaded for you. Just add your site's ID (or replace the code altogether if you're using another analytics platform). <a href="http://html5boilerplate.com/">Adapted from HTML5 Boilerplate.</a></dd>
</dl>