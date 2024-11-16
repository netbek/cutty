const {browserslist} = require('./package.json');

module.exports = {
  autoprefixer: {
    overrideBrowserslist: browserslist
  },
  sass: {
    loadPaths: ['.'],
    outputStyle: 'expanded',
    silenceDeprecations: [
      'abs-percent',
      'bogus-combinators',
      'call-string',
      'color-module-compat',
      'css-function-mixin',
      'duplicate-var-flags',
      'elseif',
      'feature-exists',
      'fs-importer-cwd',
      'function-units',
      'global-builtin',
      'import',
      'mixed-decls',
      'moz-document',
      'new-global',
      'null-alpha',
      'relative-canonical',
      'slash-div',
      'strict-unary'
      // 'user-authored'
    ]
  },
  src: {
    vendor: 'src/vendor/'
  },
  dist: {
    vendor: 'demo/vendor/'
  },
  watchTasks: [
    //
    {
      files: ['src/**/*'],
      tasks: ['build']
    }
  ],
  webserver: {
    host: 'localhost',
    port: 8000,
    path: '/',
    livereload: false,
    directoryListing: false,
    open: '/demo/',
    https: false,
    browsers: {
      default: 'firefox',
      darwin: 'google chrome',
      linux: 'google-chrome',
      win32: 'chrome'
    }
  }
};
