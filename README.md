# My Personal Website

This repository is for my [personal website](https://hellofromtonya.com).  

The web pages are static. Why?  Why not a full CMS? The reason is the intent.  The content rarely changes.  Given that static pages run faster, there's no need for a database or a CMS like WordPress.  

BUT my [Hello World blog](https://hellofromtonya.com/blog/) is a WordPress website.  You can check the [custom Genesis-powered child theme here](https://github.com/hellofromtonya/Hello-Minimal).

## Features:

Well, let's see....It uses:

1. Flexbox to achieve the checkered boxes
2. Sass - of course, I'd use Sass as it's a more efficient approach to styling.
3. [Animate.css](https://daneden.github.io/animate.css/)
4. jQuery

I'm also using [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/), though I'm slowly removing these 3rd party libraries and opting for native CSS.

My favorite task runner is gulp.  I'm using [UpGulp](https://github.com/KnowTheCode/UpGulp), which is included in this repository.

## Design Elements

I get a lot of questions about the design elements.  

First off, this website is my playground.  I like taking a different approach and stretching my _design abilities_.  BTW, I am not a designer.  Rather, I'm an engineer.  So it's a struggle to push my design creativity.

But let me talk about some of the design elements to guide you.

### Checkered Grids and Boxes

You may notice that there are different types of grid patterns.  I like creating a checker-box design, probably from years of playing chess and checkers.  My mind just goes to the checkered box look.

There are 4 different types of design patterns, each of which has a CodePen for you to fork and play with:

- Checkered Flexbox 2-Column - see on [CodePen](https://codepen.io/hellofromtonya/pen/EveoXE)
- Reversed Checkered Flexbox 2-Column - see on [CodePen](https://codepen.io/hellofromtonya/pen/QMVaQG)
- Half-Background Checked Flexbox List - see on [CodePen](https://codepen.io/hellofromtonya/pen/WEgdKo)
- Reversed Half-Background Checked Flexbox - see on [CodePen](https://codepen.io/hellofromtonya/pen/rzZpqd)

The Sass module for all of these grid patterns is found in [`assets/sass/modules/grids`](https://github.com/hellofromtonya/hellofromtonya/tree/master/assets/sass/modules/grids).

### Section Title

I had some fun with the section titles.  Did you notice? For each section of the page, I added:

- A light background text and then right aligned it.
- Keyword in the bottom left sidebar (fixed and rotated 90 deg).  This keyword changes as you scroll down the page.

As you scroll down the page (on a tablet or larger), notice that the bottom left sidebar keyword changes.  See it?  Oh come on, you have to check it out.  Let's go to the [home page](https://hellofromtonya.com/).  As you scroll down the page, notice that the "hello" changes to "me" and then "we" and then "faq".

The _changing_ of the keywords is handled by jQuery.  It checks to see if a new section is now visible on the screen.  If yes, then it grabs the data attribute `message` and inserts it into the DOM.  Check out the [`assets/js/jquery.page-background-text.js`](https://github.com/hellofromtonya/hellofromtonya/blob/master/assets/js/jquery.page-background-text.js) script for more details.

![Dynamic Text Demo](/_wiki/DynamicText.gif?raw=true)

You can fork and play with the [CodePen](https://codepen.io/hellofromtonya/pen/YxOeEq) to adapt it to your needs.

## Contributions

Well gang this is my own project.  But I do welcome your feedback, bug reports, and pull requests are welcome.