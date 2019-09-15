```
 _____             _           _     _
| __  |___ ___ ___| |_ ___ ___|_|___| |_
| __ -|  _| -_| .'| '_| . | . | |   |  _|
|_____|_| |___|__,|_,_|  _|___|_|_|_|_|
                      |_|  _____         ___
        _.====.._         |   __|_ _ ___|  _|___ ___
      ,:._       ~-_      |__   | | |  _|  _| -_|  _|
          `\        ~-_   |_____|___|_| |_| |___|_|
            |          `.               Version 0.0.1
          ,/             ~-_
-..__..-''                  ~~--..__)`'-.,_)`'-.,)`'-

```

# Breakpoint Surfer
Tool for faster responsive SCSS coding.

This tool will help with the following:
- You can define all responsive breakpoints and base font sizes in one json file
- New `media` mixin helps with faster coding
- SCSS compiler that will produce optimized code

## Installation
```
npm install -save-dev breakpoint-surfer
```

Create `breakpoints.json` file to define your resolutions
```json
{
  "mobile": {
    "breakpointStart":  "200px",
    "baseFontSize":     "14px",
    "fluidWidth":       "true"
  },
  "phablet": {
    "breakpointStart":  "500px",
    "baseFontSize":     "14px",
    "fluidWidth":       "true"
  },
  "tablet": {
    "breakpointStart":  "700px",
    "baseFontSize":     "16px",
    "fluidWidth":       "true"
  },
  "desktop": {
    "breakpointStart":  "1000px",
    "baseFontSize":     "16px",
    "fluidWidth":       "false"
  },
  "desktop2": {
    "breakpointStart":  "1200px",
    "baseFontSize":     "16px",
    "fluidWidth":       "false"
  },
  "desktop3": {
    "breakpointStart":  "1400px",
    "baseFontSize":     "18px",
    "fluidWidth":       "false"
  }
}
```

Create file `breakpointSurfer.js` and inside paste the following code:

```js
const surf = require('breakpoint-surfer')

surf({
  breakpointsJson: './breakpoints.json',
  input: 'style.scss',
  output: './output/style.css'
})
```

Lastly, create your `style.scss` file and paste the following:

```scss
@import 'breakpoint-surfer';

$baseline-ratio: 1.618 !global;

@include media(desktop) {
  div {
    padding: 10px;
  }
}
```

To start the compilation, type `node breakpointSurfer.js` and that's it. :)

## How it works
We will start from the `style.scss` file. Line `@import 'breakpoint-surfer'` defines that we are loading all the necessary breakpoints, mixins and functions for `media` mixin to work. This import works only with included SCSS compiler, which is defined in `breakpointSurfer.js`.

To use this mixin, you can call any resolution defined in this file. For example, you can write something like this:

```scss
@include media(mobile, phablet, tablet) {
  div {
    padding: 10px;
  }
}
```

Once compiled, appropriate media declarations will be made in final css file.

If you want to use all resolutions, you don't have to type every resolution name. Instead type this:

```scss
@include media(all) {
  div {
    padding: 10px;
  }
}
```

### Responsive variables
There are several variables that you can use only within your `media` mixins:

```scss
$base-font-size // Returns base font size for current breakpoint
$base-px // Return baseline height in PX units for current breakpoint
$base-rem // Returns baseline height in REM units for current breakpoint
```

You can use these variables for example like this:

```scss
@include media(all) {
  div {
    font-size: $base-font-size;
    line-height: $base-px;
  }
}
```