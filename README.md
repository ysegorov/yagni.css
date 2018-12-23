# yagni.css

Collection of atomic `css` classes to be embedded to your project. Expected to
be used with [postcss][postcss].


## Installation

Install peer dependencies using `yarn`:

```shell

$ yarn add --dev postcss postcss-cli postcss-color-function postcss-color-hwb postcss-custom-properties postcss-discard-comments postcss-flexbugs-fixes postcss-import postcss-mixins postcss-reporter cssnano autoprefixer

```

Install `normalize.css` or `sanitize.css` (optionally):

```shell

$ yarn add --dev normalize.css

```

or

```shell

$ yarn add --dev sanitize.css

```

Install `yagni.css`:

```shell

$ yarn add --dev yagni.css

```


## Usage

Create `project.css` file for your project with the following content:

```css

/* uncomment line below to include normalize.css to bundle */
/* @import 'normalize'; */

/* uncomment line below to include sanitize.css to bundle */
/* @import 'sanitize'; */

@import 'yagni';

/* optionally overwrite yagni.css variables values if needed */
@import './variables';

/* optionally add some custom rules */
/* @import './customization'; */

```

Create `variables.css` file with customized variables values:

```css

:root {

    --color-red: rgb(255, 0, 0);

}

```

Create `postcss.config.js` file with the following content:

```js

var debug = process.env.NODE_ENV === 'development';

var plugins = [
  require('postcss-import')({
    path: [
      // uncomment search path below to be able to include normalize.css to bundle
      // 'node_modules/normalize.css/',
      // uncomment search path below to be able to include sanitize.css to bundle
      // 'node_modules/sanitize.css/',
      'node_modules/yagni.css/',
    ]
  }),
  require('postcss-mixins')(),
  require('postcss-css-variables')({
    preserve: false
  }),
  require('postcss-color-hwb')(),
  require('postcss-color-function')(),
  require('postcss-flexbugs-fixes')(),
  require('autoprefixer')()
];

if (!debug) {
  plugins.push(require('cssnano')({
      normalizeUrl: false
    })
  );
} else {
  plugins.push(require('postcss-discard-comments')());
}

plugins.push(require('postcss-reporter')());

module.exports = function () {
  return {
    plugins: plugins,
    map: false
  };
};

```

Run `postcss` to build your very own `css` styles:

```shell

$ postcss --env production project.css >bundle.min.css

```


## Reference

Available [online][docs].


## License

[Unlicense][unlicense]


[postcss]: https://postcss.org
[unlicense]: http://unlicense.org
[docs]: https://ysegorov.github.io/yagni.css/
