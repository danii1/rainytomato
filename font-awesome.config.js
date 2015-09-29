module.exports = {
  styles: {
    'mixins': false,

    'core': true,
    'icons': true,

    'larger': true,
    'path': true
  },
  postStyleLoaders: [
    require.resolve('./node_modules/extract-text-webpack-plugin/loader.js') + '?{"omit":1,"extract":true,"remove":true, "publicPath":""}'
  ]
};
