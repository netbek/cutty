const {browserslist} = require('./package.json');

module.exports = {
  autoprefixer: {
    overrideBrowserslist: browserslist
  },
  css: {
    params: {
      includePaths: [],
      errLogToConsole: true
    }
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
