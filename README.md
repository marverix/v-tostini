# v-Tostini

[![Build Status](https://img.shields.io/travis/com/marverix/v-tostini/master.svg)](https://travis-ci.com/marverix/v-tostini)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/marverix/v-tostini.svg)](https://lgtm.com/projects/g/marverix/v-tostini/context:javascript)
[![Current Release](https://img.shields.io/github/release/marverix/v-tostini.svg)](releases)
[![License: MIT](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE.md)

_v-Tostini_ is really plain toast notifications mechanism for Vue.js 2.x. 
There is no CSS included, which means that you need to add your own flavor for it.
Just like with tostini - no one will tell you how it should look like ;)

## Demo

https://codesandbox.io/embed/vtostini-demo-btc4g

## Getting Started

### Prerequisites

This package is using [UMD](https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js) pattern.

### Usage

1. Install it (or download):

   ```sh
   npm i v-tostini
   ```

1. Require in your project:

   ```js
   const vTostini = require('v-tostini');
   ```

1. Tell Vue to use it:

   ```js
   Vue.use(vTostini);
   ```

1. Now simply place `tostini-plate` in your HTML:

   ```html
   <tostini-plate />
   ```

1. Call from any Vue instance:

   ```js
   this.$tostini({
     message: 'Delicious!',
     type: 'success'
   });
   ```
   
### Usage with Nuxt.js

You can easely use tostini inside Nuxt.js by creating a plugin:
```
import Vue from 'vue'
import tostini from 'v-tostini'

Vue.use(tostini)

// If you want to use tostini inside your store modules
// the same way you use it in components
// you will need to inject it
export default (ctx, inject) => {
  inject('tostini', Vue.prototype.$tostini)
}
```
tostini supports >2%, IE11, Safari 10 but if your Nuxt project has different browser targets - you can easely compile it yourself from the available source. To do that you need to add `transpile` section to you nuxt.config.js build settings:

```
build: {
    transpile: ['v-tostini']
}
```
don't forget to target `src` folder inside the plugin

```
import Vue from 'vue'
import tostini from 'v-tostini/src'
```

### Features

#### Use String as an argument

You can also use as argument a string:

```js
this.$tostini('Yupi!');
```

Above will be the same as:

```js
this.$tostini({
  message: 'Yupi!'
});
```

#### Notification Duration

By default duration is calculated by the length of given message.
The formula I have created is based on an experiment carried out on colleagues from work. I checked what is the average time that an adult needs to notice and read the technical text that one saw for the first time. Since I have implemented it, complaining that someone did not manage to read the text - ended :)

Of course you can set your own duration:

```js
this.$tostini({
  message: 'This message will be visible for 2s.',
  duration: 2000
});
```

#### Types

`type` field in toastini config is set as `data-type` in added tostini to tostini-plate. So basicly it's up to you how you will use it.

#### HTML Support

You can display HTML-based message. Just set `html: true` flag:

```js
this.$tostini({
  message: 'Wow! Great <b>success</b>!',
  html: true
});
```

Caution! Sanitization needs to be done on your side!

### Exmaple CSS

So this is CSS that I'm using. As you can see I'm using types:

* default
* success
* error
* warning
* info

```css
.tostini-plate {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto !important;
}
.tostini-plate .tostini {
  padding: 0.75rem;
  width: calc(100vw - 3.5rem);
  margin: 0.5rem auto;
  max-width: 40rem;
  color: white;
}
.tostini-plate .tostini[data-type="default"] {
  background: rgba(0, 0, 0, 0.5);
}
.tostini-plate .tostini[data-type="success"] {
  background: rgba(45, 148, 27, 0.95);
}
.tostini-plate .tostini[data-type="error"] {
  background: rgba(148, 27, 27, 0.95);
}
.tostini-plate .tostini[data-type="warning"] {
  background: rgba(216, 143, 9, 0.95);
}
.tostini-plate .tostini[data-type="info"] {
  background: rgba(0, 147, 204, 0.95);
}
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details
