
var debug = process.env.NODE_ENV === 'development';

var plugins = [
  require('postcss-import')({
    // path: [
    //   'node_modules/normalize.css/',
    //   'node_modules/sanitize.css/',
    // ]
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
